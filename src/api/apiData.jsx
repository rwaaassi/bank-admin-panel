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

// Withdraw cash hook
export const useWithdrawCash = () => {
  const withdrawCash = async (userId, amount, userCash, userCredit) => {
    if (amount > userCash + userCredit) {
      throw new Error("Insufficient funds.");
    }
    try {
      if (amount <= userCash) {
        await axios.put(`${API_URL}/${userId}`, { cash: userCash - amount });
      } else {
        const remainingAmount = amount - userCash;
        await axios.put(`${API_URL}/${userId}`, {
          cash: 0,
          credit: userCredit - remainingAmount,
        });
      }
    } catch (error) {
      console.error("Failed to withdraw cash:", error);
      throw new Error("Failed to withdraw cash.");
    }
  };
  return withdrawCash;
};

// Transfer cash hook
export const useTransferCash = () => {
  const transferCash = async (
    fromUserId,
    toUserId,
    amount,
    fromUserCash,
    fromUserCredit,
    toUserCash
  ) => {
    if (amount > fromUserCash + fromUserCredit) {
      throw new Error("Insufficient funds.");
    }
    try {
      if (amount <= fromUserCash) {
        await axios.put(`${API_URL}/${fromUserId}`, {
          cash: fromUserCash - amount,
        });
        await axios.put(`${API_URL}/${toUserId}`, {
          cash: toUserCash + amount,
        });
      } else {
        const remainingAmount = amount - fromUserCash;
        await axios.put(`${API_URL}/${fromUserId}`, {
          cash: 0,
          credit: fromUserCredit - remainingAmount,
        });
        await axios.put(`${API_URL}/${toUserId}`, {
          cash: toUserCash + amount,
        });
      }
    } catch (error) {
      console.error("Failed to transfer cash:", error);
      throw new Error("Failed to transfer cash.");
    }
  };
  return transferCash;
};
