import { getAuthUser } from "@/app/lib/auth";

export async function GET() {
  const user = await getAuthUser();

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  if (user.role !== "admin") {
    return Response.json(
      {
        success: false,
        message: "Admin access required",
      },
      { status: 403 }
    );
  }

  return Response.json({
    success: true,
    message: "Admin access granted",
    user,
  });
}