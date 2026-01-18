import { Router } from "express";
import teachersController from "../controller/teachers-controller.js";
const router = Router();

router.post("/", teachersController.postTeacher);
router.get("/:id", teachersController.getTeacherById);
router.put("/:id", teachersController.updateTeacher);
router.delete("/:id", teachersController.deleteTeacher);
export default router;
