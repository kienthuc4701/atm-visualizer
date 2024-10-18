import { motion, AnimatePresence } from "framer-motion";
import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { CardSlot } from "./CardSlot";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ATMStateType } from "@/types";
import { PinInput } from "./PinInput";
import { useATM } from "@/hooks/useATM";

export default function ATM() {
  const { state, setState } = useATM();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 relative">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              // key={currentState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Display />
              {state == ATMStateType.PIN_HANDLING && <PinInput />}
              {state == ATMStateType.IDLE && <CardSlot />}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
