import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { Committee } from "../models/Committee";

export const committeeController = {
  async createCommittee(req: AuthRequest, res: Response) {
    try {
      const { committeeName, description, facultyCoordinator, committeeHead } = req.body;
      const committee = new Committee({
        committeeName,
        description,
        facultyCoordinator,
        committeeHead,
        members: [committeeHead],
      });
      await committee.save();
      return sendSuccess(res, "Committee created successfully", committee, 201);
    } catch (error: any) {
      return sendError(res, "Failed to create committee", error.message, 400);
    }
  },

  async getCommittees(req: AuthRequest, res: Response) {
    try {
      const committees = await Committee.find();
      return sendSuccess(res, "Committees fetched", committees);
    } catch (error: any) {
      return sendError(res, "Failed to fetch committees", error.message, 500);
    }
  },

  async getCommitteeById(req: AuthRequest, res: Response) {
    try {
      const committee = await Committee.findById(req.params.id);
      if (!committee) {
        return sendError(res, "Committee not found", undefined, 404);
      }
      return sendSuccess(res, "Committee fetched", committee);
    } catch (error: any) {
      return sendError(res, "Failed to fetch committee", error.message, 500);
    }
  },

  async updateCommittee(req: AuthRequest, res: Response) {
    try {
      const committee = await Committee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return sendSuccess(res, "Committee updated successfully", committee);
    } catch (error: any) {
      return sendError(res, "Failed to update committee", error.message, 500);
    }
  },

  async deleteCommittee(req: AuthRequest, res: Response) {
    try {
      await Committee.findByIdAndDelete(req.params.id);
      return sendSuccess(res, "Committee deleted successfully");
    } catch (error: any) {
      return sendError(res, "Failed to delete committee", error.message, 500);
    }
  },

  async addMember(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const committee = await Committee.findByIdAndUpdate(
        id,
        { $addToSet: { members: userId } },
        { new: true }
      );
      return sendSuccess(res, "Member added successfully", committee);
    } catch (error: any) {
      return sendError(res, "Failed to add member", error.message, 400);
    }
  },

  async removeMember(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const committee = await Committee.findByIdAndUpdate(
        id,
        { $pull: { members: userId } },
        { new: true }
      );
      return sendSuccess(res, "Member removed successfully", committee);
    } catch (error: any) {
      return sendError(res, "Failed to remove member", error.message, 400);
    }
  },
};
