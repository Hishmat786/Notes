import React, { useState } from "react";
import DashboardNav from "./DashboardNav";
import NotesForm from "./NotesForm";
import DisplayNotes from "./DisplayNotes";
import { useLocation } from "react-router-dom";

function Dashboard() {
    const location = useLocation();
    const email = location.state?.email || "User";

    const [notes, setNotes] = useState([]);

    const addNote = (note) => {
        setNotes([...notes, note]);
    };

    return (
        <div className="h-screen flex flex-col">
            <DashboardNav />

            <div className="flex flex-grow mt-18">
                <div className="w-1/3 bg-gray-100 p-4 shadow-lg">
                    <NotesForm addNote={addNote} email={email} />
                </div>

                <div className="w-2/3 p-6">
                    <DisplayNotes email={email}  />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
