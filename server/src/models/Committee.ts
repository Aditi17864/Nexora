import { Schema, model } from "mongoose";
import { ICommittee } from "../types";

const committeeSchema = new Schema<ICommittee>(
  {
    committeeName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    facultyCoordinator: { type: String, required: true },
    committeeHead: { type: String, required: true },
    members: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);

export const Committee = model<ICommittee>("Committee", committeeSchema);
