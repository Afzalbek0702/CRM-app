import {Router} from 'express';
import loginController from '../controller/login-controller.js';
import { authMiddleware } from "../lib/authMiddleware.js";
import { requireRole } from "../lib/roleMiddleware.js";
const router = Router();
router.post('/login', loginController.login);
router.post('/register', authMiddleware, requireRole('admin'), loginController.register);
export default router;