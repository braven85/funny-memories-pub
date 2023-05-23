import express from "express";
import memoryRoute from "./memory.route.js";

const router = express.Router();

router.use("/memories", memoryRoute);

export default router;
