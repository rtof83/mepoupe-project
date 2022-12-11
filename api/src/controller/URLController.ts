import { Request, Response } from 'express';
import axios from 'axios';

require('dotenv').config();

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
					else
						response.status(200).json(data);
				})
				.catch(error => {
					response.status(401).json({ erro: error });
				});
		} catch {
			response.status(400).json({ error: 'URL não encontrada' });
		};
	};

};
