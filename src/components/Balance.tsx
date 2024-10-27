import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Balance: React.FC = () => {
  const location = useLocation();
  const { balance } = location.state;

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <motion.div
        className="p-6 bg-card rounded-lg shadow-md w-1/3 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-primary">Your Balance</h2>
        {balance !== null ? (
          <p className="text-2xl font-semibold text-foreground">${balance.toFixed(2)}</p>
        ) : (
          <p className="text-lg text-muted">Loading balance...</p>
        )}
      </motion.div>
    </div>
  );
};

export default Balance;
