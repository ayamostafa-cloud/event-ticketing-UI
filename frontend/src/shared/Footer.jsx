import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-600">
                            Your trusted platform for event ticketing and management.
                        </p>
                    </div>

                </div>
                <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
                    <p>&copy; 2025 Event Ticketing System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer 