import { ATMState } from './ATMState';
import { IdleState } from './IdleState';
import { ATMOptions } from '@/types';
import { TransactionSelectionState } from './TransactionSelectionState';

export class PinEntryState extends ATMState {
  private attempts: number = 0;

  enter(): void {
    this.context.setDisplay('Please enter your PIN');
  }

  async insertCard(): Promise<void> {
    this.context.setDisplay('Card already inserted. Please enter your PIN.');
  }

  async enterPin(pin: string): Promise<void> {
    const isValid = await this.context.validatePin(pin);
    if (isValid) {
      this.context.setState(new TransactionSelectionState(this.context));
    } else {
      this.attempts++;
      if (this.attempts >= 3) {
        this.context.setDisplay('Too many incorrect attempts. Your card has been blocked.');
        setTimeout(() => this.context.setState(new IdleState(this.context)), 3000);
      } else {
        this.context.setDisplay(`Invalid PIN. Please try again. ${3 - this.attempts} attempts remaining.`);
      }
    }
  }

  async selectTransaction(): Promise<void> {
    this.context.setDisplay('Please enter your PIN first.');
  }

  exit(): void {
    this.context.setDisplay('Thank you for using our ATM.');
    this.context.setState(new IdleState(this.context));
  }

  getOptions(): ATMOptions {
    return {
      left: ['BACK'],
      right: ['ENTER'],
    };
  }
}