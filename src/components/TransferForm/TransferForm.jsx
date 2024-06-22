import { useState } from "react";
import { transferCash } from "../../api/apiData";
import "./TransferForm.css"

const TransferForm = ({ usersData, user, updateUser }) => {
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!toUserId || !amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid user ID and amount.");
      return;
    }

    const toUser = usersData.find((u) => u.passport_id === toUserId);
    if (!toUser) {
      setError("User not found.");
      return;
    }

    if (
      Number(amount) > user.cash + user.credit ||
      Number(amount) > toUser.cash + toUser.credit
    ) {
      setError("Insufficient funds.");
      return;
    }

    try {
      await transferCash(user.passport_id, toUserId, Number(amount));
      await updateUser(user.passport_id, { cash: user.cash - Number(amount) });
      await updateUser(toUserId, { cash: toUser.cash + Number(amount) });

      setToUserId("");
      setAmount("");
      setError(null);
    } catch (error) {
      console.error("Error transferring cash:", error);
      setError("Failed to transfer cash.");
    }
  };

  return (
    <form onSubmit={handleTransfer} className="transfer-withdraw-form">
      <div>
        <input
          type="text"
          placeholder="To User ID"
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;
