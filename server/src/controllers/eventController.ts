import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { Event } from "../models/Event";

export const eventController = {
  async createEvent(req: AuthRequest, res: Response) {
    try {
      const { title, description, date, venue, organizerCommittee, budget } = req.body;
      const event = new Event({
        title,
        description,
        date,
        venue,
        organizerCommittee,
        budget,
        participants: [req.user?.id],
      });
      await event.save();
      return sendSuccess(res, "Event created successfully", event, 201);
    } catch (error: any) {
      return sendError(res, "Failed to create event", error.message, 400);
    }
  },

  async getEvents(req: AuthRequest, res: Response) {
    try {
      const events = await Event.find().sort({ date: 1 });
      return sendSuccess(res, "Events fetched", events);
    } catch (error: any) {
      return sendError(res, "Failed to fetch events", error.message, 500);
    }
  },

  async getUpcomingEvents(req: AuthRequest, res: Response) {
    try {
      const now = new Date();
      const events = await Event.find({ 
        date: { $gte: now },
        status: "upcoming"
      }).sort({ date: 1 });
      return sendSuccess(res, "Upcoming events fetched", events);
    } catch (error: any) {
      return sendError(res, "Failed to fetch upcoming events", error.message, 500);
    }
  },

  async getEventById(req: AuthRequest, res: Response) {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return sendError(res, "Event not found", undefined, 404);
      }
      return sendSuccess(res, "Event fetched", event);
    } catch (error: any) {
      return sendError(res, "Failed to fetch event", error.message, 500);
    }
  },

  async updateEvent(req: AuthRequest, res: Response) {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return sendSuccess(res, "Event updated successfully", event);
    } catch (error: any) {
      return sendError(res, "Failed to update event", error.message, 500);
    }
  },

  async deleteEvent(req: AuthRequest, res: Response) {
    try {
      await Event.findByIdAndDelete(req.params.id);
      return sendSuccess(res, "Event deleted successfully");
    } catch (error: any) {
      return sendError(res, "Failed to delete event", error.message, 500);
    }
  },

  async registerParticipant(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const event = await Event.findByIdAndUpdate(
        id,
        { $addToSet: { participants: req.user?.id } },
        { new: true }
      );
      return sendSuccess(res, "Participant registered successfully", event);
    } catch (error: any) {
      return sendError(res, "Failed to register participant", error.message, 400);
    }
  },
};
