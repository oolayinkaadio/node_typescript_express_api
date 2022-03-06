import * as dotenv from 'dotenv';
import * as express from 'express';
import { Express, Request, Response } from 'express';
import { transactionRoutes } from './transactionHandlers';
dotenv.config()

const app: Express = express();
const PORT: number = 4000 || Number(process?.env.PORT);

app.use(express.json());

app.use('/api', transactionRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: "API working perfectly" })
});

app.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});
