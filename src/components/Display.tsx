import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useATM } from "@/hooks/useATM";
import { ATMStateType } from "@/types";

export const Display = () => {
  const { state } = useATM();
  const message = useMemo(() => {
    switch (state) {
      case ATMStateType.IDLE:
        return "Welcome  to the ATM";
      case ATMStateType.PIN_HANDLING:
        return "Enter PIN";
      default:
        return "Error";
    }
  }, [state]);

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <p className="text-lg text-center">{message}</p>
      </CardContent>
    </Card>
  );
};
