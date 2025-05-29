import EventForm from '../components/EventForm'

const CreateEvent = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Create New Event</h1>
                <p className="text-gray-400">Fill in the details to create your event</p>
            </div>
            <EventForm />
        </div>
    )
}

export default CreateEvent 