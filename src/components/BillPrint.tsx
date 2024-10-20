import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getBillPrint } from '@/services/api';
import { Button } from '@/components/ui/button';

const BillPrint: React.FC = () => {
  const [bill, setBill] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBill = async () => {
      if (token) {
        try {
          const response = await getBillPrint();
          setBill(response.bill);
        } catch (error) {
          console.error('Failed to fetch bill:', error);
        }
      }
    };

    fetchBill();
  }, [token]);

  const handlePrint = () => {
    if (bill) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(`<pre>${bill}</pre>`);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Bill Print</h2>
      {bill ? (
        <>
          <pre className="bg-gray-100 p-4 rounded mb-4">{bill}</pre>
          <Button onClick={handlePrint} className="w-full">Print Bill</Button>
        </>
      ) : (
        <p>Loading bill...</p>
      )}
    </motion.div>
  );
};

export default BillPrint;