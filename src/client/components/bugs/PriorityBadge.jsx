import { Chip } from "@mui/material";
import { getOptionLabel, priorityOptions } from "../../constants/bugOptions";

const priorityColors = {
  low: "default",
  medium: "warning",
  high: "error",
};

const PriorityBadge = ({ priority }) => {
  return (
    <Chip
      label={getOptionLabel(priorityOptions, priority)}
      color={priorityColors[priority] || "default"}
      size="small"
      variant={priority === "low" ? "outlined" : "filled"}
    />
  );
};

export default PriorityBadge;
