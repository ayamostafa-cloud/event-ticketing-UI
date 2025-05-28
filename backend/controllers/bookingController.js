const Booking = require("../models/bookingModel");
const Event = require("../models/eventModel");

const bookingController = {
    BookATicket: async (req, res) => {
        try {
            const { eventId, ticketsBooked } = req.body;

            // Validate input
            if (!eventId || !ticketsBooked) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide both event ID and number of tickets"
                });
            }

            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "The requested event does not exist"
                });
            }

            if (event.status !== "approved") {
                return res.status(400).json({
                    success: false,
                    message: "This event is not available for booking at the moment"
                });
            }

            if (ticketsBooked > event.remainingTickets) {
                return res.status(400).json({
                    success: false,
                    message: `Sorry, only ${event.remainingTickets} tickets are available for this event`
                });
            }

            const totalPrice = ticketsBooked * event.ticketPrice;

            const booking = new Booking({
                user: req.user.userId,
                event: eventId,
                ticketsBooked,
                totalPrice,
                status: "pending"
            });

            event.remainingTickets -= ticketsBooked;
            await event.save();

            booking.status = "confirmed";
            await booking.save();

            return res.status(201).json({
                success: true,
                message: "Your tickets have been booked successfully",
                data: {
                    booking,
                    eventName: event.name,
                    eventDate: event.date,
                    totalAmount: totalPrice
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to process your booking at this time",
                error: err.message
            });
        }
    },

    getBooking: async (req, res) => {
        try {
            const booking = await Booking.findById(req.params.id)
                .populate('event', 'name date venue');

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "No booking found with the provided ID"
                });
            }

            if (booking.user.toString() !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to view this booking"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Booking details retrieved successfully",
                data: booking
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to retrieve booking details",
                error: err.message
            });
        }
    },

    cancelBooking: async (req, res) => {
        try {
            const booking = await Booking.findById(req.params.id);

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "No booking found with the provided ID"
                });
            }

            if (booking.user.toString() !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to cancel this booking"
                });
            }

            const event = await Event.findById(booking.event);
            if (event) {
                event.remainingTickets += booking.ticketsBooked;
                await event.save();
            }

            booking.status = "canceled";
            await booking.save();

            return res.status(200).json({
                success: true,
                message: "Your booking has been canceled successfully",
                data: {
                    bookingId: booking._id,
                    eventName: event.name,
                    refundedTickets: booking.ticketsBooked
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to cancel your booking at this time",
                error: err.message
            });
        }
    },

    getUserBookings: async (req, res) => {
        try {
            const bookings = await Booking.find({
                user: req.user.userId,
                status: "confirmed",
            })
                .populate("event", "name date venue")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: "Your bookings have been retrieved successfully",
                data: {
                    totalBookings: bookings.length,
                    bookings
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to retrieve your bookings",
                error: err.message
            });
        }
    }
};

module.exports = bookingController;