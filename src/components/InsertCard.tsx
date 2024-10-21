import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isValidCardNumber } from "@/lib/utils";

const InsertCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidCardNumber(cardNumber)) {
      localStorage.setItem("cardNumber", cardNumber);
      navigate("/enter-pin");
    } else {
      setError("Invalid card number. Please try again.");
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
          <CardTitle className="text-2xl font-bold text-center">
            Insert Card
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="Enter 16-digit card number"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 19));
                  setError("");
                }}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full"
              disabled={cardNumber.length !== 19}
            >
              Insert Card
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InsertCard;
