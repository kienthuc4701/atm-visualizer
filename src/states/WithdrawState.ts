import { ATMState } from './ATMState';
import { TransactionSelectionState } from './TransactionSelectionState';
import { IdleState } from './IdleState';
import { ATMOptions } from '@/types';

export class WithdrawState extends ATMState {
  enter(): void {
    this.context.setDisplay('Enter withdrawal amount:');
  }

  async insertCard(): Promise<void> {
    this.context.setDisplay('Transaction in progress. Please wait.');
  }

  async enterPin(): Promise<void> {
    this.context.setDisplay('Please enter withdrawal amount.');
  }

  async selectTransaction(_:any, amount?: number): Promise<void> {
    if (amount) {
      const success = await this.context.withdraw(amount);
      if (success) {
        this.context.setDisplay(`Withdrawal successful. Amount: $${amount}`);
      } else {
        this.context.setDisplay('Withdrawal failed. Insufficient funds or invalid amount.');
      }
      setTimeout(() => {
        this.context.setState(new TransactionSelectionState(this.context));
      }, 3000);
    } else {
      this.context.setDisplay('Invalid amount. Please try again.');
    }
  }

  exit(): void {
    this.context.setDisplay('Thank you for using our ATM.');
    this.context.setState(new IdleState(this.context));
  }

  getOptions(): ATMOptions {
    return {
      left: ['$20', '$50'],
      right: ['$100', 'BACK'],
    };
  }
}