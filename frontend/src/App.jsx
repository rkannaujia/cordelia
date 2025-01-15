import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import 'rsuite/dist/rsuite.min.css';

function App() {
 

  return (
    <Router>
        <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
);
}

export default App
