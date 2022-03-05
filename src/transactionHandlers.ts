import * as express from "express";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { Transaction, TransactionType } from "./interfaces/transaction";

let transactions: Transaction[] = [];

const getAllTransactions = (req: Request, res: Response) => {
  res.json({'data': transactions});
}

const getOneTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  let targetTransaction = findOneOfID(id);
  if (!targetTransaction) {
    res.status(404).json({ message: 'Transaction not found' });
  } else {
    res.json({ transaction: targetTransaction });
  }
};


const createTransaction = (req: Request, res: Response) => {
  if (!req.body.name || !req.body.amount) {
    res.status(400).json({ message: 'The required fields are not provided' });
  } else {
    const amountPassedIn = req.body.amount;
    const new_transaction: Transaction = {
      id: v4(),
      name: req.body.name,
      amount: Math.abs(amountPassedIn),
      type: determineTransactionType(amountPassedIn)
    };

    transactions.push(new_transaction);

    res.status(201).json({
      message: 'Transaction successfully added',
      transaction: new_transaction
    });
  }
};

const deleteTransaction = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Transaction ID not provided' });
  }
  const { id } = req.params;
  const toBeDeleted = findOneOfID(id);
  if (!toBeDeleted) {
    res.status(404).json({ message: 'Transaction not found' });
  } else {
    transactions = transactions.filter(transaction => transaction.id !== id);
    res.json({ message: 'Transaction successfully deleted', transaction: toBeDeleted })
  }

};

const updateTransaction = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Transaction ID not provided' });
  }

  const { id } = req.params;

  if (!findOneOfID(id)) {
    res.status(404).json({ message: 'Transaction  not found' });
  } else {
    transactions = transactions.map(transaction => {
      if (transaction.id == id) {
        return {
          id,
          name: req.body.name ? req.body.name : transaction.name,
          amount: req.body.amount ? Math.abs(req.body.amount) : transaction.amount,
          type: req.body.amount ? determineTransactionType(req.body.amount) : transaction.type,
        };
      } else {
        return transaction;
      }
    });

    res.json({
      message: 'Transaction updated successfully',
      transaction: findOneOfID(id)
    })
  }
}

const determineTransactionType = (amount: number): TransactionType => {
return amount >= 0 ? TransactionType.Earning : TransactionType.Expense;
} 

const findOneOfID = (id: string): Transaction => {
  const toBeFound: Transaction = transactions.find(t => t.id === id);
  return toBeFound;
}

const transactionRouter = express.Router();



transactionRouter.post('/transactions', createTransaction);
transactionRouter.get('/transactions', getAllTransactions);
transactionRouter.get('/transaction/:id', getOneTransaction);
transactionRouter.put('/transactions/:id', updateTransaction);
transactionRouter.delete('/transactions/:id', deleteTransaction);


export { transactionRouter };

