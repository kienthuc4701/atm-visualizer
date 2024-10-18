import { Account, ATMStateType } from "@/types"; // Import ATMStateType from the types file
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// Define the shape of the ATM context
type ATMContextType = {
  state: ATMStateType;
  setState: React.Dispatch<SetStateAction<ATMStateType>>;
  account: Account | null;
  setAccount: React.Dispatch<SetStateAction<Account | null>>;
};

// Create the context with an initial value of null
const ATMContext = createContext<ATMContextType | null>(null);

// ATMProvider component to wrap children with the context provider
export const ATMProvider = ({ children }: { children: ReactNode }) => {
  // Define state using useState hook with the initial state of ATMStateType.IDLE
  const [state, setState] = useState<ATMStateType>(ATMStateType.IDLE);
  const [account, setAccount] = useState<Account | null>(null);

  // Pass down the state and setState through context
  const value = { state, setState, account, setAccount };

  return <ATMContext.Provider value={value}>{children}</ATMContext.Provider>;
};

// Custom hook to use the ATM context
export const useATM = () => {
  const context = useContext(ATMContext);

  // Throw an error if the hook is used outside the ATMProvider
  if (!context) {
    throw new Error("useATM must be used within an ATMProvider");
  }
  return context;
};
