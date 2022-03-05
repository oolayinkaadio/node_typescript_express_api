export enum TransactionType {
  Expense = -1,
  Earning = +1
}

export interface Transaction {
  id: string;
  name: string;
  amount: Number; 
  type: TransactionType;
}