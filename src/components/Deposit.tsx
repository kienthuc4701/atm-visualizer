import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { deposit } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  const handleDeposit = async () => {
    if (token) {
      try {
        const response = await deposit( parseFloat(amount));
        setMessage(`Successfully deposited $${amount}. New balance: $${response.newBalance}`);
        setAmount('');
      } catch (error) {
        console.error('Deposit failed:', error);
        setMessage('Deposit failed. Please try again.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Deposit</h2>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="mb-4"
      />
      <Button onClick={handleDeposit} className="w-full">Deposit</Button>
      {message && <p className="mt-4">{message}</p>}
    </motion.div>
  );
};

export default Deposit;