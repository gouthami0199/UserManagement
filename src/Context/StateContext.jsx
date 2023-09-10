import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const StateContext = createContext();
export default StateContext;

export const StateProvider = ({ children }) => {
  const initialData = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@email.com",
      dateofbirth: "20-08-1987",
      gender: "male",
      phone: "8753948579",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@email.com",
      dateofbirth: "15-04-1990",
      gender: "female",
      phone: "7894561230",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@email.com",
      dateofbirth: "10-12-1985",
      gender: "male",
      phone: "6549873210",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@email.com",
      dateofbirth: "25-06-1993",
      gender: "female",
      phone: "9876543210",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert@email.com",
      dateofbirth: "03-02-1982",
      gender: "male",
      phone: "1234567890",
    },
    {
      id: 6,
      name: "Sophia Brown",
      email: "sophia@email.com",
      dateofbirth: "18-09-1988",
      gender: "female",
      phone: "4567891230",
    },
    {
      id: 7,
      name: "William Lee",
      email: "william@email.com",
      dateofbirth: "12-07-1991",
      gender: "male",
      phone: "7890123456",
    },
    {
      id: 8,
      name: "Olivia Garcia",
      email: "olivia@email.com",
      dateofbirth: "29-11-1989",
      gender: "female",
      phone: "5678901234",
    },
    {
      id: 9,
      name: "David Martinez",
      email: "david@email.com",
      dateofbirth: "08-03-1980",
      gender: "male",
      phone: "3456789012",
    },
    {
      id: 10,
      name: "Ava Rodriguez",
      email: "ava@email.com",
      dateofbirth: "14-05-1995",
      gender: "female",
      phone: "6789012345",
    },
  ];

  const [userData, setUserData] = useState(initialData);

  const fetchUserData = () => {
    axios
      .get("http://localhost:8081/v1/users/fetchAllUsers")
      .then((response) => {
        if (response.data && response.data.dateOfBirth) {
          response.data.dateOfBirth = new Date(response.data.dateOfBirth);
        }
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8081/v1/users/fetchAllUsers")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUserData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  

  const [toDelete, setToDelete] = useState("");
  const [toUpdate, setToUpdate] = useState("");

  const contextData = {
    initialData,
    toDelete,
    setToDelete,
    toUpdate,
    setToUpdate,
    userData,
    setUserData,
    fetchUserData,
  };

  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};
