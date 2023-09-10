import React from "react";
import StateContext from "../Context/StateContext";
import { useNavigate } from "react-router-dom";

const InputDelete = () => {
  const navigate = useNavigate();

  const { setToDelete, toDelete } = React.useContext(StateContext);

  const handleChange = (e) => {
    console.log(e.target.value);
    setToDelete(e.target.value);
  };

  return (
    <div>
      <div className="">
        <div className="container">
          <div className="inputdelete">
            <p>Enter the email of the user you want to delete:</p>
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
                console.log(toDelete);
                navigate(`/delete/${toDelete}`);
              }}
            >
              Delete
            </button>
            <button className="dbb" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDelete;
