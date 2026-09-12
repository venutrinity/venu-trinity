import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductFile {
  fileName: string;
  fileType: string;
  fileUrl: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  category:
    | "PSD Files"
    | "Design Templates"
    | "Website Templates"
    | "Documents"
    | "Other";
  description: string;
  price: number;
  previewImage?: string;
  files: IProductFile[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const ProductFileSchema = new Schema<IProductFile>(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileType: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      enum: [
        "PSD Files",
        "Design Templates",
        "Website Templates",
        "Documents",
        "Other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    previewImage: {
      type: String,
      trim: true,
    },

    files: {
      type: [ProductFileSchema],
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

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;