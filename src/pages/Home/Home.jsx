import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersData } from "../../api/apiData";
import AddUser from "../../hooks/AddUser/AddUser";
import "./Home.css";

const Home = () => {
  const { usersData, loading } = getUsersData();
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleUserClicked = (user) => {
    navigate(`/user/${user.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1 className="header">Bank Admin Panel</h1>
      <section className="users-container">
        {usersData.map((user) => (
          <div
            key={user.id}
            user={user}
            className="user-div"
            onClick={() => handleUserClicked(user)}
          >
            <img src={user.image} alt={user.name} className="user-image" />
            <h1>Passport id: {user.passport_id}</h1>
            <h1>Name: {user.name}</h1>
            {/* <h1>Age: {user.age}</h1>
          <h1>Cash: $ {user.cash}</h1>
          <h1>Credit: $ {user.credit}</h1> */}
          </div>
        ))}
      </section>
      <button className="add-user" onClick={() => setShowAddUserForm(true)}>
        Add User
      </button>

      {showAddUserForm && <AddUser onClose={() => setShowAddUserForm(false)} />}
    </div>
  );
};
export default Home;
