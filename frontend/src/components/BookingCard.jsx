import { format } from 'date-fns';

const BookingCard = ({ booking, onCancel }) => {
    const { event, ticketsBooked, totalPrice, status, createdAt, _id } = booking;
    const formattedDate = event?.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'Date TBA';
    const formattedTime = event?.date ? format(new Date(event.date), 'h:mm a') : 'Time TBA';
    const formattedBookingDate = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
    const isCancelled = status && status.toLowerCase() === 'cancelled';

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
                {/* Event Title */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {event?.title || 'Untitled Event'}
                </h3>
                {/* Event Date & Time */}
                <div className="flex items-center text-gray-300 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formattedDate} at {formattedTime}</span>
                </div>
                {/* Event Location */}
                <div className="flex items-center text-gray-300 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{event?.location || 'Location TBA'}</span>
                </div>
                {/* Booking Details */}
                <div className="text-gray-300 mb-2">
                    <span className="font-semibold">Tickets Booked:</span> {ticketsBooked}
                </div>
                <div className="text-gray-300 mb-2">
                    <span className="font-semibold">Total Price:</span> ${totalPrice}
                </div>
                <div className="text-gray-300 mb-2">
                    <span className="font-semibold">Booking Status:</span> <span className="capitalize">{status}</span>
                </div>
                <div className="text-gray-400 text-xs mb-2">
                    Booked on: {formattedBookingDate}
                </div>
                {/* Cancel Button */}
                {onCancel && !isCancelled && (
                    <button
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => onCancel(_id)}
                    >
                        Cancel Booking
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookingCard; 