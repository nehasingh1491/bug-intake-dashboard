import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BugForm from "../components/bugs/BugForm";
import { useBugs } from "../hooks";

const NewBugPage = () => {
  const navigate = useNavigate();
  const { createBug } = useBugs({}, { autoFetch: false });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const bug = await createBug(values);
      navigate(`/bugs/${bug.id}`);
    } finally {
      setSubmitting(false);
    }
  };

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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" fontWeight={700}>
              New bug
            </Typography>
            <Typography color="text.secondary">
              Record the current report exactly enough for triage.
            </Typography>
          </Box>

          <BugForm onSubmit={handleSubmit} submitLabel="Create bug" />
        </Paper>
      </Stack>
    </Container>
  );
};

export default NewBugPage;
