import { prismaClient } from "@repo/db/client";
import { CreateRoomSchema } from "@repo/common/types";

export async function getRooms() {
  const rooms = await prismaClient.room.findMany({
    include: { admin: true },
  });
  return { rooms };
}

export async function createRoom(body: any, userId: string) {
  const parsedBody = CreateRoomSchema.safeParse(body);
  if (!parsedBody.success) {
    return { status: 403, data: { message: "Invalid User Details!" } };
  }

  const exsistingRoom = await prismaClient.room.findFirst({
    where: {
      slug: parsedBody.data.name
    }
  });

  if (exsistingRoom) {
    return { status: 403, data: { message: "Room Already Exsists !" } }
  }

  const room = await prismaClient.room.create({
    data: { slug: parsedBody.data.name, adminId: userId },
  });

  return { status: 200, data: { roomId: room.id } };
}

export async function getChats(roomId: number) {
  const messages = await prismaClient.chat.findMany({
    where: { roomId },
    orderBy: { id: "desc" },
    take: 50,
  });

  return { messages };
}

export async function getRoomIdBySlug(slug: string) {
  const room = await prismaClient.room.findFirst({ where: { slug } });

  if (!room) {
    return { message: "Invalid Slug!" };
  }

  return { roomId: room.id };
}

export async function clearChats(roomId: number) {
  await prismaClient.chat.deleteMany({ where: { roomId } });
  return { message: "Cleared the chats!" };
}
