import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../components/Header';
const Event = () => {
  const [formData, setFormData] = useState({
    Eventname: '',
    Eventdescription: '',
    Eventcategory: '',
    people: '',
    Conductedby: '',
    Address: ''
  });

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5500/Event/category/get-category');
      setCategories(response.data.category);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5500/Event/main/createEvent', formData);

      if (!response.data.success) {
        throw new Error('Failed to create event');
      }

      toast.success('Event created successfully!');
      // Optionally, you can reset the form here
      setFormData({
        Eventname: '',
        Eventdescription: '',
        Eventcategory: '',
        people: '',
        Conductedby: '',
        Address: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while creating event');
    }
  };

  return (
    <div>
        <Header></Header>
        <div className='col mt-3 mb-3'>
          <div className='row-11 row-lg-6 row-md-8 d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <h1>Event Creation Form</h1>
              <div className="mb-3">
                <label htmlFor="Eventname" className="form-label">Event Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="Eventname" 
                  name="Eventname" 
                  value={formData.Eventname} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Eventdescription" className="form-label">Event Description</label>
                <textarea 
                  className="form-control form-control-lg" 
                  id="Eventdescription" 
                  name="Eventdescription" 
                  value={formData.Eventdescription} 
                  onChange={handleChange} 
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="Eventcategory" className="form-label">Event Category</label>
                <select
                  className="form-control form-control-lg"
                  id="Eventcategory"
                  name="Eventcategory"
                  value={formData.Eventcategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="people" className="form-label">Number of People</label>
                <input 
                  type="number" 
                  className="form-control form-control-lg" 
                  id="people" 
                  name="people" 
                  value={formData.people} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Conductedby" className="form-label">Conducted By</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="Conductedby" 
                  name="Conductedby" 
                  value={formData.Conductedby} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Address" className="form-label">Event Location</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="Address" 
                  name="Address" 
                  value={formData.Address} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
    </div>
  );
}

export default Event;
