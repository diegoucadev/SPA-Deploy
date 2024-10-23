import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //Local server address for users
        const response = await axios.get("http://159.65.185.107:3000/api/users");
        setUsers(response.data);
      } catch (err) {
        setError("Error al cargar usuarios...");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //Change page title
  useEffect(() => {
    document.title = "Usuarios";
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de usuarios</h2>
      <div className="w-full">
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
      <Link to={"/"}>
        <button className="mt-4 bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200">
          Regresar al formulario
        </button>
      </Link>
    </div>
  );
};

export default UsersPage;
