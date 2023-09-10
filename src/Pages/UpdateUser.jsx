import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import StateContext from '../Context/StateContext';

const UpdateUser = () => {

  const navigate = useNavigate();
  
  const { userData } = useContext(StateContext);
  const { email } = useParams();

  const [userDetail, setUserDetail] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: ''
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const foundUser = userData.find(user => user.email === email);

    if (foundUser) {
      console.log(foundUser);
      setUserDetail(foundUser);
      setFormData({
        name: foundUser.name,
        email: foundUser.email,
        dateOfBirth: foundUser.dateOfBirth,
        gender: foundUser.gender,
        mobileNumber: foundUser.mobileNumber
      });
    }
  }, [email, userData]);

  const canSubmit = useCallback(() => {
    const { name, email, dateOfBirth, gender, mobileNumber } = formData;
    return name && email && dateOfBirth && gender && mobileNumber;
  }, [formData]);

  useEffect(() => {
    setIsSubmitDisabled(!canSubmit());
  }, [formData, canSubmit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('http://localhost:8081/v1/users/updateUser', formData);
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error during update:', error);
    }
  };


  return (
    <>
    {
      userDetail ? (
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
          value={formData.name}
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
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input
          className="form-control"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          placeholder="Enter your dateOfBirth"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select 
          className="form-control" 
          name="gender" 
          value={formData.gender}
          onChange={handleChange}>
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
          name="mobileNumber"
          type="number"
          value={formData.mobileNumber}
          placeholder="Enter your number"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary btn-block" disabled={isSubmitDisabled}>
        Update Information
      </button>
      <button 
        onClick={() => navigate(-1)}
      >Cancel</button>
    </form>
  </div>
</React.Fragment>
      ) : (
        <div className="container">
          <h1 className="title">User not found</h1>
          <div className="button-group">
            <button className="db" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      )
    }
  
</>
  );
};

export default UpdateUser;
