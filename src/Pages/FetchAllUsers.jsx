import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../Context/StateContext';


const FetchAllUsers = () => {
  const { initialData,userData,setUserData } = React.useContext(StateContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userData.filter(user => {
    return Object.values(user).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
 
      <div className="fetch__container">
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
          <div>
            <Link to="/">
              <button className="navs">Home</button>
            </Link>
          

          </div>
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
              <th
              
              >
                Update
                </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ id,mobileNumber, name, email, dateOfBirth, gender }) => (
              <tr key={email}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{gender}</td>
                <td>{mobileNumber}</td>
                <td>{dateOfBirth}</td>
                <td>
                <Link to={`/update/${email}`}>
                  <button >Update</button></Link>
                </td>
                <td>
                <button 
             
                >
                  <Link
                
                to={`/delete/${email}`}
      >
      
                  Delete
                  </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default FetchAllUsers;
