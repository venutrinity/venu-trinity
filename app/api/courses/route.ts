import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import Course from "@/app/models/Course";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: "customer" | "admin";
    };

    const courses = await Course.find({
      status: "published",
    }).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      courses: courses.map((course) => ({
        id: course._id,
        name: course.name,
        description: course.description,
        thumbnail: course.thumbnail,
        progress: 0,
      })),
    });
  } catch (error) {
    console.error("Failed to load courses:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load courses",
      },
      { status: 500 }
    );
  }
}