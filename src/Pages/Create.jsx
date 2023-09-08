import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        gender: '', // Added gender field
        phone: ''
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

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

    useEffect(() => {
        setIsSubmitDisabled(!canSubmit());
    }, [formData]);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async event => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8081/v1/users/createUser', formData);
            // Handle the response, e.g., show a success message or redirect the user.
            console.log('Signup successful:', response.data);
        } catch (error) {
            // Handle errors, e.g., show an error message to the user.
            console.error('Error during signup:', error);
        }
    };

    return (
        <React.Fragment>
            <div className="signup">
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
                    <button className="btn btn-success btn-block" disabled={isSubmitDisabled}>Sign up</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Create;
