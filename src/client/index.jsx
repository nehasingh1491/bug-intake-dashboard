import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import "./app.css";
import Header from "./components/Header";
import BugDetailPage from "./pages/BugDetailPage";
import BugListPage from "./pages/BugListPage";
import NewBugPage from "./pages/NewBugPage";
import NotFound from "./pages/NotFound";

const root = document.getElementById("root");
if (root !== null) {
  const appRoot = createRoot(root);
  appRoot.render(
    <React.Fragment>
      <ToastContainer position="bottom-right" theme="dark" />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<BugListPage />} />
            <Route path="/bugs" element={<BugListPage />} />
            <Route path="/bugs/new" element={<NewBugPage />} />
            <Route path="/bugs/:id" element={<BugDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}
