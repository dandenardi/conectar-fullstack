import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios.config";

function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(
        "Um erro desconhecido aconteceu. Por gentileza, tente novamente mais tarde."
      );
    }
  }

  return (
    <form onSubmit={handleRegister} className="form-container">
      <h2>Cadastre-se</h2>
      <div className="input-container">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
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
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default RegisterForm;
