import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balace {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balace;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balace {
    const income = this.transactions.reduce(
      (accumulator, transaction) =>
        transaction.type === 'income'
          ? accumulator + transaction.value
          : accumulator,
      0,
    );

    const outcome = this.transactions.reduce(
      (accumulator, transaction) =>
        transaction.type === 'outcome'
          ? accumulator + transaction.value
          : accumulator,
      0,
    );

    const total = income - outcome;
    this.balance = { income, outcome, total };
    return this.balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
