"use server";

import { z } from "zod";
import prisma from "../prismadb";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export async function Submit(values: z.infer<typeof SignupSchema>) {
  try {
    const validatedFields = SignupSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        error: "Email alreday in use",
      };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: "User created",
    };
  } catch (error) {
    console.error("Error during sign up:", error);
  }
}
