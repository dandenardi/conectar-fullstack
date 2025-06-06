import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import api from "../../../utils/axios.config";

function UserProfilePage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchUserProfile() {
      try {
        let endpoint = "/profile";
        console.log("Auth user", authUser);
        if (authUser?.role === "admin" && id) {
          endpoint = `/users/${id}`;
        } else if (!id) {
          endpoint = `/users/${authUser?.sub}`;
        }
        console.log("ENDPOINT ", endpoint);
        const response = await api.get(endpoint);
        if (response.status === 200) {
          const data = response.data;
          setUser(data);
        } else {
          setError("Erro ao buscar usuário");
        }
      } catch (error) {
        setError("Um error ocorreu ao buscar as informações do usuário");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [authUser, loading]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { id } = useParams();

      let endpoint = "/profile";

      if (authUser?.role === "admin" && id) {
        endpoint = `/users/${id}`;
      }
      await api.put(endpoint, user);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      setError(
        "Um erro ocorreu enquanto as informações do usuário eram atualizadas."
      );
    }
  }

  if (!user || loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Usuário {user.name}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSave}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input type="email" value={user.email} disabled />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="user">Usuário</option>
        </select>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default UserProfilePage;
