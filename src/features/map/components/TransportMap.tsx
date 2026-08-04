import { Camera, CircleLayer, MapView, ShapeSource } from "@rnmapbox/maps";
import type { Feature, FeatureCollection, Point } from "geojson";
import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import "@/config/mapbox.config";

import { useTheme } from "@/features/theme/hooks/useTheme";

import type {
  TransportMapProps,
  TransportMapVehicle,
} from "../types/TransportMap.types";

const ADDIS_ABABA_CENTER: [number, number] = [38.7578, 9.0301];

type VehicleFeatureProperties = {
  id: string;
  mode: string;
  routeId: string;
  heading: number;
  updatedAt: string;
};

type VehicleFeature = Feature<Point, VehicleFeatureProperties>;

function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function getVehicleColorExpression() {
  return [
    "match",
    ["get", "mode"],

    "bus",
    "#2563EB",

    "minibus",
    "#16A34A",

    "taxi",
    "#F59E0B",

    "tram",
    "#7C3AED",

    "train",
    "#0891B2",

    "walking",
    "#64748B",

    "#DC2626",
  ] as const;
}

function TransportMapComponent({
  center,
  vehicles = [],
  zoomLevel = 13.5,
  onVehiclePress,
}: TransportMapProps) {
  const theme = useTheme();

  const centerCoordinate = useMemo<[number, number]>(() => {
    if (center && isValidCoordinate(center.latitude, center.longitude)) {
      return [center.longitude, center.latitude];
    }

    return ADDIS_ABABA_CENTER;
  }, [center]);

  const validVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) =>
        isValidCoordinate(vehicle.latitude, vehicle.longitude),
      ),
    [vehicles],
  );

  const vehiclesById = useMemo(() => {
    return new Map<string, TransportMapVehicle>(
      validVehicles.map((vehicle) => [vehicle.id, vehicle]),
    );
  }, [validVehicles]);

  const vehicleCollection = useMemo<
    FeatureCollection<Point, VehicleFeatureProperties>
  >(
    () => ({
      type: "FeatureCollection",
      features: validVehicles.map<VehicleFeature>((vehicle) => ({
        type: "Feature",
        id: vehicle.id,
        properties: {
          id: vehicle.id,
          mode: vehicle.mode,
          routeId: vehicle.routeId ?? "",
          heading: vehicle.heading ?? 0,
          updatedAt: vehicle.updatedAt ?? "",
        },
        geometry: {
          type: "Point",
          /*
           * GeoJSON and Mapbox always use:
           * [longitude, latitude]
           */
          coordinates: [vehicle.longitude, vehicle.latitude],
        },
      })),
    }),
    [validVehicles],
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/streets-v12"
        logoEnabled={false}
        attributionEnabled
        compassEnabled
        scaleBarEnabled={false}
        pitchEnabled
        rotateEnabled
        zoomEnabled
        scrollEnabled
        localizeLabels={{
          locale: "en",
        }}
      >
        <Camera
          centerCoordinate={centerCoordinate}
          zoomLevel={zoomLevel}
          animationMode="flyTo"
          animationDuration={800}
          minZoomLevel={8}
          maxZoomLevel={20}
        />

        {center ? (
          <ShapeSource
            id="current-location-source"
            shape={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: centerCoordinate,
              },
            }}
          >
            <CircleLayer
              id="current-location-accuracy-layer"
              style={{
                circleRadius: 18,
                circleColor: theme.colors.primary,
                circleOpacity: 0.14,
                circleStrokeWidth: 0,
              }}
            />

            <CircleLayer
              id="current-location-dot-layer"
              aboveLayerID="current-location-accuracy-layer"
              style={{
                circleRadius: 7,
                circleColor: theme.colors.primary,
                circleStrokeColor: "#FFFFFF",
                circleStrokeWidth: 3,
              }}
            />
          </ShapeSource>
        ) : null}

        <ShapeSource
          id="live-vehicles-source"
          shape={vehicleCollection}
          hitbox={{
            width: 44,
            height: 44,
          }}
          onPress={(event) => {
            const feature = event.features?.[0];
            const vehicleId = feature?.properties?.id;

            if (typeof vehicleId !== "string") {
              return;
            }

            const vehicle = vehiclesById.get(vehicleId);

            if (vehicle) {
              onVehiclePress?.(vehicle);
            }
          }}
        >
          <CircleLayer
            id="live-vehicles-shadow-layer"
            style={{
              circleRadius: 12,
              circleColor: "#000000",
              circleOpacity: 0.18,
              circleTranslate: [0, 2],
              circleBlur: 0.4,
            }}
          />

          <CircleLayer
            id="live-vehicles-layer"
            aboveLayerID="live-vehicles-shadow-layer"
            style={{
              circleRadius: 9,
              circleColor: getVehicleColorExpression(),
              circleStrokeColor: "#FFFFFF",
              circleStrokeWidth: 2.5,
              circleOpacity: 1,
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
}

export const TransportMap = memo(TransportMapComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});
