import { Request, Response, Router } from "express";
import { signUpUser, signInUser } from "../../service/authService";

export const authRouter: Router = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const response = await signUpUser(req.body);
  res.status(response.status).json({ message: response.message });
  return;
});

authRouter.post("/signin", async (req: Request, res: Response) => {
  const response = await signInUser(req.body);
  res.status(response.status).json(response.data);
  return;
});
