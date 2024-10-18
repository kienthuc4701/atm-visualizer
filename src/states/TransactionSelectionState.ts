import { ATMState } from "./ATMState";
import { IdleState } from "./IdleState";
import { WithdrawState } from "./WithdrawState";
import { DepositState } from "./DepositeState";
import { ATMOptions } from "@/types";

export class TransactionSelectionState extends ATMState {
  enter(): void {
    this.context.setDisplay(
      "Select transaction: 1. Withdraw 2. Deposit 3. Check Balance"
    );
  }

  async insertCard(): Promise<void> {
    this.context.setDisplay("Transaction in progress. Please wait.");
  }

  async enterPin(): Promise<void> {
    this.context.setDisplay(
      "PIN already entered. Please select a transaction."
    );
  }

  async selectTransaction(transactionType: string): Promise<void> {
    switch (transactionType) {
      case "withdraw":
        this.context.setState(new WithdrawState(this.context));
        break;
      case "deposit":
        this.context.setState(new DepositState(this.context));
        break;
      case "balance":
        const balance = await this.context.checkBalance();
        this.context.setDisplay(`Your current balance is: $${balance}`);
        setTimeout(() => {
          this.context.setState(new TransactionSelectionState(this.context));
        }, 3000);
        break;
      default:
        this.context.setDisplay("Invalid transaction type. Please try again.");
    }
  }

  exit(): void {
    this.context.setDisplay("Thank you for using our ATM.");
    this.context.setState(new IdleState(this.context));
  }

  getOptions(): ATMOptions {
    return {
      left: ["WITHDRAW", "DEPOSIT"],
      right: ["BALANCE", "BACK"],
    };
  }
}
