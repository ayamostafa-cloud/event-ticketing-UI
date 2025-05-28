import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            console.log('Fetching profile...')
            try {
                const response = await api.get('/users/profile')
                console.log('Profile response:', response.data)
                setProfile(response.data)
            } catch (err) {
                console.error('Profile fetch error details:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                })
                setError('Failed to load profile data')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold text-white">Profile Information</h1>
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/50 text-blue-300">
                                {profile?.role || 'User'}
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                                        {profile?.name || 'N/A'}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                                        {profile?.email || 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Account Created</label>
                                <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-700">
                                <button
                                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() => navigate('/profile/edit')}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile 