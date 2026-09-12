import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({})
      .select("name email role createdAt")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Failed to load users:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load users",
      },
      { status: 500 }
    );
  }
}