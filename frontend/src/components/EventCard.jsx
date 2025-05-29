import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const EventCard = ({ event, hideViewDetails = false, showStatus = false }) => {
    const {
        _id,
        title,
        description,
        date,
        location,
        category,
        image,
        ticketPrice,
        remainingTickets,
        status,
        totalTickets = remainingTickets // Default to remainingTickets if totalTickets is not provided
    } = event

    // Format the date
    const formattedDate = date ? format(new Date(date), 'MMM dd, yyyy') : 'Date TBA'
    const formattedTime = date ? format(new Date(date), 'h:mm a') : 'Time TBA'

    // Calculate booking percentage
    const bookingPercentage = totalTickets ? ((totalTickets - remainingTickets) / totalTickets) * 100 : 0

    // Status badge color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'bg-green-500'
            case 'pending':
                return 'bg-yellow-500'
            case 'rejected':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            {/* Status Badge for Admin (top right) */}
            {showStatus && (
                <span className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white rounded-full z-10 ${getStatusColor(status)}`}>
                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
                </span>
            )}
            {/* Event Content */}
            <div className="p-6">
                {/* Category */}
                {category && (
                    <div className="mb-2">
                        <span className="text-blue-400 text-sm font-semibold tracking-wide">
                            {category.toUpperCase()}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {title || 'Untitled Event'}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {description || 'No description available'}
                </p>

                {/* Date and Time */}
                <div className="flex items-center text-gray-300 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formattedDate} at {formattedTime}</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-300 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{location || 'Location TBA'}</span>
                </div>

                {/* Tickets and Price */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-300">
                        <span className="text-sm">Price: </span>
                        <span className="font-semibold">${ticketPrice || '0'}</span>
                    </div>
                    <div className="text-gray-300">
                        <span className="text-sm">Available: </span>
                        <span className="font-semibold">{remainingTickets || 0} tickets</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${bookingPercentage}%` }}
                    ></div>
                </div>

                {/* Action Button */}
                {!hideViewDetails && (
                    <Link
                        to={`/events/${_id}`}
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        View Details
                    </Link>
                )}
            </div>
        </div>
    )
}

export default EventCard 