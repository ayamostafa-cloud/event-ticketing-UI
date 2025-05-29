import { useState, useEffect } from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users')
            if (Array.isArray(response.data)) {
                setUsers(response.data)
            } else {
                setError('Invalid data format received from server')
            }
            setLoading(false)
        } catch (err) {
            console.error('Error fetching users:', err)
            setError('Failed to fetch users')
            setLoading(false)
        }
    }

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            const response = await api.put(`/users/${userId}`, { role: newRole })
            if (response.data) {
                setUsers(users.map(user =>
                    user._id === userId ? { ...user, role: newRole } : user
                ))
                toast.success(`User role updated to ${newRole} successfully`)
            } else {
                toast.error('Failed to update user role')
            }
        } catch (err) {
            console.error('Error updating user role:', err)
            toast.error('Failed to update user role')
        }
    }

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return

        try {
            const response = await api.delete(`/users/${userId}`)
            setUsers(users.filter(user => user._id !== userId))
            toast.success('User deleted successfully')
        } catch (err) {
            console.error('Error deleting user:', err)
            toast.error('Failed to delete user')
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <div className="text-center p-4">Loading...</div>
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>
    if (!users.length) {
        return <div className="text-center p-4">No users found</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">User Management</h1>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {user.name || user.username || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.role === 'admin' ? 'bg-purple-900 text-purple-200' :
                                            user.role === 'organizer' ? 'bg-blue-900 text-blue-200' :
                                                'bg-green-900 text-green-200'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                            className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                                        >
                                            <option value="user">User</option>
                                            <option value="organizer">Organizer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers 