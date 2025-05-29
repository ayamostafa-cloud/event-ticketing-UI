import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                console.log(response.data.data);
                setEvent(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (err) {
            return 'Invalid date';
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'Time not specified';
        try {
            return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (err) {
            return 'Invalid time';
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p>Event not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-white-800">{event.title || 'Untitled Event'}</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Event Details</h2>
                        <div className="space-y-3">
                            <p className="text-gray-700"><span className="font-medium">Date:</span> {formatDate(event.date)}</p>
                            <p className="text-gray-700"><span className="font-medium">Time:</span> {formatTime(event.date)}</p>
                            <p className="text-gray-700"><span className="font-medium">Location:</span> {event.location || 'Location not specified'}</p>
                            <p className="text-gray-700"><span className="font-medium">Price:</span> ${event.ticketPrice || '0'}</p>
                            <p className="text-gray-700"><span className="font-medium">Available Tickets:</span> {event.remainingTickets || '0'}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Description</h2>
                        <p className="text-gray-700">{event.description || 'No description available'}</p>
                    </div>

                    <div className="mt-6">
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => navigate('/book-now', { state: { event } })}
                        >
                            Book Tickets
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails; 