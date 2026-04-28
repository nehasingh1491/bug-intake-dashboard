import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BugReportIcon from "@mui/icons-material/BugReport";
import AppLoading from "../components/AppLoading";
import BugFilters from "../components/bugs/BugFilters";
import BugTable from "../components/bugs/BugTable";
import { useBugs } from "../hooks";

const defaultFilters = {
  status: "",
  priority: "",
};

const BugListPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const { bugs, error, isLoading } = useBugs(filters);

  const counts = useMemo(() => {
    return bugs.reduce(
      (summary, bug) => ({
        ...summary,
        [bug.status]: (summary[bug.status] || 0) + 1,
      }),
      {}
    );
  }, [bugs]);

  return (
    <Container maxWidth="xl" component="main" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <BugReportIcon color="primary" />
              <Typography variant="h4" component="h1" fontWeight={700}>
                Bug Intake Dashboard
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {bugs.length} bugs shown
              {counts.blocked ? `, ${counts.blocked} blocked` : ""}
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/bugs/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            New bug
          </Button>
        </Box>

        <BugFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultFilters)}
          disabled={isLoading}
        />

        {error && (
          <Alert severity="error">Unable to load bugs from the API.</Alert>
        )}

        {isLoading ? <AppLoading /> : <BugTable bugs={bugs} />}
      </Stack>
    </Container>
  );
};

export default BugListPage;
