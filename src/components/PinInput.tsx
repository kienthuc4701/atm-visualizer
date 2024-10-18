import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useATM } from "@/hooks/useATM";

export const PinInput = () => {
  const [pin, setPin] = useState("");
  const { account } = useATM();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.validatePin(account?.cardNumber!, pin);
    setPin("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={pin}
        onChange={handleChange}
        placeholder="Enter 4-digit PIN"
        className="text-center"
      />
      <Button type="submit" className="w-full" disabled={pin.length !== 4}>
        Submit
      </Button>
    </form>
  );
};
