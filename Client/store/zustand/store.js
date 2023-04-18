import { create } from "zustand";

export const useStore = create((set) => ({
  transactions: [
    {
      type: "income",
      amount: 2000,
      name: "wage",
      date: "18/04/2023",
      color: "#FE6244",
      legendFontColor: "#FE6244",
      legendFontSize: 15,
    },
    {
      type: "expense",
      amount: 200,
      name: "grocery",
      date: "18/04/2023",
      color: "#F5FE44",
      legendFontColor: "#FE6244",
      legendFontSize: 15,
    },
  ],
  addTransaction: (newTransaction) =>
    set((state) => ({ transactions: [newTransaction, ...state.transactions] })),
  setInitialState: (list) => set((state) => ({ transactions: [...list] })),
}));
