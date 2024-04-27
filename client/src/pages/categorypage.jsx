import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';

function Category() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

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

    const handleCreate = async () => {
        try {
            await axios.post('http://localhost:5500/Event/category/create-category', { name });
            setName('');
            fetchCategories();
            toast.success("Category created successfully!");
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5500/Event/category/update-category/${editingId}`, { name: editName });
            setEditingId(null);
            setEditName('');
            fetchCategories();
            toast.success("Category updated successfully!");
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5500/Event/category/delete-category/${id}`);
            fetchCategories();
            toast.success( "Category deleted successfully!");
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const startEditing = (id, name) => {
        setEditingId(id);
        setEditName(name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditName('');
    };

    return (
        <Layout>
            <div className="container mt-3 mb-3">
                <h2 className="my-4">Category Management</h2>
                <div className="mb-3">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter category name" />
                    <button onClick={handleCreate} className="btn btn-primary mx-2">Create</button>
                </div>
                <ul className="list-group">
                    {categories.map((category) => (
                        <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {editingId === category._id ? (
                                <>
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control" />
                                    <button onClick={handleUpdate} className="btn btn-success mx-2">Save</button>
                                    <button onClick={cancelEditing} className="btn btn-secondary">Cancel</button>
                                </>
                            ) : (
                                <>
                                    {category.name}
                                    <div>
                                        <button onClick={() => startEditing(category._id, category.name)} className="btn btn-warning mx-2">Edit</button>
                                        <button onClick={() => handleDelete(category._id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default Category;

