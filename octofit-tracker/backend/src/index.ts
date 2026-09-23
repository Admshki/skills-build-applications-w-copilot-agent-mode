import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const baseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be processed' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exitCode = 1;
  });
