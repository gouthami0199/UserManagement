import React from "react";
import StateContext from "../Context/StateContext";
import { useNavigate } from "react-router-dom";

const InputUpdate = () => {

    const navigate = useNavigate();

    const { setToUpdate, toUpdate } = React.useContext(StateContext);
  
    const handleChange = (e) => {
      console.log(e.target.value);
      setToUpdate(e.target.value);
    };

    

  return (
    <div>
         <div>
      <div className="">
        <div className="container">
          <div className="inputdelete">
            <p>Enter the email of the user you want to update:</p>
            <input
              className="form-control"
              name="delete"
              type="text"
              placeholder="Enter email"
              onChange={handleChange}
            />

<div className="button-group">
<button
              className="dbb"
              onClick={() => {
                console.log(toUpdate);
                navigate(`/update/${toUpdate}`);
              }}
            >
              Update
            </button>
            <button className="dbb" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
           
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InputUpdate