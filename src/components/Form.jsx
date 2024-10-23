import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  //Field validations
  const validate = () => {
    const newErrors = {};
    //Age should be longer than 1 character
    if (!formData.name || formData.name.length <= 1) {
      newErrors.name = "El nombre es muy corto";
    }
    //Age should be between 13 and 100, not null
    if (!formData.age || formData.age < 13 || formData.age > 100) {
      newErrors.age = "Edad invalida o no cumple con lo minimo requerido";
    }
    //regex test for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Correo invalido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        //Local server address for posting users
        await axios.post("http://localhost:3000/api/users", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFormData({ name: "", age: "", email: "" });

        // Show toast message
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
      } catch (error) {
        console.error("Algo ha ido mal...", error);
      }
    }
  };

  //Change title
  useEffect(() => {
    document.title = "Ingresa tus datos";
  }, []);

  
  //Errors should be displayed below the fields


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <form
          className="bg-white shadow-md rounded-lg p-8 w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Ingresa tus datos
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300`}
              required
              placeholder="Ingresa tu nombre"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300`}
              required
              placeholder="Ingresa tu edad"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300`}
              required
              placeholder="Ingresa tu email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200"
          >
            Enviar
          </button>
        </form>

        <Link to={"/users"}>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-950 transition duration-200"
            >
              Usuarios
            </button>
          </div>
        </Link>

        {toastVisible && (
          <div className="fixed top-4 right-4 bg-green-600 text-white p-3 rounded-md shadow-lg">
            Formulario enviado con exito
          </div>
        )}
      </div>
    </div>
  );
};


export default Form;
