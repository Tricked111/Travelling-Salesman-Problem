import { useEffect, useState } from "react";
import type { Location } from "../types/types";

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          name: "Your Location",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setError("Failed to get location from browser")
    );
  }, []);

  return { location, error };
};
