import express from 'express';
import { URLController } from './controller/URLController';

const api = express();
api.use(express.json());

const port = 3001;

const urlController = new URLController();

api.get('/media/:num1/:num2', urlController.avg);
api.get('/cep/:cep', urlController.cep);

api.listen(port, () => console.log(`listening on port ${port}...`));
