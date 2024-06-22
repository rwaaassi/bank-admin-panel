import { useParams, useNavigate, Link } from "react-router-dom";
import { getUsersData, useUpdateUser, useDeleteUser } from "../../api/apiData";
import { useState, useEffect } from "react";
import EditTableField from "../../components/EditTableFields/EditTableFields";
import "./User.css";

const User = () => {
  const { userId } = useParams();
  const { usersData, loading } = getUsersData();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const navigate = useNavigate();
 
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(user.id);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

 

  return (
    <div>
      <div className="title">
        <h2 className="user-num">User: {user.id}</h2>

        <Link to={`/operations/${user.id}`}>
          <button className="operations-page-btn">For Other Operations</button>
        </Link>
        <button onClick={() => navigate(`/`)}>
          Go Back to Home Page
        </button>
      </div>
      <section key={user.id} className="user-container">
        <div className="user-img-id">
          <h3>Passport id: {user.passport_id}</h3>
          <img src={user.image} alt={user.name} className="user-image" />
          {/* <button>Change Picture</button> */}
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
          <button onClick={handleDelete}>Delete User</button>
        </div>
      </section>

     

    </div>
  );
};

export default User;
