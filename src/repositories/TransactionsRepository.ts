import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((increasedIncome, transaction) => {
      if (transaction.type === 'income') {
        return increasedIncome + transaction.value;
      }
      return increasedIncome + 0;
    }, 0);

    const outcome = this.transactions.reduce(
      (increasedOutcome, transaction) => {
        if (transaction.type === 'outcome') {
          return increasedOutcome + transaction.value;
        }
        return increasedOutcome + 0;
      },
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
