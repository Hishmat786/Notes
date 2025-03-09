import React, { useState } from "react";
import axios from "axios";

const NotesForm = ({ addNote, email }) => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !note) {
            setError("Title and Note are required!");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/notes/add", {
                email,
                title,
                note,
            });

            addNote(res.data);
            alert("Note added successfully!");
            setTitle("");
            setNote("");
        } catch (err) {
            setError("Failed to add note. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h2 className="text-lg font-bold mb-2">Add a Note</h2>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border mb-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your note..."
                    className="w-full p-2 border mb-2 rounded"
                    rows="6"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-[#dfc634] text-white text-xl py-2 rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Note"}
                </button>
            </form>
        </div>
    );
};

export default NotesForm;
