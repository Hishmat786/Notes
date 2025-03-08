import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import home from "../assets/home.png"

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />

            <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-6 bg-gray-100 pt-16">

                <div className="md:w-4/5 text-center md:text-left">
                    <h1 className="text-6xl font-bold" style={{ color: "#dfc634" }}>Notes</h1>
                    <p className="mt-4 tex-4xl text-gray-600" >
                        The best place to manage your notes efficiently in real time.
                    </p>
                    <div className="mt-12 flex justify-center md:justify-start gap-4">        
                        <button
                            className="px-6 py-2 rounded-lg text-white text-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                            style={{ backgroundColor: "#dfc634" }}
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>     
                        <button className="px-6 py-2 bg-white text-gray-800 text-xl border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                            Login
                        </button>
                    </div>

                </div>

                <div className="md:w-4/5 flex justify-center">
                    <img
                        src={home}
                        alt="Noted App Preview"
                        className="w-full max-w-sm rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
