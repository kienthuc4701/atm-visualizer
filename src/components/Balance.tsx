import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getBalance } from '@/services/api';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      if (token) {
        try {
          const response = await getBalance();
          setBalance(response.balance);
        } catch (error) {
          console.error('Failed to fetch balance:', error);
        }
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
      {balance !== null ? (
        <p className="text-xl">${balance.toFixed(2)}</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </motion.div>
  );
};

export default Balance;