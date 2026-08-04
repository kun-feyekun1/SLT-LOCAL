import Mapbox from "@rnmapbox/maps";
import type { FeatureCollection, Point } from "geojson";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const INITIAL_COORDINATE: [number, number] = [
  38.7578, // Longitude
  9.0301, // Latitude — Addis Ababa
];

type RoadMode = "all" | "major" | "local";
type LayerVisibility = "visible" | "none";

function getLayerVisibility(visible: boolean): LayerVisibility {
  return visible ? "visible" : "none";
}

const SATELLITE_STYLE_URL = "mapbox://styles/mapbox/standard-satellite";

/**
 * Demo indicators.
 *
 * Coordinate order must always be:
 * [longitude, latitude]
 */
const indicators: FeatureCollection<Point> = {
  type: "FeatureCollection",

  features: [
    {
      type: "Feature",
      id: "terminal-1",
      properties: {
        name: "Smart Link Terminal",
        category: "Terminal",
        color: "#DC2626",
      },
      geometry: {
        type: "Point",
        coordinates: [38.7578, 9.0301],
      },
    },

    {
      type: "Feature",
      id: "bus-stop-1",
      properties: {
        name: "Mexico Bus Stop",
        category: "Bus stop",
        color: "#2563EB",
      },
      geometry: {
        type: "Point",
        coordinates: [38.7466, 9.0107],
      },
    },

    {
      type: "Feature",
      id: "bus-stop-2",
      properties: {
        name: "Meskel Square Stop",
        category: "Bus stop",
        color: "#7C3AED",
      },
      geometry: {
        type: "Point",
        coordinates: [38.7635, 9.0104],
      },
    },

    {
      type: "Feature",
      id: "station-1",
      properties: {
        name: "Legehar Station",
        category: "Station",
        color: "#0891B2",
      },
      geometry: {
        type: "Point",
        coordinates: [38.7603, 9.0154],
      },
    },

    {
      type: "Feature",
      id: "hospital-1",
      properties: {
        name: "Medical Center",
        category: "Hospital",
        color: "#E11D48",
      },
      geometry: {
        type: "Point",
        coordinates: [38.768, 9.023],
      },
    },

    {
      type: "Feature",
      id: "market-1",
      properties: {
        name: "Local Market",
        category: "Market",
        color: "#F59E0B",
      },
      geometry: {
        type: "Point",
        coordinates: [38.751, 9.035],
      },
    },

    {
      type: "Feature",
      id: "driver-1",
      properties: {
        name: "Driver 104",
        category: "Driver",
        color: "#16A34A",
      },
      geometry: {
        type: "Point",
        coordinates: [38.773, 9.027],
      },
    },

    {
      type: "Feature",
      id: "incident-1",
      properties: {
        name: "Road Incident",
        category: "Incident",
        color: "#EA580C",
      },
      geometry: {
        type: "Point",
        coordinates: [38.741, 9.024],
      },
    },

    {
      type: "Feature",
      id: "vehicle-1",
      properties: {
        name: "Bus SLT-204",
        category: "Vehicle",
        color: "#0F766E",
      },
      geometry: {
        type: "Point",
        coordinates: [38.782, 9.039],
      },
    },

    {
      type: "Feature",
      id: "terminal-2",
      properties: {
        name: "Northern Terminal",
        category: "Terminal",
        color: "#BE123C",
      },
      geometry: {
        type: "Point",
        coordinates: [38.755, 9.051],
      },
    },
  ],
};

export default function SatelliteRoadMapScreen() {
  const [roadMode, setRoadMode] = useState<RoadMode>("all");

  const [selectedIndicator, setSelectedIndicator] = useState<{
    name: string;
    category: string;
    color: string;
  } | null>(null);

  const roadVisibility = useMemo(() => {
    return {
      motorway: roadMode === "all" || roadMode === "major",

      trunk: roadMode === "all" || roadMode === "major",

      primary: roadMode === "all" || roadMode === "major",

      secondary: roadMode === "all" || roadMode === "major",

      tertiary: roadMode === "all" || roadMode === "local",

      street: roadMode === "all" || roadMode === "local",

      service: roadMode === "all" || roadMode === "local",
    };
  }, [roadMode]);

  const cycleRoadMode = () => {
    setRoadMode((currentMode) => {
      if (currentMode === "all") {
        return "major";
      }

      if (currentMode === "major") {
        return "local";
      }

      return "all";
    });
  };

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={SATELLITE_STYLE_URL}
        zoomEnabled
        scrollEnabled
        rotateEnabled
        pitchEnabled
        compassEnabled
        compassFadeWhenNorth
        scaleBarEnabled={false}
        logoEnabled
        attributionEnabled
        preferredFramesPerSecond={60}
        onMapLoadingError={() => {
          console.error("The satellite map failed to load.");
        }}
      >
        <Mapbox.Camera
          defaultSettings={{
            centerCoordinate: INITIAL_COORDINATE,
            zoomLevel: 13.8,
            pitch: 35,
            heading: 0,
          }}
          minZoomLevel={3}
          maxZoomLevel={22}
        />

        <Mapbox.LocationPuck
          visible
          pulsing={{
            isEnabled: true,
          }}
        />

        {/*
          Real road geometry from Mapbox Streets v8.

          These are actual mapped road shapes,
          not manually drawn straight lines.
        */}
        <Mapbox.VectorSource
          id="real-road-source"
          url="mapbox://mapbox.mapbox-streets-v8"
        >
          {/* Motorway shadow */}
          <Mapbox.LineLayer
            id="motorway-shadow"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["motorway", "motorway_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.motorway),
              lineColor: "#450A0A",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                4,
                13,
                10,
                18,
                22,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Motorway road */}
          <Mapbox.LineLayer
            id="motorway-road"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["motorway", "motorway_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.motorway),
              lineColor: "#EF4444",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                2.5,
                13,
                7,
                18,
                16,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Trunk shadow */}
          <Mapbox.LineLayer
            id="trunk-shadow"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["trunk", "trunk_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.trunk),
              lineColor: "#431407",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                3.5,
                13,
                9,
                18,
                20,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Trunk road */}
          <Mapbox.LineLayer
            id="trunk-road"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["trunk", "trunk_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.trunk),
              lineColor: "#F97316",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                2,
                13,
                6,
                18,
                14,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Primary shadow */}
          <Mapbox.LineLayer
            id="primary-shadow"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["primary", "primary_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.primary),
              lineColor: "#422006",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,
                3,
                14,
                9,
                18,
                18,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Primary road */}
          <Mapbox.LineLayer
            id="primary-road"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["primary", "primary_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.primary),
              lineColor: "#FACC15",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,
                1.8,
                14,
                6,
                18,
                13,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.98,
            }}
          />

          {/* Secondary shadow */}
          <Mapbox.LineLayer
            id="secondary-shadow"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["secondary", "secondary_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.secondary),
              lineColor: "#052E16",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                2.4,
                14,
                7,
                18,
                15,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.9,
            }}
          />

          {/* Secondary road */}
          <Mapbox.LineLayer
            id="secondary-road"
            sourceLayerID="road"
            slot="middle"
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["secondary", "secondary_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.secondary),
              lineColor: "#22C55E",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                1.2,
                14,
                4.5,
                18,
                10,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Tertiary shadow */}
          <Mapbox.LineLayer
            id="tertiary-shadow"
            sourceLayerID="road"
            slot="middle"
            minZoomLevel={10}
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["tertiary", "tertiary_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.tertiary),
              lineColor: "#172554",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                11,
                2,
                15,
                6,
                19,
                13,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.9,
            }}
          />

          {/* Tertiary road */}
          <Mapbox.LineLayer
            id="tertiary-road"
            sourceLayerID="road"
            slot="middle"
            minZoomLevel={10}
            filter={[
              "in",
              ["get", "class"],
              ["literal", ["tertiary", "tertiary_link"]],
            ]}
            style={{
              visibility: getLayerVisibility(roadVisibility.tertiary),
              lineColor: "#3B82F6",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                11,
                1,
                15,
                3.5,
                19,
                8,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.95,
            }}
          />

          {/* Street shadow */}
          <Mapbox.LineLayer
            id="street-shadow"
            sourceLayerID="road"
            slot="middle"
            minZoomLevel={12}
            filter={["==", ["get", "class"], "street"]}
            style={{
              visibility: getLayerVisibility(roadVisibility.street),
              lineColor: "#2E1065",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                1.5,
                16,
                5,
                20,
                11,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.85,
            }}
          />

          {/* Street road */}
          <Mapbox.LineLayer
            id="street-road"
            sourceLayerID="road"
            slot="middle"
            minZoomLevel={12}
            filter={["==", ["get", "class"], "street"]}
            style={{
              visibility: getLayerVisibility(roadVisibility.street),
              lineColor: "#A78BFA",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                0.8,
                16,
                2.8,
                20,
                7,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.92,
            }}
          />

          {/* Service shadow */}
          <Mapbox.LineLayer
            id="service-shadow"
            sourceLayerID="road"
            slot="middle"
            minZoomLevel={14}
            filter={["==", ["get", "class"], "service"]}
            style={{
              visibility: getLayerVisibility(roadVisibility.service),
              lineColor: "#083344",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                1.5,
                18,
                5,
                21,
                9,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.8,
            }}
          />

          {/* Service road */}
          <Mapbox.LineLayer
            id="service-road"
            sourceLayerID="road"
            slot="middle"
            minZoomLevel={14}
            filter={["==", ["get", "class"], "service"]}
            style={{
              visibility: getLayerVisibility(roadVisibility.service),
              lineColor: "#22D3EE",
              lineWidth: [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0.7,
                18,
                3,
                21,
                6,
              ],
              lineCap: "round",
              lineJoin: "round",
              lineOpacity: 0.9,
            }}
          />

          <Mapbox.LineLayer
            id="one-way-overlay"
            sourceLayerID="road"
            slot="top"
            minZoomLevel={14}
            filter={[
              "all",
              ["==", ["get", "oneway"], "true"],
              [
                "in",
                ["get", "class"],
                [
                  "literal",
                  [
                    "motorway",
                    "trunk",
                    "primary",
                    "secondary",
                    "tertiary",
                    "street",
                  ],
                ],
              ],
            ]}
            style={{
              lineColor: "#FFFFFF",
              lineWidth: 1.4,
              lineDasharray: [1, 2],
              lineOpacity: 0.9,
            }}
          />
        </Mapbox.VectorSource>

        {/*
          All indicators are rendered using one
          ShapeSource for better performance.
        */}
        <Mapbox.ShapeSource
          id="indicator-source"
          shape={indicators}
          hitbox={{
            width: 50,
            height: 50,
          }}
          onPress={(event) => {
            const selectedFeature = event.features?.[0];

            const properties = selectedFeature?.properties;

            if (!properties) {
              return;
            }

            const name = properties.name;
            const category = properties.category;
            const color = properties.color;

            if (
              typeof name === "string" &&
              typeof category === "string" &&
              typeof color === "string"
            ) {
              setSelectedIndicator({
                name,
                category,
                color,
              });
            }
          }}
        >
          <Mapbox.CircleLayer
            id="indicator-shadow"
            slot="top"
            style={{
              circleRadius: [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                8,
                15,
                12,
                19,
                17,
              ],

              circleColor: "#000000",
              circleOpacity: 0.4,
              circleTranslate: [0, 3],
            }}
          />

          <Mapbox.CircleLayer
            id="indicator-circles"
            slot="top"
            style={{
              circleRadius: [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                6,
                15,
                9,
                19,
                14,
              ],

              circleColor: ["get", "color"],
              circleStrokeColor: "#FFFFFF",
              circleStrokeWidth: 3,
              circleOpacity: 1,
            }}
          />

          <Mapbox.SymbolLayer
            id="indicator-labels"
            slot="top"
            minZoomLevel={12}
            style={{
              textField: ["get", "name"],

              textSize: [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                10,
                17,
                14,
                20,
                16,
              ],

              textColor: "#FFFFFF",
              textHaloColor: "#000000",
              textHaloWidth: 2,
              textHaloBlur: 1,
              textAnchor: "top",
              textOffset: [0, 1.5],
              textMaxWidth: 12,
              textAllowOverlap: false,
              textIgnorePlacement: false,
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>

      <View style={styles.headerCard}>
        <Text style={styles.title}>Satellite road classification</Text>

        <Text style={styles.subtitle}>
          Satellite imagery with real Mapbox road geometry
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change displayed road classes"
        onPress={cycleRoadMode}
        style={({ pressed }) => [
          styles.filterButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.filterButtonText}>
          {roadMode === "all"
            ? "Showing all roads"
            : roadMode === "major"
              ? "Showing major roads"
              : "Showing local roads"}
        </Text>

        <Text style={styles.filterButtonHint}>Tap to change</Text>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.legendContainer}
        contentContainerStyle={styles.legendContent}
      >
        <LegendItem color="#EF4444" label="Motorway" />

        <LegendItem color="#F97316" label="Trunk" />

        <LegendItem color="#FACC15" label="Primary" />

        <LegendItem color="#22C55E" label="Secondary" />

        <LegendItem color="#3B82F6" label="Tertiary" />

        <LegendItem color="#A78BFA" label="Street" />

        <LegendItem color="#22D3EE" label="Service" />
      </ScrollView>

      {selectedIndicator ? (
        <View style={styles.selectedCard}>
          <View
            style={[
              styles.selectedIndicatorColor,
              {
                backgroundColor: selectedIndicator.color,
              },
            ]}
          />

          <View style={styles.selectedInformation}>
            <Text style={styles.selectedCategory}>
              {selectedIndicator.category}
            </Text>

            <Text style={styles.selectedName}>{selectedIndicator.name}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close indicator information"
            onPress={() => setSelectedIndicator(null)}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendColor,
          {
            backgroundColor: color,
          },
        ]}
      />

      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#020617",
  },

  map: {
    flex: 1,
  },

  headerCard: {
    position: "absolute",
    top: 52,
    left: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "500",
  },

  filterButton: {
    position: "absolute",
    top: 140,
    right: 16,
    minWidth: 156,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 26,
    backgroundColor: "rgba(15, 23, 42, 0.92)",
    elevation: 7,
  },

  filterButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  filterButtonHint: {
    marginTop: 2,
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "500",
  },

  legendContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
  },

  legendContent: {
    gap: 8,
    paddingHorizontal: 16,
  },

  legendItem: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 19,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
  },

  legendColor: {
    width: 22,
    height: 6,
    borderRadius: 3,
  },

  legendText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  selectedCard: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 78,
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.96)",
    elevation: 10,
  },

  selectedIndicatorColor: {
    width: 18,
    height: 18,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 9,
  },

  selectedInformation: {
    flex: 1,
    marginLeft: 12,
  },

  selectedCategory: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  selectedName: {
    marginTop: 3,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 28,
  },

  buttonPressed: {
    opacity: 0.72,
    transform: [
      {
        scale: 0.97,
      },
    ],
  },
});
