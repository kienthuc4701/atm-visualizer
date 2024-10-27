import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { withdraw } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Withdraw: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  const handleWithdraw = async () => {
    if (token) {
      try {
        const response = await withdraw(parseFloat(amount));
        setMessage(
          `Successfully withdrew $${amount}. New balance: $${response.newBalance}`
        );
        setAmount("");
      } catch (error) {
        console.error("Withdrawal failed:", error);
        setMessage("Withdrawal failed. Please try again.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Withdraw</h2>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="mb-4"
      />
      <Button onClick={handleWithdraw} className="w-full">
        Withdraw
      </Button>
      {message && <p className="mt-4">{message}</p>}
    </motion.div>
  );
};

export default Withdraw;
