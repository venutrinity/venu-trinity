import { getAuthUser } from "@/app/lib/auth";
import connectDB from "@/app/lib/mongodb";
import Course from "@/app/models/Course";

export async function GET() {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    if (!authUser) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

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