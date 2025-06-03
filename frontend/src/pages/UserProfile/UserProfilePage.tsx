import React, { useEffect, useState } from "react";

function UserProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError("Falha ao buscar as informações do usuário.");
        }
      } catch (error) {
        setError("Um error ocorreu ao buscar as informações do usuário");
      }
    }

    fetchUserProfile();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
      } else {
        setError("Falha ao atualizar as informações deste usuário.");
      }
    } catch (error) {
      setError(
        "Um erro ocorreu enquanto as informações do usuário eram atualizadas."
      );
    }
  }

  if (!user) return <div>Loading...</div>;

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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default UserProfilePage;
