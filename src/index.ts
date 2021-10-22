import { config } from 'dotenv';
config();
import app from './server';
const { PORT = 3200 } = process.env;

app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Express running in port', PORT);
});
