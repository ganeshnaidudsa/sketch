import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config";
import { UserSignUpSchema, UserSignShema } from "@repo/common/types";

const SALT_ROUNDS = 10;

export async function signUpUser(body: any) {
  const parsedBody = UserSignUpSchema.safeParse(body);
  if (!parsedBody.success) {
    return { status: 403, message: "Invalid User Data!" };
  }

  const userData = parsedBody.data;

  const userExists = await prismaClient.user.findFirst({
    where: { email: userData.email },
  });

  if (userExists) {
    return { status: 403, message: "Username Already Taken!" };
  }

  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

  await prismaClient.user.create({
    data: { name: userData.name, email: userData.email, password: hashedPassword },
  });

  return { status: 200, message: "User SignUp Success!" };
}

export async function signInUser(body: any) {
  const parsedBody = UserSignShema.safeParse(body);
  if (!parsedBody.success) {
    return { status: 403, data: { message: "Invalid User Data!" } };
  }

  const userData = parsedBody.data;
  const user = await prismaClient.user.findFirst({
    where: { email: userData.email },
  });

  if (!user) {
    return { status: 403, data: { message: "Invalid Credentials!" } };
  }

  const match = await bcrypt.compare(userData.password, user.password);
  if (!match) {
    return { status: 403, data: { message: "Invalid Credentials!" } };
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return { status: 200, data: { token, message: "User Signin Success!" } };
}
