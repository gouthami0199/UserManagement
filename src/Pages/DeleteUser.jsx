import React from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import StateContext from "../Context/StateContext";

const DeleteUser = () => {
  const { userData ,fetchUserData} = React.useContext(StateContext);
  const navigate= useNavigate();
  const [userFound, setUserFound] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState(null); 

  const history = useNavigate();
  const { email } = useParams();

  React.useEffect(() => {
    const foundUser = userData.find((user) => user.email === email);

    if (foundUser) {
      console.log(foundUser);
      setUserDetail(foundUser); 
      setUserFound(true);
    } else {
      console.log("user not found");
      setUserFound(false);
    }
  }, [email, userData]);

  const handleDelete = async () => {
    if (userDetail) { 
      try {
        const response = await axios.delete(
          `http://localhost:8081/v1/users/deleteUser/${userDetail.email}`
        );
        console.log("Delete successful:", response.data);
        fetchUserData();
        navigate("/users");

      } catch (error) {
        console.error("Error during delete:", error);
      }
    }
  };

  return (
    <div className="delete">
      {userFound ? (
        <div className="container">
          <h1 className="title">
            Are you sure you want to delete {userDetail ? userDetail.name : ""}?
          </h1>
          <div className="button-group">
            <button className="db" onClick={handleDelete}>
              Delete
            </button>
            <button className="db" onClick={() => history(-1)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="title">User not found</h1>
          <div className="button-group">
            <button className="db" onClick={() => history(-1)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
