import axios from "axios";
import type { Location } from "../types/types";

export const solveTSP = async (
  startLocation: Location,
  cities: string[]
) => {
  const response = await axios.post("/api/solve", {
    start_location: { lat: startLocation.lat, lng: startLocation.lng },
    cities,
  });
  return response.data;
};
