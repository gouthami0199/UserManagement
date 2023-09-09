import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialData = [
  
  {
    name: 'John Doe',
    email: 'johndoe@email.com',
    dateofbirth: '20-08-1987',
    gender: 'male',
    phone: '8753948579',
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@email.com',
    dateofbirth: '15-04-1990',
    gender: 'female',
    phone: '7894561230',
  },
];

const FetchAllUsers = () => {
  const [userData, setUserData] = useState(initialData); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/v1/users/fetchAllUsers')
      .then(response => {
        setUserData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const DeleteUser = async (email) => {
    try {
      
      await axios.delete(`http://localhost:8081/v1/users/${email}`);

      setUserData((prevUserData) =>
        prevUserData.filter((user) => user.email !== email)
      );
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <div className="signup">
      <div className="container">
        <h1 className="title">All Users</h1>
        <div className="search__component">
          {/* Search: */}
          <input
            type="text"
            className="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
          />
          {/* <button style={{ width: 'fitContent'}}>Search</button> */}
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(({ phone, name, email, dateofbirth, gender }) => (
              <tr key={email}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{gender}</td>
                <td>{phone}</td>
                <td>{dateofbirth}</td>
                <td>
                  <button onClick={()=>{
                    // UpdateUser(id);
                  }}>Update</button>
                </td>
                <td>
                <button onClick={() => DeleteUser(email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchAllUsers;
