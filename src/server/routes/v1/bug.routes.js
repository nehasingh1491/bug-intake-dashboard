import { Router } from "express";
import * as bugController from "../../controllers/bug.controller.js";
import { bugValidation } from "../../middleware/validate.js";

const router = Router();

router.get("/list", bugValidation.list, bugController.listBugs);
router.get("/:id", bugValidation.id, bugController.getBug);
router.post("/", bugValidation.create, bugController.createBug);
router.put("/:id", bugValidation.update, bugController.updateBug);
router.patch(
  "/:id/status",
  bugValidation.status,
  bugController.updateBugStatus
);

export default router;
