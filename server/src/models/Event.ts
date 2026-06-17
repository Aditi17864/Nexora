import { Schema, model } from "mongoose";
import { IEvent } from "../types";

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    organizerCommittee: { type: String, required: true, ref: "Committee" },
    participants: [{ type: String, ref: "User" }],
    budget: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export const Event = model<IEvent>("Event", eventSchema);
