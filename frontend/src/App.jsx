import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sign from './pages/Sign';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sign' element={<Sign />} />
            </Routes>
        </Router>
    );
}

export default App;
