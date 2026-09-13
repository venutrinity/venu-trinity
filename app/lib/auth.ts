import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AuthUser = {
  userId: string;
  role: "customer" | "admin";
};

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Please define JWT_SECRET in .env.local");
  }

  return secret;
}

export function signAuthToken(user: AuthUser): string {
  return jwt.sign(user, getJWTSecret(), {
    expiresIn: "7d",
  });
}

export function verifyAuthToken(
  token: string
): AuthUser | null {
  try {
    const decoded = jwt.verify(
      token,
      getJWTSecret()
    );

    if (
      typeof decoded !== "object" ||
      decoded === null
    ) {
      return null;
    }

    const payload = decoded as {
      userId?: unknown;
      role?: unknown;
    };

    if (
      typeof payload.userId !== "string" ||
      (payload.role !== "admin" &&
        payload.role !== "customer")
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch (error) {
    console.error(
      "Authentication failed:",
      error
    );

    return null;
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    return verifyAuthToken(token);
  } catch (error) {
    console.error(
      "Authentication failed:",
      error
    );

    return null;
  }
}