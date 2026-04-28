import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import AppLoading from "../components/AppLoading";
import PriorityBadge from "../components/bugs/PriorityBadge";
import StatusBadge from "../components/bugs/StatusBadge";
import {
  areaOptions,
  getOptionLabel,
  statusOptions,
} from "../constants/bugOptions";
import { useBug } from "../hooks";

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const DetailField = ({ label, children }) => (
  <Box>
    <Typography variant="overline" color="text.secondary">
      {label}
    </Typography>
    <Typography sx={{ whiteSpace: "pre-wrap" }}>{children}</Typography>
  </Box>
);

const BugDetailPage = () => {
  const { id } = useParams();
  const { bug, error, isLoading, updateStatus } = useBug(id);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (bug) {
      setStatus(bug.status);
    }
  }, [bug]);

  const handleStatusUpdate = async () => {
    setIsSaving(true);
    try {
      await updateStatus(status);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" component="main" sx={{ py: 4 }}>
        <AppLoading />
      </Container>
    );
  }

  if (error || !bug) {
    return (
      <Container maxWidth="lg" component="main" sx={{ py: 4 }}>
        <Alert severity="error">Bug record could not be loaded.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" component="main" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Button
          component={RouterLink}
          to="/bugs"
          startIcon={<ArrowBackIcon />}
          sx={{ alignSelf: "flex-start" }}
        >
          Back to bugs
        </Button>

        <Paper elevation={1} sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box>
                <Typography variant="h4" component="h1" fontWeight={700}>
                  {bug.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Bug #{bug.id} · Updated {formatDateTime(bug.updatedAt)}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <StatusBadge status={bug.status} />
                <PriorityBadge priority={bug.priority} />
              </Stack>
            </Box>

            <Divider />

            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              }}
            >
              <Stack spacing={3}>
                <DetailField label="Description">{bug.description}</DetailField>
                <DetailField label="Steps to reproduce">
                  {bug.stepsToReproduce}
                </DetailField>
              </Stack>

              <Stack spacing={3}>
                <DetailField label="Assigned to">{bug.assignedTo}</DetailField>
                <DetailField label="Area">
                  {getOptionLabel(areaOptions, bug.area)}
                </DetailField>
                <DetailField label="Created">
                  {formatDateTime(bug.createdAt)}
                </DetailField>
              </Stack>
            </Box>

            <Divider />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <TextField
                select
                label="Status"
                size="small"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                sx={{ minWidth: 220 }}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isSaving || status === bug.status}
                onClick={handleStatusUpdate}
              >
                Update status
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default BugDetailPage;
