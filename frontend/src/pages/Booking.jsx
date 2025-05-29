import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state?.event;
    const [ticketsBooked, setTicketsBooked] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Redirect if no event is passed
    if (!event) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post('/bookings', {
                eventId: event._id,
                ticketsBooked: Number(ticketsBooked),
            });
            setSuccess('Booking successful!');
        } catch (err) {
            setError('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Book Tickets for {event.title}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Number of Tickets</label>
                        <input
                            type="number"
                            min="1"
                            max={event.remainingTickets}
                            value={ticketsBooked}
                            onChange={e => setTicketsBooked(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">Available: {event.remainingTickets}</p>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">{success}</div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Book Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Booking; 