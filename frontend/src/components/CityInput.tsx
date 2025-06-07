import React from "react";
import { TextField, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Location } from "../types/types";

interface Props {
  city: Location;
  index: number;
  onChange: (index: number, field: keyof Location, value: string) => void;
  onDelete: (index: number) => void;
}

const CityInput: React.FC<Props> = ({ city, index, onChange, onDelete }) => (
  <Box display="flex" gap={2} alignItems="center" mb={1}>
    <TextField
      label={`City ${index + 1}`}
      value={city.name}
      onChange={(e) => onChange(index, "name", e.target.value)}
      fullWidth
    />
    <IconButton aria-label="delete city" onClick={() => onDelete(index)}>
      <DeleteIcon />
    </IconButton>
  </Box>
);

export default CityInput;
