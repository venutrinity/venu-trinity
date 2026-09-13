import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  slug: string;

  category:
    | "Graphic Design"
    | "Video Editing"
    | "Web Development"
    | "Digital Marketing"
    | "Branding";

  description: string;

  client?: string;

  tools: string[];

  images: string[];

  status: "draft" | "published";

  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    category: {
      type: String,
      enum: [
        "Graphic Design",
        "Video Editing",
        "Web Development",
        "Digital Marketing",
        "Branding",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    client: {
      type: String,
      trim: true,
    },

    tools: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>(
    "Portfolio",
    PortfolioSchema
  );

export default Portfolio;