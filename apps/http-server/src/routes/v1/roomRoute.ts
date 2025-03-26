import { Request, Response, Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import { getRooms, createRoom, getChats, getRoomIdBySlug, clearChats } from "../../service/roomService";


export const roomRouter: Router = Router();

roomRouter.get("/",authenticate, async (_req: Request, res: Response) => {
  const response = await getRooms();
   res.json(response);
});

roomRouter.post("/create",authenticate, authenticate, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId: string = req.headers.userId || "";
  const response = await createRoom(req.body, userId);
   res.status(response.status).json(response.data);
});

roomRouter.get("/chats/:roomId",authenticate, async (req: Request, res: Response) => {
  const response = await getChats(Number(req.params.roomId));
   res.json(response);
});

roomRouter.get("/roomId/:slug",authenticate, async (req: Request, res: Response) => {
  const response = await getRoomIdBySlug(req.params.slug!);
   res.json(response);
});

roomRouter.delete("/chats/:roomId", authenticate, async (req: Request, res: Response) => {
  const response = await clearChats(Number(req.params.roomId));
   res.json(response);
});
