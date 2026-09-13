import connectDB from "@/app/lib/mongodb";
import { getAuthUser } from "@/app/lib/auth";
import Portfolio from "@/app/models/Portfolio";

export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user || user.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const projects = await Portfolio.find({})
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(
      "Failed to load admin portfolio:",
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

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();

    if (!user || user.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
      title,
      slug,
      category,
      description,
      client,
      tools,
      images,
      status,
    } = body;

    if (
      !title ||
      !slug ||
      !category ||
      !description
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Title, slug, category and description are required",
        },
        { status: 400 }
      );
    }

    const existingProject =
      await Portfolio.findOne({
        slug: slug.toLowerCase(),
      });

    if (existingProject) {
      return Response.json(
        {
          success: false,
          message:
            "A portfolio project with this slug already exists",
        },
        { status: 409 }
      );
    }

    const project = await Portfolio.create({
      title: title.trim(),
      slug: slug.toLowerCase().trim(),
      category,
      description: description.trim(),
      client: client?.trim() || "",
      tools: Array.isArray(tools)
        ? tools
        : [],
      images: Array.isArray(images)
        ? images
        : [],
      status:
        status === "published"
          ? "published"
          : "draft",
    });

    return Response.json(
      {
        success: true,
        message:
          "Portfolio project created successfully",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Failed to create portfolio project:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to create portfolio project",
      },
      { status: 500 }
    );
  }
}