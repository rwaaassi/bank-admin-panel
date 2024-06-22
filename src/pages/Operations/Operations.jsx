import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePromptHandler,  } from "../../components/usePromptHandler";
import { getUsersData } from "../../api/apiData";
import "./Operations.css";

const Operations = () => {
  const { userId } = useParams();
  const { usersData, loading } = getUsersData();
  const navigate = useNavigate();
  const { prompt, handleWithdrawCashPrompt, handleTransferCashPrompt } = usePromptHandler();

  const user = usersData.find((u) => u.id === userId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <section className="operations-container">
        <div className="head">
      <h1>Operations for User: {user.passport_id}</h1>
          <h3>Other Operations:</h3>
        </div>
        <div className="operation-btns">
          <button onClick={() => handleWithdrawCashPrompt(handleWithdrawCash, user, setUser)}>
            Withdraw
          </button>
          <button onClick={() => handleTransferCashPrompt(usersData, handleTransferCash, user, setUser)}>
            Transfer
          </button>
          <button onClick={() => navigate(`/user/${user.id}`)}>Go Back to User Page</button>
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
