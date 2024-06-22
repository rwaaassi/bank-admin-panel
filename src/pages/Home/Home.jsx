import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersData } from "../../api/apiData";
import AddUser from "../../hooks/AddUser/AddUser";
import FilterUsers from "../../components/FilterUsers/FilterUsers";
import "./Home.css";

const Home = () => {
  const { usersData, loading } = getUsersData();
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  //  const [usersData, setUsersData] = useState(initialUsersData);

  const handleUserClicked = (user) => {
    navigate(`/user/${user.id}`);
  };

    // const handleSetFilteredUsers = (filteredUsers) => {
    //   setUsersData(filteredUsers);
    // };

    // const handleResetUsersData = () => {
    //   setUsersData(initialUsersData);
    // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1 className="header">Bank Admin Panel</h1>
      {/* <div className="filter-section">
        <h2>Filter Users</h2>
        <FilterUsers
          usersData={initialUsersData}
          setFilteredUsers={handleSetFilteredUsers}
        />
        <button onClick={handleResetUsersData}>Reset Filter</button>
      </div> */}
      <section className="users-container">
        {usersData.map((user) => (
          <div
            key={user.id}
            user={user}
            className="user-div"
            onClick={() => handleUserClicked(user)}
          >
            <img src={user.image} alt={user.name} className="user-image" />
            <h3>Passport id: {user.passport_id}</h3>
            <h3>Name: {user.name}</h3>
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
