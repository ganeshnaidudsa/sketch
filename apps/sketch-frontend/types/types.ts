export type Tool = "rectangle" | "circle" | "line" | "pencil";

export type Admin = {
    id: string;
    email: string;
    password: string;
    name: string;
    photo: string | null;
  };
  
  export type Room = {
    id: number;
    slug: string;
    createdAt: string;
    adminId: string;
    admin: Admin;
  };
  
