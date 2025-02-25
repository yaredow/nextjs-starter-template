import { user as userSchema } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getUser = async (userId: string) => {
  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, userId));

  if (!user) {
    return null;
  }

  return user;
};
