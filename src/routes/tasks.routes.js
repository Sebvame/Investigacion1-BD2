import { Router } from "express";
import {authRequired} from "../middlewares/validateToken.js";
import {getTasks, getTask, createTask, deleteTask, UpdateTask} from "../controllers/task.controller.js";
import { validaShema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks:id", authRequired, getTask);
router.post("/tasks", authRequired, validaShema(createTaskSchema), createTask);
router.delete("/tasks:id", authRequired, deleteTask);
router.put("/tasks:id", authRequired, UpdateTask);

export default router;