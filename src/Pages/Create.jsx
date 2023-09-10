import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Create = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitDisabled(!canSubmit());
  }, [formData]);

  const canSubmit = () => {
    const { name, email, dob, gender, phone } = formData;
    // TODO: Add valid email format and other validations as needed
    return (
      name.length > 0 &&
      email.length > 0 &&
      dob.length > 0 &&
      gender.length > 0 &&
      phone.length > 0
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sanitizedFormData = {
    ...formData,
    email: formData.email.toLowerCase(),
};


  const handleSubmit = async (event) => {
    event.preventDefault();



    var content = JSON.stringify(sanitizedFormData);
    console.log(formData);

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
        navigate("/");
       
        toast.success('User is successfully created', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

       
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8081/v1/users/createUser",
  //       formData
  //     );
    
  //     console.log("Signup successful:", response.data);
  //   } catch (error) {

  //     console.error("Error during signup:", error);
  //   }
  // };

  return (
    <div>
      <div className="container">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              className="form-control"
              name="dob"
              type="date"
              placeholder="Enter your DOB"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              className="form-control"
              name="phone"
              type="number"
              placeholder="Enter your number"
              onChange={handleChange}
            />
          </div>
          <div className="ds"> 
          <button
            className="dbb"
            disabled={isSubmitDisabled}
          >
            Sign up
          </button>
          <button className="dbb"
          onClick={()=>{
            navigate("/");
          }}
          >
            Back
          </button>
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
