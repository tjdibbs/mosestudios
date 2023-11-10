import { cookies } from "next/headers";
import { verify } from "./token";
import { Users } from "@models/index";

export default async function getUserSession(): Promise<{
  user: Roshestudios.User | null;
  token?: string;
}> {
  const cookieStore = cookies();
  const token = cookieStore.get("tk");

  if (!token?.value) return { user: null };

  const { payload, error } = verify(token.value);
  if (error) return { user: null };

  console.log({ payload });

  const user = await Users.findById(payload?.user._id, {
    password: 0,
    updatedAt: 0,
  }).lean();

  // @ts-ignore
  user._id = String(user?._id);
  // @ts-ignore
  return { user, token };
}
