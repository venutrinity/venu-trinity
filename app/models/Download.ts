import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDownloadFile {
  fileName: string;
  fileType: string;
  fileUrl: string;
}

export interface IDownload extends Document {
  customerId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  productName: string;
  files: IDownloadFile[];
  purchasedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DownloadFileSchema = new Schema<IDownloadFile>(
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

const DownloadSchema = new Schema<IDownload>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

    files: {
      type: [DownloadFileSchema],
      required: true,
      default: [],
    },

    purchasedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Download: Model<IDownload> =
  mongoose.models.Download ||
  mongoose.model<IDownload>("Download", DownloadSchema);

export default Download;