import express from 'express';
import { URLController } from './controller/URLController';

const urlController = new URLController();

const app = express();
app.use(express.json());

// routes
app.get('/media/:num1/:num2', urlController.avg);
app.get('/cep/:cep', urlController.cep);

export default app;
