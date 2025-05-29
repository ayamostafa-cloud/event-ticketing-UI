import { useState, useEffect } from 'react'
import api from '../services/api'
import EventCard from '../components/EventCard'
import { toast } from 'react-toastify'

const EventList = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const response = await api.get('/events')
            setEvents(response.data.data.events)
            setError(null)
        } catch (err) {
            setError('Failed to fetch events')
            toast.error('Failed to load events. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
                    <button
                        onClick={fetchEvents}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Upcoming Events</h1>
                <p className="text-gray-400">Discover and book tickets for amazing events</p>
            </div>

            {/* Events Grid */}
            {events.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-400">No events found</h3>
                    <p className="text-gray-500 mt-2">Check back later for new events</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default EventList 