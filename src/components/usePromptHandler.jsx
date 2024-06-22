import { useState } from "react";

export const usePromptHandler = () => {
  const [prompt, setPrompt] = useState(null);

  const handleWithdrawCashPrompt = (withdrawCash, user, setUser) => {
    setPrompt({
      message: "Enter amount to withdraw:",
      onConfirm: async (amount) => {
        amount = Number(amount);
        try {
          if (amount > user.cash + user.credit) {
            throw new Error("Insufficient funds.");
          } else if (user.cash === 0 && user.credit === 0) {
            throw new Error("Cannot withdraw, both cash and credit are empty.");
          } else {
            await withdrawCash(user.id, amount, user.cash, user.credit);
            setUser((prev) => ({
              ...prev,
              cash: Math.max(0, prev.cash - amount),
              credit:
                amount > prev.cash
                  ? prev.credit - (amount - prev.cash)
                  : prev.credit,
            }));
          }
        } catch (error) {
          alert(error.message);
        } finally {
          setPrompt(null);
        }
      },
      onCancel: () => setPrompt(null),
    });
  };

  const handleTransferCashPrompt = (usersData, transferCash, user, setUser) => {
    setPrompt({
      message: "Enter the ID of the user to transfer cash to:",
      onConfirm: async (toUserId) => {
        const toUser = usersData.find((u) => u.id === toUserId);
        if (!toUser) {
          alert("User not found.");
          setPrompt(null);
          return;
        }
        const amountPrompt = {
          message: "Enter amount to transfer:",
          onConfirm: async (amount) => {
            amount = Number(amount);
            try {
              if (amount > user.cash + user.credit) {
                throw new Error("Insufficient funds.");
              } else if (user.cash === 0 && user.credit === 0) {
                throw new Error(
                  "Cannot transfer, both cash and credit are empty."
                );
              } else {
                await transferCash(
                  user.id,
                  toUserId,
                  amount,
                  user.cash,
                  user.credit,
                  toUser.cash
                );
                setUser((prev) => ({
                  ...prev,
                  cash: Math.max(0, prev.cash - amount),
                  credit:
                    amount > prev.cash
                      ? prev.credit - (amount - prev.cash)
                      : prev.credit,
                }));
              }
            } catch (error) {
              alert(error.message);
            } finally {
              setPrompt(null);
            }
          },
          onCancel: () => setPrompt(null),
        };
        setPrompt(amountPrompt);
      },
      onCancel: () => setPrompt(null),
    });
  };

  return {
    prompt,
    setPrompt,
    handleWithdrawCashPrompt,
    handleTransferCashPrompt,
  };
};
