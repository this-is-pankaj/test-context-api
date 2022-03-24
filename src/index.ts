import express from 'express';
import './externalService';
import middlewares from './middlewares';
const sessionController = require('./session.controller');
const { generateReqId } = middlewares;
const app = express();
const port = 3000;

app.get('/api/sessions/:sessionId', generateReqId, sessionController);

app.listen(port, () => {
  console.info(`Service is listening at http://localhost:${port}`);
});
