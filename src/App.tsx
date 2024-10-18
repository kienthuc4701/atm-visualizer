import ATM from "./components/ATM";
import { ATMProvider } from "./hooks/useATM";

function App() {
  return (
    <ATMProvider>
      <ATM />
    </ATMProvider>
  );
}

export default App;
