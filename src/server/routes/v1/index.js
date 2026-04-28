import { Router } from "express";
import { errors } from "celebrate";
import bugRoutes from "./bug.routes.js";
import { successResponse } from "../../utils/response.js";

const router = Router();

router.use("/bug", bugRoutes);

/**
 * GET /health
 * Health check endpoint.
 */
router.get("/health", (req, res) => {
  res.json(successResponse({ status: "ok" }, "API is healthy"));
});

// Handle Celebrate/Joi validation errors
router.use(errors());

// General error handling middleware
router.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

export default router;
