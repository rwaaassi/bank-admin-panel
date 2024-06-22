import { useParams } from "react-router-dom";
import { getUsersData } from "../../api/apiData";
import { useState } from "react";
import "./User.css";

const User = () => {
  const { userId } = useParams();
  const { usersData, loading } = getUsersData();

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = usersData.find((user) => user.id === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1 className="user-num">User: {user.id}</h1>

      <section key={user.id} className="user-container">
        <div className="user-img-id">
          <h1>Passport id: {user.passport_id}</h1>
          <img src={user.image} alt={user.name} className="user-image" />
          <button>Change Picture</button>
        </div>
        <div className="user-details">
          <div>
            <h1>Name: {user.name}</h1>
            <button>Edit Name</button>
          </div>
          <div>
            <h1>Age: {user.age}</h1>
            <button>Edit Age</button>
          </div>
          <div>
            <h1>Cash: $ {user.cash}</h1>
            <button>Deposit Cash</button>
          </div>
          <div>
            <h1>Credit: $ {user.credit}</h1>
            <button>Update Credit</button>
          </div>
        </div>
      </section>
      <section className="operations-container">
        <div>
          <h2>Other Operations:</h2>
        </div>
        <div className="operation-btns">
          <button>Withdraw</button>
          <button>Transfer</button>
          <button>Delete User</button>
        </div>
      </section>
    </div>
  );
};
export default User;
