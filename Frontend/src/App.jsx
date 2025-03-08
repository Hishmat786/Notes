import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Componenets/Home'
import Register from './Componenets/Register';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  )
}

export default App
