import * as express from 'express';
import { Express, Request, Response } from 'express';
import { transactionRouter } from 'transactionHandlers';

const app: Express = express();
const PORT: number = 4000;

app.use(express.json());

app.use('/api', transactionRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: "API working perfectly" })
});

app.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});