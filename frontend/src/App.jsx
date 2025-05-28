import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './shared/MainLayout'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import Login from './components/auth/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/auth/ProtectedRoute'
//import Register from './components/auth/'
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
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<MainLayout />}>
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
