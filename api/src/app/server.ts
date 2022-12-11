import express from 'express';
import cors from 'cors';
import { URLController } from '../controller/URLController';

// middlewares
import checkMedia from '../middleware/checkMedia';
import checkCEP from '../middleware/checkCEP';

const urlController = new URLController();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.get('/media/:num1/:num2', checkMedia, urlController.avg);
app.get('/logMedia', urlController.logMedia);

app.get('/cep/:cep', checkCEP, urlController.cep);
app.get('/logCEP', urlController.logCEP);

export default app;
