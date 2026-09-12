import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return Response.json(
        {
          success: false,
          message: "Email and new password are required",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return Response.json(
        {
          success: false,
          message: "Password must be at least 6 characters",
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

    const passwordHash = await bcrypt.hash(newPassword, 12);

    user.passwordHash = passwordHash;
    await user.save();

    return Response.json({
      success: true,
      message: "Password reset successfully",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Password reset failed:", error);

    return Response.json(
      {
        success: false,
        message: "Password reset failed",
      },
      { status: 500 }
    );
  }
}