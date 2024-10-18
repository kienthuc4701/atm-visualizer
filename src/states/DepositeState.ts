import { ATMState } from "./ATMState";
import { TransactionSelectionState } from "./TransactionSelectionState";
import { IdleState } from "./IdleState";
import { ATMOptions } from "@/types";

export class DepositState extends ATMState {
  enter(): void {
    this.context.setDisplay("Enter deposit amount:");
  }

  async insertCard(): Promise<void> {
    this.context.setDisplay("Transaction in progress. Please wait.");
  }

  async enterPin(): Promise<void> {
    this.context.setDisplay("Please enter deposit amount.");
  }

  async selectTransaction(_:any, amount?: number): Promise<void> {
    if (amount) {
      const success = await this.context.deposit(amount);
      if (success) {
        this.context.setDisplay(`Deposit successful. Amount: $${amount}`);
      } else {
        this.context.setDisplay("Deposit failed. Invalid amount.");
      }
      setTimeout(() => {
        this.context.setState(new TransactionSelectionState(this.context));
      }, 3000);
    } else {
      this.context.setDisplay("Invalid amount. Please try again.");
    }
  }

  exit(): void {
    this.context.setDisplay("Thank you for using our ATM.");
    this.context.setState(new IdleState(this.context));
  }

  getOptions(): ATMOptions {
    return {
      left: ["$20", "$50"],
      right: ["$100", "BACK"],
    };
  }
}
