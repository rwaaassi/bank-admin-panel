import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://66746b4375872d0e0a966201.mockapi.io/users";

export const getUsersData = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   fetching users
  const getUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return { usersData, loading };
};

// add user
export const useAddUser = () => {
  const navigate = useNavigate();

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(API_URL, newUser);
      navigate(`/user/${response.data.id}`);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return addUser;
};
