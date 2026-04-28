import { Box, CircularProgress } from "@mui/material";

const AppLoading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" py={8}>
    <CircularProgress />
  </Box>
);

export default AppLoading;
