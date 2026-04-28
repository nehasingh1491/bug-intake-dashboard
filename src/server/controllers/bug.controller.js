import * as bugService from "../services/bug.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const listBugs = async (req, res) => {
  try {
    const bugs = bugService.findAll({
      status: req.query.status,
      priority: req.query.priority,
    });

    res.json(successResponse(bugs, "Bugs retrieved successfully"));
  } catch (error) {
    console.error("Error listing bugs:", error);
    res.status(500).json(errorResponse("Failed to retrieve bugs"));
  }
};

export const getBug = async (req, res) => {
  try {
    const bug = bugService.findById(req.params.id);

    if (!bug) {
      return res.status(404).json(errorResponse("Bug not found"));
    }

    res.json(successResponse(bug, "Bug retrieved successfully"));
  } catch (error) {
    console.error("Error retrieving bug:", error);
    res.status(500).json(errorResponse("Failed to retrieve bug"));
  }
};

export const createBug = async (req, res) => {
  try {
    const bug = bugService.create(req.body);
    res.status(201).json(successResponse(bug, "Bug created successfully"));
  } catch (error) {
    console.error("Error creating bug:", error);
    res.status(500).json(errorResponse("Failed to create bug"));
  }
};

export const updateBug = async (req, res) => {
  try {
    const bug = bugService.update(req.params.id, req.body);

    if (!bug) {
      return res.status(404).json(errorResponse("Bug not found"));
    }

    res.json(successResponse(bug, "Bug updated successfully"));
  } catch (error) {
    console.error("Error updating bug:", error);
    res.status(500).json(errorResponse("Failed to update bug"));
  }
};

export const updateBugStatus = async (req, res) => {
  try {
    const bug = bugService.updateStatus(req.params.id, req.body.status);

    if (!bug) {
      return res.status(404).json(errorResponse("Bug not found"));
    }

    res.json(successResponse(bug, "Bug status updated successfully"));
  } catch (error) {
    console.error("Error updating bug status:", error);
    res.status(500).json(errorResponse("Failed to update bug status"));
  }
};
