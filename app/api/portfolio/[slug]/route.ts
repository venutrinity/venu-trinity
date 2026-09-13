import connectDB from "@/app/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const project = await Portfolio.findOne({
      slug: slug.toLowerCase(),
      status: "published",
    }).lean();

    if (!project) {
      return Response.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "Failed to load portfolio project:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load portfolio project",
      },
      { status: 500 }
    );
  }
}