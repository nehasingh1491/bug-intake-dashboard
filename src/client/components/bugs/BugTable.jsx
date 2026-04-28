import { Link as RouterLink } from "react-router-dom";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import { areaOptions, getOptionLabel } from "../../constants/bugOptions";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const BugTable = ({ bugs }) => {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table aria-label="Bug list">
        <TableHead>
          <TableRow>
            <TableCell width={72}>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell width={140}>Status</TableCell>
            <TableCell width={120}>Priority</TableCell>
            <TableCell width={150}>Area</TableCell>
            <TableCell width={160}>Assigned to</TableCell>
            <TableCell width={160}>Updated</TableCell>
            <TableCell width={72} align="right">
              View
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography color="text.secondary" sx={{ py: 3 }}>
                  No bugs match the current filters.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            bugs.map((bug) => (
              <TableRow key={bug.id} hover>
                <TableCell>{bug.id}</TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{bug.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {bug.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge status={bug.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={bug.priority} />
                </TableCell>
                <TableCell>{getOptionLabel(areaOptions, bug.area)}</TableCell>
                <TableCell>{bug.assignedTo}</TableCell>
                <TableCell>{formatDate(bug.updatedAt)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View bug">
                    <IconButton
                      component={RouterLink}
                      to={`/bugs/${bug.id}`}
                      color="primary"
                      size="small"
                      aria-label={`View bug ${bug.id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BugTable;
