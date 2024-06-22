import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsersData, useUpdateUser } from "../../api/apiData";
import TransferForm from "../../components/TransferForm/TransferForm";
import WithdrawForm from "../../components/WithdrawForm/WithdrawForm";
import "./Operations.css";

const Operations = () => {
  const { userId } = useParams();
  const { usersData, loading } = getUsersData();
  const navigate = useNavigate();
  const updateUser = useUpdateUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundUser = usersData.find((u) => u.id === userId);
      setUser(foundUser);
    }
  }, [loading, usersData, userId]);

  const handleSave = async (field, value) => {
    await updateUser(user.id, { [field]: value });
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleGoBack = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <div>
      <section className="operations-container">
        <div className="head">
          <h1>Operations for User: {user.passport_id}</h1>
          <button onClick={handleGoBack}>Go Back to User Page</button>
        </div>
        <div className="operation-btns">
          <WithdrawForm user={user} setUser={setUser} />
          <TransferForm usersData={usersData} user={user} setUser={setUser} />
        </div>
      </section>
    </div>
  );
};

export default Operations;
