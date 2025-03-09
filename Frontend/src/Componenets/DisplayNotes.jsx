import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayNotes = ({ email }) => {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedNote, setUpdatedNote] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/notes?email=${email}`);
                setNotes(res.data);
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        };
        if (email) fetchNotes();
    }, [email]);

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    const openEditModal = (note) => {
        setEditingNote(note);
        setUpdatedTitle(note.title);
        setUpdatedNote(note.note);
    };

    const updateNote = async () => {
        if (!editingNote) return;

        try {
            const res = await axios.put(`http://localhost:5000/api/notes/update/${editingNote._id}`, {
                title: updatedTitle,
                note: updatedNote,
            });

            setNotes(notes.map(n => (n._id === editingNote._id ? res.data : n)));
            closeModal();
        } catch (err) {
            console.error("Error updating note:", err);
        }
    };

    const closeModal = () => {
        setEditingNote(null);
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === "modalOverlay") {
            closeModal();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    useEffect(() => {
        if (editingNote) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [editingNote]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.note.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
           
            <div className="mb-4 flex space-x-2">
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-[#dfc634] text-white px-4 py-2 rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:cursor-pointer">
                    Search
                </button>
            </div>

            <h2 className="text-xl font-bold mb-4">Your Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredNotes.map(note => (
                    <div key={note._id} className="p-4 bg-white shadow-md rounded-md border min-h-56 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                        <p className="text-gray-700 text-sm flex-grow overflow-hidden">{note.note}</p>
                        <div className="mt-3 flex justify-between">
                            <button 
                                className="bg-yellow-50 text-black px-3 py-1 rounded text-sm hover:bg-[#dfc634] transition hover:scale-105 hover:cursor-pointer"
                                onClick={() => openEditModal(note)}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteNote(note._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition hover:cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingNote && (
                <div 
                    id="modalOverlay"
                    className="fixed inset-0 bg-opacity-50 flex items-center justify-center transition-opacity"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-[#dfc634] p-6 rounded-lg shadow-lg w-96 transform transition-all scale-95">
                        <h2 className="text-lg font-bold mb-4">Edit Note</h2>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-2"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <textarea
                            className="w-full p-2 border rounded mb-4"
                            rows="4"
                            value={updatedNote}
                            onChange={(e) => setUpdatedNote(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={updateNote}
                            >
                                Save
                            </button>
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayNotes;
