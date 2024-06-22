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

// update user's details
export const useUpdateUser = () => {
  const updateUser = async (userId, updatedData) => {
    try {
      await axios.put(`${API_URL}/${userId}`, updatedData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return updateUser;
};

// delete user
export const useDeleteUser = () => {
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };
return deleteUser
};

// filter Users 
export const useFilterUsers = () => {
  const filterUsers = async (criteria) => {
    try {
      const response = await axios.get(`${API_URL}/users?${criteria}`);
      return response.data;
    } catch (error) {
      console.error('Failed to filter users:', error);
      throw new Error('Failed to filter users.');
    }
  };
  return filterUsers;
};

// transfer Cash 
export const transferCash = async (fromUserId, toUserId, amount) => {
  try {
    await axios.put(`${API_URL}/users/${fromUserId}/transfer`, { toUserId, amount });
  } catch (error) {
    console.error('Failed to transfer cash:', error);
    throw new Error('Failed to transfer cash.');
  }
};

// withdraw cash
export const withdrawCash = async (userId, amount) => {
   try {
     await axios.put(`${API_URL}/${userId}`, { amount });
   } catch (error) {
     console.error("Failed to withdraw cash:", error);
     throw new Error("Failed to withdraw cash.");
   }
 };
