import { ATMState } from './ATMState';
import { PinEntryState } from './PinEntryState';
import { ATMOptions } from '@/types';

export class IdleState extends ATMState {
  enter(): void {
    this.context.setDisplay('Welcome! Please insert your card.');
  }

  async insertCard(cardNumber: string): Promise<void> {
    const isValid = await this.context.validateCard(cardNumber);
    if (isValid) {
      this.context.setState(new PinEntryState(this.context));
    } else {
      this.context.setDisplay('Invalid card. Please try again.');
    }
  }

  async enterPin(): Promise<void> {
    this.context.setDisplay('Please insert a card first.');
  }

  async selectTransaction(): Promise<void> {
    this.context.setDisplay('Please insert a card first.');
  }

  exit(): void {
    this.context.setDisplay('Thank you for using our ATM.');
  }

  getOptions(): ATMOptions {
    return {
      left: ['English', 'Español'],
      right: ['Français', 'Deutsch'],
    };
  }
}