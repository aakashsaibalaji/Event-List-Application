import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import Header from '../components/Header';

function Home() {
    const [events, setEvents] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editEvent, setEditEvent] = useState({
        Eventname: '',
        Eventdescription: '',
        Eventcategory: '',
        people: '',
        Conductedby: '',
        Address: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5500/Event/main/allEvents');
            setEvents(response.data.Events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5500/Event/main/updateEvent/${editingId}`, editEvent);
            setEditingId(null);
            setEditEvent({
                Eventname: '',
                Eventdescription: '',
                Eventcategory: '',
                people: '',
                Conductedby: '',
                Address: ''
            });
            fetchEvents();
            toast.success("Successfully updated event!");
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5500/Event/main/deleteEvent/${id}`);
            toast.success("Successfully deleted the event!");
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const startEditing = (id, event) => {
        setEditingId(id);
        setEditEvent(event);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditEvent({
            Eventname: '',
            Eventdescription: '',
            Eventcategory: '',
            people: '',
            Conductedby: '',
            Address: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditEvent({ ...editEvent, [name]: value });
    };

    return (
        <div>
            <Header></Header>
            <div className="container mt-3 mb-4">
                <h2 className="my-4">Event Management</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {events.map((event) => (
                        <div key={event._id} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{event.Eventname}</h5>
                                    <p className="card-text">Description: {event.Eventdescription}</p>
                                    <p className="card-text">People: {event.people}</p>
                                    <p className="card-text">Conducted By: {event.Conductedby}</p>
                                    <p className="card-text">Address: {event.Address}</p>
                                    {editingId === event._id ? (
                                        <>
                                            <input
                                                type="text"
                                                name="Eventname"
                                                value={editEvent.Eventname}
                                                onChange={handleInputChange}
                                                className="form-control mb-2"
                                            />
                                            <textarea
                                                name="Eventdescription"
                                                value={editEvent.Eventdescription}
                                                onChange={handleInputChange}
                                                className="form-control mb-2"
                                                rows="3"
                                            ></textarea>
                                            {/* Add input fields for other event properties */}
                                            <button onClick={handleUpdate} className="btn btn-success me-2">Save</button>
                                            <button onClick={cancelEditing} className="btn btn-secondary">Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditing(event._id, event)} className="btn btn-warning me-2">Edit</button>
                                            <button onClick={() => handleDelete(event._id)} className="btn btn-danger">Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;




