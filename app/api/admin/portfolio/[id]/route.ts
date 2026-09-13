import mongoose from "mongoose";

import connectDB from "@/app/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";
import { getAuthUser } from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function checkAdmin() {
  const user = await getAuthUser();

  if (!user) {
    return {
      authorized: false,
      response: Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "admin") {
    return {
      authorized: false,
      response: Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true,
    user,
  };
}

// GET SINGLE PROJECT
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const auth = await checkAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid portfolio project ID",
        },
        { status: 400 }
      );
    }

    const project = await Portfolio.findById(id).lean();

    if (!project) {
      return Response.json(
        {
          success: false,
          message: "Portfolio project not found",
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

// UPDATE PROJECT
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const auth = await checkAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid portfolio project ID",
        },
        { status: 400 }
      );
    }

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
        _id: { $ne: id },
      });

    if (existingProject) {
      return Response.json(
        {
          success: false,
          message:
            "Another portfolio project already uses this slug",
        },
        { status: 409 }
      );
    }

    const project =
      await Portfolio.findById(id);

    if (!project) {
      return Response.json(
        {
          success: false,
          message: "Portfolio project not found",
        },
        { status: 404 }
      );
    }

    project.title = title;
    project.slug = slug.toLowerCase();
    project.category = category;
    project.description = description;
    project.client = client || "";
    project.tools = Array.isArray(tools)
      ? tools
      : [];
    project.images = Array.isArray(images)
      ? images
      : [];
    project.status =
      status === "published"
        ? "published"
        : "draft";

    await project.save();

    return Response.json({
      success: true,
      message:
        "Portfolio project updated successfully",
      project,
    });
  } catch (error) {
    console.error(
      "Failed to update portfolio project:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to update portfolio project",
      },
      { status: 500 }
    );
  }
}

// DELETE PROJECT
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const auth = await checkAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid portfolio project ID",
        },
        { status: 400 }
      );
    }

    const project =
      await Portfolio.findByIdAndDelete(id);

    if (!project) {
      return Response.json(
        {
          success: false,
          message: "Portfolio project not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message:
        "Portfolio project deleted successfully",
    });
  } catch (error) {
    console.error(
      "Failed to delete portfolio project:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to delete portfolio project",
      },
      { status: 500 }
    );
  }
}

// PUBLISH / UNPUBLISH PROJECT
export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const auth = await checkAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid portfolio project ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { status } = body;

    if (
      status !== "draft" &&
      status !== "published"
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Status must be draft or published",
        },
        { status: 400 }
      );
    }

    const project =
      await Portfolio.findById(id);

    if (!project) {
      return Response.json(
        {
          success: false,
          message: "Portfolio project not found",
        },
        { status: 404 }
      );
    }

    project.status = status;

    await project.save();

    return Response.json({
      success: true,
      message:
        status === "published"
          ? "Portfolio project published successfully"
          : "Portfolio project moved to draft successfully",
      project,
    });
  } catch (error) {
    console.error(
      "Failed to update portfolio status:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to update portfolio status",
      },
      { status: 500 }
    );
  }
}