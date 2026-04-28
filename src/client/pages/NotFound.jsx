import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFound = () => {
  return (
    <Container maxWidth="md" component="main" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <SentimentVeryDissatisfiedIcon style={{ fontSize: 80 }} />
          <Typography variant="h4" align="center">
            404
          </Typography>
          <Typography variant="subtitle1" align="center">
            The requested page cannot be found.
          </Typography>
          <Button component={RouterLink} to="/bugs" sx={{ mt: 2 }}>
            Back to bugs
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
