import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const TransactionSelector: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleTransaction = (type: string) => {
    navigate(`/${type}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/insert-card');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Select Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => handleTransaction('check-balance')} className="w-full">
            Check Balance
          </Button>
          <Button onClick={() => handleTransaction('withdraw')} className="w-full">
            Withdraw
          </Button>
          <Button onClick={() => handleTransaction('deposit')} className="w-full">
            Deposit
          </Button>
          <Button onClick={() => handleTransaction('transfer')} className="w-full">
            Transfer
          </Button>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionSelector;