const Event = require("../models/eventModel");

const eventController = {
    createEvent: async (req, res) => {
        try {
            const {
                title,
                description,
                date,
                location,
                category,
                image,
                ticketPrice,
                totalTickets
            } = req.body;

            if (req.user.role !== "organizer") {
                return res.status(403).json({
                    success: false,
                    message: "Only event organizers can create new events"
                });
            }

            const event = new Event({
                title,
                description,
                date,
                location,
                category,
                image,
                ticketPrice,
                totalTickets,
                remainingTickets: totalTickets,
                status: "pending",
                organizer: req.user.userId,
            });

            const newEvent = await event.save();
            return res.status(201).json({
                success: true,
                message: "Event created successfully and pending approval",
                data: newEvent
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to create event at this time",
                error: err.message
            });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find({ status: "approved" })
                .select('title description date location category image ticketPrice remainingTickets')
                .sort({ date: 1 });

            return res.status(200).json({
                success: true,
                message: "Events retrieved successfully",
                data: {
                    totalEvents: events.length,
                    events
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to retrieve events",
                error: err.message
            });
        }
    },

    getAllEventsAdmin: async (req, res) => {
        try {
            const events = await Event.find({})
                .populate('organizer', 'name email')
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: "All events retrieved successfully",
                data: {
                    totalEvents: events.length,
                    events
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to retrieve events",
                error: err.message
            });
        }
    },

    getEventDetails: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id)
                .populate('organizer', 'name email');

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "No event found with the provided ID"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Event details retrieved successfully",
                data: event
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to retrieve event details",
                error: err.message
            });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "No event found with the provided ID"
                });
            }

            if (req.user.role === 'organizer') {
                if (event.organizer.toString() !== req.user.userId) {
                    return res.status(403).json({
                        success: false,
                        message: "You don't have permission to update this event"
                    });
                }

                const { date, location, totalTickets } = req.body;
                event.date = date || event.date;
                event.location = location || event.location;

                if (totalTickets && totalTickets >= event.totalTickets) {
                    const ticketDifference = totalTickets - event.totalTickets;
                    event.remainingTickets += ticketDifference;
                    event.totalTickets = totalTickets;
                } else if (totalTickets) {
                    return res.status(400).json({
                        success: false,
                        message: "Cannot reduce total tickets as there might be existing bookings"
                    });
                }
            } else if (req.user.role === 'admin') {
                const { status } = req.body;
                if (!['pending', 'approved', 'rejected'].includes(status)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid event status"
                    });
                }
                event.status = status;
            }

            const updated = await event.save();
            return res.status(200).json({
                success: true,
                message: "Event updated successfully",
                data: updated
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to update event",
                error: err.message
            });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "No event found with the provided ID"
                });
            }

            if (req.user.role === 'organizer' && event.organizer.toString() !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to delete this event"
                });
            }

            await event.deleteOne();
            return res.status(200).json({
                success: true,
                message: "Event deleted successfully",
                data: {
                    eventId: req.params.id,
                    title: event.title
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to delete event",
                error: err.message
            });
        }
    }
};

module.exports = eventController;