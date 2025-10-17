import { app } from './app';
import dotenv from 'dotenv';
import connectDB from './db';
import { createDefaultAdmin } from './db/createDefulatAdmin';

dotenv.config();

const port = process.env.PORT || 3044;

connectDB()
  .then(async () => {
    await createDefaultAdmin();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Monogo DB connection failed', error);
  });
