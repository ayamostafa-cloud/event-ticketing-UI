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
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<EventList />} />
            <Route path="events/:id" element={<EventDetails />} />
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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
