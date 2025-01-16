import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatDashboard from "./ChatDashboard";
import UserChat from "./UserChat";
import AdminDashboard from "./AdminDashboard";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-chat" element={<UserChat />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/chat/:roomId" element={<ChatDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
