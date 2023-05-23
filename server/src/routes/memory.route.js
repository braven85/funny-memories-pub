import express from "express";
import { body } from "express-validator";
import memoryController from "../controllers/memory.controller.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get("/", memoryController.getAllMemories);

router.post(
  "/",
  body("child")
    .exists()
    .withMessage("child is required")
    .isLength({ min: 1 })
    .withMessage("child can not be empty"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content can not be empty"),
  body("date")
    .exists()
    .withMessage("date is required")
    .isLength({ min: 1 })
    .withMessage("date can not be empty"),
  requestHandler.validate,
  memoryController.createMemory
);

router.delete("/:memoryId", memoryController.deleteMemory);

router.get("/:childName", memoryController.searchMemory);

router.put("/:id", memoryController.updateMemory);

export default router;
