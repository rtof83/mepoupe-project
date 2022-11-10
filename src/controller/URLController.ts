import { Request, Response } from 'express';
import axios from 'axios';

export class URLController {

	// endpoint media
	public async avg(req: Request, response: Response) {
		try {
			// if (!req.params) console.log('nao tem params');

			// console.log('req');

			if (!parseFloat(req.params.num1) || !parseFloat(req.params.num2))
				return response.status(401).json({ erro: 'Parâmetro inválido!' });

			const round = Math.round((parseFloat(req.params.num1) + parseFloat(req.params.num2)) / 2).toFixed(2);
			return response.status(201).json({ media: round })
		} catch {
			return response.status(400).json({ erro: 'URL não encontrada' })
		};
	};

	// endpoint cep
	public async cep(req: Request, response: Response): Promise<void> {
		try {
			await axios.get(`https://viacep.com.br/ws/${req.params.cep}/json/`)
				.then(({ data }) => {
					if (!data.bairro)
						response.status(401).json({ erro: 'Não foi possível encontrar o Bairro deste CEP!' });
					else
						response.status(201).json(data);
				})
				.catch(error => {
					console.log(error);
					response.status(401).json({ erro: 'cep inválido' });
				});
		} catch {
			response.status(400).json({ error: 'URL not found' })
		};
	};

};
