import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios.config";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.access_token);
        if (response.data.role === "admin") {
          navigate("/users");
        } else {
          navigate("/profile");
        }
      } else {
        setError("Credenciais inválidas");
      }
    } catch (error) {
      setError("Um erro desconhecido ocorreu.");
    }
  }

  return (
    <form onSubmit={handleLogin} className="form-container">
      <h2>Login</h2>
      <div className="input-container">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
        <div className="social-login">
          <button>Login with Google</button>
          <button>Login with Microsoft</button>
        </div>
        <div className="register-link">
          <p>
            Não tem uma conta? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
