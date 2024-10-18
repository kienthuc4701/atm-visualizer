import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useATM } from "@/hooks/useATM";
import { ATMStateType } from "@/types";

export const CardSlot = () => {
  const { state, setState, setAccount } = useATM();
  const [cardNumber, setCardNumber] = useState("");

  const handleInsertCard = async () => {
    const account = await api.getAccount(cardNumber);
    if (account) {
      setState(ATMStateType.PIN_HANDLING);
      setAccount(account)
    }
    setCardNumber("");
  };
  
  return (
    <div className="mb-4">
      <Input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Enter card number"
        className="mb-2"
      />
      <Button onClick={handleInsertCard} className="w-full">
        Insert Card
      </Button>
    </div>
  );
};
