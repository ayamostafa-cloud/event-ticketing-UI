import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Unauthorized from '../../pages/Unauthorized'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!user) {
        // Redirect to login with return path
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // If allowedRoles is empty, allow all authenticated users
    if (allowedRoles.length === 0) {
        return children
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(user.role)) {
        return <Unauthorized />
    }

    return children
}

export default ProtectedRoute 