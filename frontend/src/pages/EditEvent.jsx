import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'

const EditEvent = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        totalTickets: ''
    })

    useEffect(() => {
        fetchEvent()
    }, [id])

    const fetchEvent = async () => {
        try {
            const response = await api.get(`/events/${id}`)
            if (response.data) {
                const event = response.data
                // Safely handle the date format
                const formattedDate = event.date ? new Date(event.date).toISOString().split('T')[0] : ''
                setFormData({
                    date: formattedDate,
                    location: event.location || '',
                    totalTickets: event.totalTickets || ''
                })
            }
        } catch (error) {
            console.error('Error fetching event:', error)
            toast.error('Failed to load event details')
            navigate('/my-events')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.put(`/events/${id}`, {
                date: formData.date,
                location: formData.location,
                totalTickets: Number(formData.totalTickets)
            })

            if (response.data.success) {
                toast.success('Event updated successfully!')
                navigate('/my-events')
            } else {
                toast.error('Failed to update event')
            }
        } catch (error) {
            console.error('Error updating event:', error)
            toast.error(error.response?.data?.message || 'Failed to update event')
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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Edit Event</h1>
                <p className="text-gray-400">Update your event details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-300">
                        Total Tickets Available
                    </label>
                    <input
                        type="number"
                        id="totalTickets"
                        name="totalTickets"
                        min="1"
                        value={formData.totalTickets}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/my-events')}
                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Event'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditEvent 