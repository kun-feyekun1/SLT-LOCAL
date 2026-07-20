import React, { createContext, useContext, useState } from "react";

interface LocationContextType {
  location: { latitude: number; longitude: number } | null;
  setLocation: (loc: { latitude: number; longitude: number }) => void;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
