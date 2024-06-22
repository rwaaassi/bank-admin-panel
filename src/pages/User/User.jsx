import { useParams } from "react-router-dom";
import { getUsersData, useUpdateUser } from "../../api/apiData";
import { useState, useEffect } from "react";
import EditTableField from "../../components/EditTableFields/EditTableFields";
import "./User.css";

const User = () => {
  const { userId } = useParams();
  const { usersData, loading } = getUsersData();
  const updateUser = useUpdateUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundUser = usersData.find((u) => u.id === userId);
      setUser(foundUser);
    }
  }, [loading, usersData, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }
  const handleSave = async (field, value) => {
    await updateUser(user.id, { [field]: value });
    setUser((prev) => ({ ...prev, [field]: value }));
  };
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
          <EditTableField
            label="Name"
            value={user.name}
            onSave={(value) => handleSave("name", value)}
            buttonLabel="Edit Name"
          />
          <EditTableField
            label="Age"
            value={user.age}
            onSave={(value) => handleSave("age", value)}
            buttonLabel="Edit Age"
          />
          <EditTableField
            label="Cash"
            value={user.cash}
            onSave={(value) => handleSave("cash", value)}
            buttonLabel="Deposit Cash"
          />
          <EditTableField
            label="Credit"
            value={user.credit}
            onSave={(value) => handleSave("credit", value)}
            buttonLabel="Update Credit"
          />
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
