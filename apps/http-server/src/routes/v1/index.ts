import { Router } from "express";
import { authRouter } from "./authRoute";
import { roomRouter } from "./roomRoute";

export const router: Router = Router();

router.use("/auth", authRouter);
router.use("/room", roomRouter);
