import { useEffect, useState } from 'react';
import api from '../services/api';
import BookingCard from '../components/BookingCard';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/users/bookings');
                const bookingsArr = response.data.data.bookings || [];
                // Fetch full event details for each booking
                const bookingsWithEventDetails = await Promise.all(
                    bookingsArr.map(async (booking) => {
                        try {
                            const eventRes = await api.get(`/events/${booking.event._id}`);
                            return {
                                ...booking,
                                event: { ...booking.event, ...eventRes.data.data },
                            };
                        } catch (e) {
                            // If event fetch fails, fallback to original event data
                            return booking;
                        }
                    })
                );
                setBookings(bookingsWithEventDetails);
            } catch (err) {
                setError('Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        try {
            await api.delete(`/bookings/${bookingId}`);
            setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        } catch (err) {
            alert('Failed to cancel booking.');
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
            <div className="container mx-auto px-4 py-8 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (!bookings.length) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-white-600">
                <p>You have no bookings yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-white-800">My Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} onCancel={handleCancel} />
                ))}
            </div>
        </div>
    );
};

export default Bookings;
