import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'

const EventForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        ticketPrice: '',
        totalTickets: ''
    })

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
            const response = await api.post('/events', {
                ...formData,
                ticketPrice: Number(formData.ticketPrice),
                totalTickets: Number(formData.totalTickets)
            })

            if (response.data.success) {
                toast.success('Event created successfully!')
                navigate('/my-events')
            } else {
                toast.error('Failed to create event')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create event')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Event Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                    Event Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    required
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
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    <option value="Musical">Musical</option>
                    <option value="Sports">Sports</option>
                    <option value="Conference">Conference</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-300">
                    Ticket Price (EGP)
                </label>
                <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    required
                    min="0"
                    value={formData.ticketPrice}
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
                    required
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
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </div>
        </form>
    )
}

export default EventForm 