import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './shared/MainLayout'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/auth/ProtectedRoute'
import EventList from './pages/EventList'
import EventDetails from './pages/EventDetails'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import AdminEventList from './pages/admin/AdminEventList'
import AdminUsers from './pages/admin/AdminUsers'
import MyEvents from './pages/MyEvents'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import EventAnalytics from './pages/EventAnalytics'
//import ForgotPassword from './components/auth/ForgotPassword'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<EventList />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route
              path="bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route path="book-now" element={<Booking />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-events"
              element={
                <ProtectedRoute>
                  <MyEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-events/analytics"
              element={
                <ProtectedRoute>
                  <EventAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="events/new"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="events/:id/edit"
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/events"
              element={
                <ProtectedRoute>
                  <AdminEventList />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
