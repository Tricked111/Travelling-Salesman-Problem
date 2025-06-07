import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Location } from "./types/types";
import { useGeolocation } from "./hooks/useGeolocation";
import CityInput from "./components/CityInput";
import RouteResult from "./components/RouteResult";
import { solveTSP } from "./services/tspApi";

function App() {
  const [cities, setCities] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [resultData, setResultData] = useState<{
    route: string[];
    distances: number[];
    total_distance: number;
  } | null>(null);

  const { location: startLocation, error: geoError } = useGeolocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleAddCity = () => {
    setCities([...cities, { name: "", lat: 0, lng: 0 }]);
  };

  const handleCityChange = (
    index: number,
    field: keyof Location,
    value: string
  ) => {
    const updated = [...cities];
    if (field === "name") updated[index].name = value;
    else updated[index][field] = Number(value);
    setCities(updated);
  };

  const handleDeleteCity = (index: number) => {
    const updated = [...cities];
    updated.splice(index, 1);
    setCities(updated);
  };

  const handleSolve = async () => {
    if (!startLocation) return;
    setLoading(true);
    setError("");
    try {
      const result = await solveTSP(
        startLocation,
        cities.map((c) => c.name)
      );
      setResultData(result);
    } catch {
      setError("Failed to fetch route from server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "#f5f5f7",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        padding: 2,
        gap: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          flex: 1,
          maxWidth: isMobile ? "100%" : 500,
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Travelling Salesman Solver
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body1">Start Location:</Typography>
          {startLocation ? (
            <Typography variant="body2" ml={2}>
              ({startLocation.lat.toFixed(4)}, {startLocation.lng.toFixed(4)})
            </Typography>
          ) : (
            <CircularProgress size={20} sx={{ ml: 2 }} />
          )}
        </Box>

        {cities.map((city, index) => (
          <CityInput
            key={index}
            city={city}
            index={index}
            onChange={handleCityChange}
            onDelete={handleDeleteCity}
          />
        ))}

        <Box display="flex" justifyContent="space-between" my={2}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddCity}>
            Add City
          </Button>
          <Button
            variant="contained"
            onClick={handleSolve}
            disabled={loading || !startLocation}
          >
            {loading ? <CircularProgress size={24} /> : "Solve Route"}
          </Button>
        </Box>

        {(error || geoError) && (
          <Typography color="error" mt={2}>
            {error || geoError}
          </Typography>
        )}
      </Paper>

      {resultData && (
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 4,
            flex: 1,
            minWidth: isMobile ? "100%" : 300,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <RouteResult
            route={resultData.route}
            distances={resultData.distances}
            totalDistance={resultData.total_distance}
          />
        </Paper>
      )}
    </Box>
  );
}

export default App;
