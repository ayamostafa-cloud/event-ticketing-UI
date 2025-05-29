import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const { forgotPassword } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const result = await forgotPassword(email)
            if (result.success) {
                setSuccess('Password reset instructions have been sent to your email')
                setEmail('')
                // Redirect to reset password page after a short delay
                setTimeout(() => {
                    navigate(result.redirect)
                }, 2000)
            } else {
                setError(result.error)
            }
        } catch (err) {
            setError('An error occurred while processing your request')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Enter your email address and we'll send you instructions to reset your password
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                        >
                            {loading ? 'Sending...' : 'Send Reset Instructions'}
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Remember your password?{' '}
                            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword 