import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import InsertCard from "./components/InsertCard";
import EnterPin from "./components/EnterPin";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";
import { PrivateRoute } from "./components/PrivateRoute";
import TransactionSelector from "./components/TransactionSelector";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/insert-card" replace />} />
          <Route path="/insert-card" element={<InsertCard />} />
          <Route path="/enter-pin" element={<EnterPin />} />
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/select-transaction"  element={<TransactionSelector />}/>
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/deposit" element={<Deposit />} />
          </Route>
           {/* Catch-all route for undefined paths */}
           <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
