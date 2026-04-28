import { Chip } from "@mui/material";
import { getOptionLabel, statusOptions } from "../../constants/bugOptions";

const statusColors = {
  open: "info",
  in_progress: "warning",
  blocked: "error",
  resolved: "success",
};

const StatusBadge = ({ status }) => {
  return (
    <Chip
      label={getOptionLabel(statusOptions, status)}
      color={statusColors[status] || "default"}
      size="small"
      variant={status === "resolved" ? "filled" : "outlined"}
    />
  );
};

export default StatusBadge;
