import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col text-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-gray-700/50">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout 