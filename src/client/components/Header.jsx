import { Toolbar, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          mb: 4,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link href="/" color="inherit" style={{ textDecoration: "none" }} sx={{ flexGrow: 8, textAlign: "left" }}>
            <Box display="flex" alignItems="center">
              <BugReportIcon sx={{ mr: 1 }} />
              <Box fontWeight={700}>Bug Intake Dashboard</Box>
            </Box>
          </Link>
          <Button component={RouterLink} to="/bugs" color="inherit" startIcon={<BugReportIcon />}>
            Bugs
          </Button>
          <Button component={RouterLink} to="/bugs/new" color="inherit" startIcon={<AddIcon />}>
            New Bug
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
