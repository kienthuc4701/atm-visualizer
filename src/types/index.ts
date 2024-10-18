import { ATMState } from "@/states/ATMState";

export enum ATMStateType {
  IDLE='IDLE',
  CARD_HANDLING='CARD_HANDLING',
  PIN_HANDLING = 'PIN_HANDLING',
  TRANSACTION_HANDLING = 'TRANSACTION_HANDLING',
  
  EXIT = 'EXIT'
}
export interface Account {
  id: string;
  cardNumber: string;
  pin: string;
  balance: number;
}

export interface ATMOptions {
  left: string[];
  right: string[];
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'withdraw' | 'deposit';
  amount: number;
  timestamp: Date;
}

export interface ATMContext {
  setDisplay: (message: string) => void;
  setState: (newState: ATMState) => void;
  validateCard: (cardNumber: string) => Promise<boolean>;
  validatePin: (pin: string) => Promise<boolean>;
  withdraw: (amount: number) => Promise<boolean>;
  deposit: (amount: number) => Promise<boolean>;
  checkBalance: () => Promise<number>;
}