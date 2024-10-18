import { ATMContext, ATMOptions } from "@/types";

export abstract class ATMState {
  constructor(protected context: ATMContext) {}

  abstract enter(): void;
  abstract insertCard(cardNumber: string): Promise<void>;
  abstract enterPin(pin: string): Promise<void>;
  abstract selectTransaction(
    transactionType: string,
    amount?: number
  ): Promise<void>;
  abstract exit(): void;
  abstract getOptions(): ATMOptions;
}

class Test {
  public insertCard() {
    // to-do insert card
  }
  public validateCard() {
    //todo validate card
  }
  public enterPin() {
    //todo enterpin
  }
  public validatePin() {
    //todo validate pin
  }
  public selectTransaction() {
    //todo select transaction
  }

  public withdraw() {
    //todo withdraw
  }
  public deposit() {
    //todo deposit
  }
  public printBill() {
    //todo  print bill
  }
  public exit() {
    //todo exit
  }
}
