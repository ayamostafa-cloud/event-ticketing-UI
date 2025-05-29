import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import EventCard from '../../components/EventCard'
import { toast } from 'react-toastify'

const AdminEventList = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events/all')
            if (response.data.success && response.data.data.events) {
                setEvents(response.data.data.events)
            } else {
                setError('Invalid data format received from server')
            }
            setLoading(false)
        } catch (err) {
            console.error('Error fetching events:', err)
            setError('Failed to fetch events')
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (eventId, newStatus) => {
        try {
            const response = await api.put(`/events/${eventId}`, { status: newStatus })
            if (response.data.success) {
                toast.success(`Event ${newStatus} successfully`)
                // Refresh the events list
                fetchEvents()
            } else {
                toast.error('Failed to update event status')
            }
        } catch (err) {
            console.error('Error updating event status:', err)
            toast.error('Failed to update event status')
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    if (loading) return <div className="text-center p-4">Loading...</div>
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>
    if (!events.length) {
        return <div className="text-center p-4">No events found</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Admin Event Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="relative">
                        <EventCard event={event} hideViewDetails={true} showStatus={true} />
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                            <button
                                onClick={() => handleStatusUpdate(event._id, 'approved')}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(event._id, 'rejected')}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminEventList 