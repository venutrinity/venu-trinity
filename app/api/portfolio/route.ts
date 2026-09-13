import connectDB from "@/app/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";

export async function GET() {
  try {
    await connectDB();

    const projects = await Portfolio.find({
      status: "published",
    })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(
      "Failed to load public portfolio:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load portfolio",
      },
      { status: 500 }
    );
  }
}
