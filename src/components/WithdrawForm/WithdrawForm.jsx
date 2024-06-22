import { useState } from "react";
import { withdrawCash } from "../../api/apiData";
import "./WithdrawForm.css"

const WithdrawForm = ({ user, updateUser }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (Number(amount) > user.cash + user.credit) {
      setError("Insufficient funds.");
      return;
    }

    try {
      await withdrawCash(user.id, Number(amount));
      await updateUser(user.id, { cash: user.cash - Number(amount) });

      setAmount("");
      setError(null);
    } catch (error) {
      console.error("Error withdrawing cash:", error);
      setError("Failed to withdraw cash.");
    }
  };

  
 

  return (
    <form onSubmit={handleWithdraw} className="transfer-withdraw-form">
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button type="submit">Withdraw</button>
    </form>
  );
};

export default WithdrawForm;
