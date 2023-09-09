import React from 'react';
import axios from 'axios';

const DeleteUser = ({ userId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/v1/users/${userId}`
      );

      console.log('Delete successful:', response.data);

      // You can also add logic to update the UI after successful deletion if needed.
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  return (
    <button
      className="btn btn-danger"
      onClick={handleDelete}
    >
      Delete User
    </button>
  );
};

export default DeleteUser;
