import { Request, Response } from 'express'

export class URLController {
	public async avg(req: Request, response: Response): Promise<void> {
		const { num1, num2 } = req.body;

		// const num2 = req.params.num2;

		// console.log(req.params)
		const round = Math.round((num1 + num2) / 2).toFixed(2);

		try {
			response.status(201).json({ avg: round })
		} catch {
			response.status(400).json({ error: 'URL not found' })
		}
	}
}
