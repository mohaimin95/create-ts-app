import * as express from 'express';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import routes from './routes';

const { DB_CONNECTION_STRING } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(DB_CONNECTION_STRING, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit();
  } else {
    // eslint-disable-next-line no-console
    console.log('DB connected!!!');
  }
});

app.get('/', (req, res) => {
  res.send({ status: 'Running' });
});
app.use('/api', routes);

export default app;
