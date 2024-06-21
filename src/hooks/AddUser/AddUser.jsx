import { useState } from "react";
import { useAddUser } from "../../api/apiData";
import "./AddUser.css";

const AddUser = ({ onClose }) => {
  const addUser = useAddUser();
  const [newUser, setNewUser] = useState({
    image: "",
    passport_id: "",
    name: "",
    age: "",
    cash: "",
    credit: "",
  });

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <input
        type="text"
        placeholder="Image"
        value={newUser.image}
        onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
      />
      <input
        type="text"
        placeholder="Passport ID"
        value={newUser.passport_id}
        onChange={(e) =>
          setNewUser({ ...newUser, passport_id: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newUser.age}
        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cash"
        value={newUser.cash}
        onChange={(e) => setNewUser({ ...newUser, cash: e.target.value })}
      />
      <input
        type="number"
        placeholder="Credit"
        value={newUser.credit}
        onChange={(e) => setNewUser({ ...newUser, credit: e.target.value })}
      />
      <div className="add-btns">
        <button onClick={handleAddUser}>Add User</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddUser;
