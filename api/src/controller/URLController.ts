import { Request, Response } from 'express';
import axios from 'axios';
import { v1 as uuid } from 'uuid';

require('dotenv').config();

import { createConnMedia, getConnMedia } from '../database/dbMedia';
createConnMedia();

import { createConnCEP, getConnCEP } from '../database/dbCEP';
createConnCEP();

export class URLController {

	// endpoint media
	public avg(req: Request, response: Response) {
		interface Result {
			media: string;
			log?: object;
		};

		try {
			const avg = (parseFloat(req.params.num1) + parseFloat(req.params.num2)) / 2;
			const round = Math.round((avg + Number.EPSILON) * 100) / 100;

			const result: Result = { media: round.toFixed(2) };

			if (req.query.log === '') {
				const log = { num1: req.params.num1,
						      num2: req.params.num2,
							  media_simples: avg
							};

				result.log = log;
			};

			// adding log to database
			const logMedia = { id: uuid(),
							   num1: req.params.num1,
							   num2: req.params.num2,
							   avg: result.media,
							   datetime: new Date()
						     };
			getConnMedia().get('logMedia')
			.push(logMedia)
			.write();
			
			response.status(200).json(result);
		} catch {
			response.status(404).json({ erro: 'URL não encontrada' });
		};
	};

	// endpoint cep
	public async cep(req: Request, response: Response): Promise<void> {
		try {
			await axios.get(process.env.viaCEP_URL + req.params.cep + process.env.viacep_format)
				.then(({ data }) => {
					if (data.cep && !data.bairro)
						response.status(404).json({ erro: 'Não foi possível encontrar o Bairro deste CEP!' });
					else if (data.erro)
						response.status(404).json({ erro: 'Não foi possível encontrar o endereço deste CEP!' });
					else {
						// adding log to database
						const logCEP = { id: uuid(),
										 cep: data.cep,
										 log: data.logradouro,
										 uf: data.uf,
										 datetime: new Date()
									   };

						getConnCEP().get('logCEP')
						.push(logCEP)
						.write();

						response.status(200).json(data);
					};
				})
				.catch(error => {
					response.status(401).json({ erro: error });
				});
		} catch {
			response.status(400).json({ error: 'URL não encontrada' });
		};
	};

	public getLog(req: Request, response: Response) {
		try {
			let query;
			if (req.params.route === 'media')
				query = getConnMedia().get('logMedia').value();
			else if (req.params.route === 'cep')
				query = getConnCEP().get('logCEP').value();

			if (query.length)
				response.status(200).json(query);
			else
				response.status(404).json({ message: 'record not found' });
		} catch(error) {
			response.status(400).json(error);
		};
	};

	public delLog(req: Request, response: Response) {
		try {
			if (req.params.route === 'media')
				getConnMedia().get('logMedia').remove().write();
			else if (req.params.route === 'cep')
				getConnCEP().get('logCEP').remove().write();
			else
				return response.status(404).json({ error: 'route not found' });

			response.status(200).json({ message: 'records deleted successfully!' });
		} catch(error) {
			response.status(400).json(error);
		};
	};

};
