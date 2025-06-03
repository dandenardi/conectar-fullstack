import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

function UserListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Falha ao buscar usuários.");
        }
      } catch (error) {
        setError("Um erro ocorreu ao tentar buscar usuários...");
      }
    }

    fetchUsers();
  }, []);

  function handleEdit(id: number) {
    navigate(`/edit-user/${id}`);
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este usuário?"
    );
    if (confirmDelete) {
      if (confirmDelete) {
        try {
          const response = await fetch(`/api/users/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setUsers(users.filter((user) => user.id !== id));
          } else {
            setError("Falha ao remover este usuário.");
          }
        } catch (error) {
          setError("Um erro ocorreu ao tentar excluir o usuário.");
        }
      }
    }
  }

  return (
    <div>
      <h2>Lista de usuários</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserListPage;
