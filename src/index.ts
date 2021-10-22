import { config } from 'dotenv';
config();
import app from './server';

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express running in port', 3000);
});
