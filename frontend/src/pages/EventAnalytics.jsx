import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import api from '../services/api'
import { toast } from 'react-toastify'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const EventAnalytics = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [analytics, setAnalytics] = useState([])

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            const response = await api.get('/users/events/analytics')
            setAnalytics(response.data)
        } catch (error) {
            console.error('Error fetching analytics:', error)
            toast.error('Failed to load analytics data')
        } finally {
            setLoading(false)
        }
    }

    const chartData = {
        labels: analytics.map(event => event.title),
        datasets: [
            {
                data: analytics.map(event => event.percentage),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: 'white',
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}% booked`
                    }
                }
            }
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
                <h1 className="text-3xl font-bold text-white mb-2">Event Analytics</h1>
                <p className="text-gray-400">View booking statistics for your events</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
                {analytics.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-2xl">
                            <Pie data={chartData} options={chartOptions} />
                        </div>
                        <div className="mt-8 w-full">
                            <h2 className="text-xl font-semibold text-white mb-4">Event Details</h2>
                            <div className="space-y-4">
                                {analytics.map((event) => (
                                    <div key={event.eventId} className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-white font-medium">{event.title}</h3>
                                                <p className="text-gray-400 text-sm">
                                                    {new Date(event.date).toLocaleDateString()} • {event.category}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-semibold">{event.percentage}%</p>
                                                <p className="text-gray-400 text-sm">booked</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400">
                        <p>No events found to display analytics</p>
                        <button
                            onClick={() => navigate('/my-events')}
                            className="mt-4 text-blue-500 hover:text-blue-400"
                        >
                            Go to My Events
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EventAnalytics 