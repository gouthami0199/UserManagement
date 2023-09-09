import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/v1/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);

        // Display a success toast message
        toast.success('User is successfully created', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          dob: '',
          gender: '',
          phone: '',
        });
      } else {
        console.error('Error during signup:', response.statusText);
        // Display an error toast message
        toast.error('Error during signup', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Display an error toast message
      toast.error('Error during signup', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          {/* ... other form fields ... */}
          <button className="btn btn-success btn-block" disabled={isSubmitDisabled}>
            Sign up
          </button>
        </form>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Create;
