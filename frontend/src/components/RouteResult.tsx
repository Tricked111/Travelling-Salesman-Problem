import React from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  route: string[];
  distances: number[];
  totalDistance: number;
}

const RouteResult: React.FC<Props> = ({ route, distances, totalDistance }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Typography variant="h6" gutterBottom align="center">
      Optimized Route
    </Typography>

    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        px: 1,
        mt: 2,
      }}
    >
      <Stack spacing={2} alignItems="center">
        {route.map((city, index) => (
          <React.Fragment key={index}>
            <Paper
              elevation={2}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 3,
                bgcolor: "#e3f2fd",
                textAlign: "center",
                width: "100%",
                maxWidth: 300,
              }}
            >
              <Typography variant="body1" fontWeight="medium">
                {city}
              </Typography>
            </Paper>

            {index < route.length - 1 && (
              <Stack spacing={0.5} alignItems="center">
                <ArrowDownwardIcon fontSize="small" />
                <Typography variant="caption" color="text.secondary">
                  {(distances[index] / 1000).toFixed(1)} km
                </Typography>
              </Stack>
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>

    <Divider sx={{ my: 2 }} />

    <Typography
      variant="subtitle1"
      align="center"
      fontWeight="bold"
      sx={{ mt: "auto" }}
    >
      Total Distance: {(totalDistance / 1000).toFixed(1)} km
    </Typography>
  </Box>
);

export default RouteResult;
