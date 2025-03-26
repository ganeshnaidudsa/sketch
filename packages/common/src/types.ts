import { z } from "zod";

export const UserSignUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export const UserSignShema = z.object({
  email: z.string(),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string(),
});
