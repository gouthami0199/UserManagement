import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const canSubmit = useCallback(() => {
    const { name, email, dob, gender, phone } = formData;
    return (
      name.length > 0 &&
      email.length > 0 &&
      dob.length > 0 &&
      gender.length > 0 &&
      phone.length > 0
    );
  }, [formData]);

  useEffect(() => {
    setIsSubmitDisabled(!canSubmit());
  }, [formData, canSubmit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await axios.put(
        'http://localhost:8081/v1/users/updateUser',
        formData
      );

      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>Update User Information</h1>
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
            <select className="form-control" name="gender" onChange={handleChange}>
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
          <button className="btn btn-primary btn-block" disabled={isSubmitDisabled}>
            Update Information
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateUser;
