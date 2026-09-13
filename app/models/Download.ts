import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDownload extends Document {
  customerId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;

  productName: string;

  fileName: string;
  fileType: string;
  fileUrl: string;

  downloadCount: number;
  maxDownloads?: number;

  expiresAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const DownloadSchema = new Schema<IDownload>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },

    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

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

    downloadCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    maxDownloads: {
      type: Number,
      min: 1,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Download: Model<IDownload> =
  mongoose.models.Download ||
  mongoose.model<IDownload>(
    "Download",
    DownloadSchema
  );

export default Download;