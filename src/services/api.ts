import axios from "axios";

export interface Account {
  id: string;
  cardNumber: string;
  pin: string;
  balance: number;
}

export interface TransactionResult {
  success: boolean;
  message: string;
  balance?: number;
}

export const api = {
  getAccount: async (cardNumber: string): Promise<Account | null> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/accounts/${cardNumber}`
      );
      return response.data;
    } catch (error) {
      console.error("Error validating card:", error);
      return null;
    }
  },

  validatePin: async (cardNumber: string, pin: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/validate-pin`,
        { cardNumber, pin }
      );
      return response.data.valid;
    } catch (error) {
      console.error("Error validating PIN:", error);
      return false;
    }
  },

  getBalance: async (accountId: string): Promise<number> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/balance/${accountId}`
      );
      return response.data.balance;
    } catch (error) {
      console.error("Error getting balance:", error);
      return 0;
    }
  },

  withdraw: async (
    accountId: string,
    amount: number
  ): Promise<TransactionResult> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/withdraw`,
        { accountId, amount }
      );
      return response.data;
    } catch (error) {
      console.error("Error withdrawing:", error);
      return { success: false, message: "Withdrawal failed" };
    }
  },

  deposit: async (
    accountId: string,
    amount: number
  ): Promise<TransactionResult> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/deposit`, {
        accountId,
        amount,
      });
      return response.data;
    } catch (error) {
      console.error("Error depositing:", error);
      return { success: false, message: "Deposit failed" };
    }
  },
};
