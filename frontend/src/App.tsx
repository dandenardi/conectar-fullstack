import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import UserListPage from "./pages/users/UserList/UserListPage";
import UserProfilePage from "./pages/users/UserProfile/UserProfilePage";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/profile/:id?" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
