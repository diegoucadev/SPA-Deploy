import PropTypes from "prop-types";
import React from "react";

const Card = ({ user }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-full mb-4">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-gray-700">Edad: {user.age}</p>
      <p className="text-gray-700">Email: {user.email}</p>
    </div>
  );
};

//Prop validations
Card.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  };

export default Card;
