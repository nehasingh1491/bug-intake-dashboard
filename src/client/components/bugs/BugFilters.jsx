import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { priorityOptions, statusOptions } from "../../constants/bugOptions";

const BugFilters = ({ filters, onChange, onClear, disabled = false }) => {
  const handleChange = (field) => (event) => {
    onChange({
      ...filters,
      [field]: event.target.value,
    });
  };

  const hasFilters = Boolean(filters.status || filters.priority);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          label="Status"
          value={filters.status || ""}
          onChange={handleChange("status")}
          disabled={disabled}
        >
          <MenuItem value="">All statuses</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="priority-filter-label">Priority</InputLabel>
        <Select
          labelId="priority-filter-label"
          label="Priority"
          value={filters.priority || ""}
          onChange={handleChange("priority")}
          disabled={disabled}
        >
          <MenuItem value="">All priorities</MenuItem>
          {priorityOptions.map((priority) => (
            <MenuItem key={priority.value} value={priority.value}>
              {priority.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        startIcon={<FilterAltOffIcon />}
        onClick={onClear}
        disabled={disabled || !hasFilters}
      >
        Clear
      </Button>
    </Box>
  );
};

export default BugFilters;
