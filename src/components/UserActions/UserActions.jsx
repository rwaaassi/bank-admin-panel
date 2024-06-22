import { useState } from "react";
import { useWithdrawCash, useTransferCash } from "../../api/apiData"; // Adjust path as necessary

export const handleWithdrawCash = (setPrompt, user, setUser) => {
  const withdrawCash = useWithdrawCash();
  setPrompt({
    message: "Enter amount to withdraw:",
    onConfirm: async (amount) => {
      try {
        await withdrawCash(user.id, Number(amount), user.cash);
        setUser((prev) => ({ ...prev, cash: prev.cash - Number(amount) }));
      } catch (error) {
        alert(error.message);
      } finally {
        setPrompt(null);
      }
    },
    onCancel: () => setPrompt(null),
  });
};

export const handleTransferCash = (setPrompt, usersData, user, setUser) => {
  const transferCash = useTransferCash();
  setPrompt({
    message: "Enter the ID of the user to transfer cash to:",
    onConfirm: async (toUserId) => {
      const amountPrompt = {
        message: "Enter amount to transfer:",
        onConfirm: async (amount) => {
          const toUser = usersData.find((u) => u.id === toUserId);
          if (!toUser) {
            alert("User not found.");
            setPrompt(null);
            return;
          }
          try {
            await transferCash(
              user.id,
              toUserId,
              Number(amount),
              user.cash,
              toUser.cash
            );
            setUser((prev) => ({
              ...prev,
              cash: prev.cash - Number(amount),
            }));
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
