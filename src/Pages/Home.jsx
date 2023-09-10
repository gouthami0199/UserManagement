import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
        <div className="components">
            <button 
              onClick={() => navigate("/create")}
            className="nav__buttons">Create</button>
            <button
              onClick={() => navigate("/users")}
            className="nav__buttons">All Users</button>
            <button
              onClick={() => navigate("/update/user")}
            className="nav__buttons">Update</button>
            <button
              onClick={() => navigate("/delete/user")}
            className="nav__buttons">Delete</button>

            </div>
    </div>
  )
}

export default Home