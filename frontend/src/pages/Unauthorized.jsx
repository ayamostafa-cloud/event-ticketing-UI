import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8">
                    <div className="mb-6">
                        <svg
                            className="mx-auto h-16 w-16 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
                    <p className="text-gray-400 mb-8">
                        You don't have permission to access this page. Please log in to continue.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Go to Login
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full px-6 py-3 text-gray-300 hover:text-white transition duration-150 ease-in-out"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized 