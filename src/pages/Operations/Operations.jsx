import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUsersData,
  useWithdrawCash,
  useTransferCash,
  useDeleteUser,
} from "../../api/apiData";
import { usePromptHandler } from "../../components/usePromptHandler";
import "./Operations.css";

const Operations = () => {
  const { userId } = useParams();
  const { usersData, loading } = getUsersData();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();
  const {
    prompt,
    setPrompt,
    handleWithdrawCashPrompt,
    handleTransferCashPrompt,
  } = usePromptHandler();

  const withdrawCash = useWithdrawCash();
  const transferCash = useTransferCash();

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
      <h2 className="user">User: {user.id}</h2>

      <section className="operations-container">
        <div>
          <h3>Other Operations:</h3>
        </div>
        <div className="operation-btns">
          <button
            onClick={() =>
              handleWithdrawCashPrompt(withdrawCash, user, setUser)
            }
          >
            Withdraw
          </button>
          <button
            onClick={() =>
              handleTransferCashPrompt(usersData, transferCash, user, setUser)
            }
          >
            Transfer
          </button>
          <button onClick={handleDelete}>Delete User</button>
        </div>
      </section>

      {prompt && (
        <div className="custom-prompt">
          <p>{prompt.message}</p>
          <input
            type="text"
            onChange={(e) => setPrompt({ ...prompt, value: e.target.value })}
          />
          <button onClick={prompt.onConfirm}>Confirm</button>
          <button onClick={prompt.onCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Operations;
