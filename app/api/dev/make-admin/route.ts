import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    user.role = "admin";
    await user.save();

    return Response.json({
      success: true,
      message: "User promoted to admin",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Make admin failed:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to promote user",
      },
      { status: 500 }
    );
  }
}