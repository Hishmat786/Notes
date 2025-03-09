import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "User";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <nav className="fixed w-full p-4" style={{ backgroundColor: "#dfc634" }}>
            <div className="container mx-auto flex justify-between items-center gap-x-8">

                <div className="flex items-center space-x-2">
                    <div className="text-white font-serif text-3xl font-bold">Notes</div>
                </div>

                <div className="hidden md:flex space-x-8">
                    <h1>{email}</h1>
                    <button onClick={handleLogout} className="bg-white text-[#dfc634] font-bold rounded-xl px-4 py-2 transition-transform transform hover:scale-105 hover:shadow-xl hover:cursor-pointer">
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default DashboardNav;