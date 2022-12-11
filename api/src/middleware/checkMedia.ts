import { Request, Response, NextFunction } from 'express';

const checkMedia = (req: Request, response: Response, next: NextFunction) => {
    if (!parseFloat(req.params.num1) || !parseFloat(req.params.num2))
        return response.status(401).json({ erro: 'Parâmetro inválido!' });

    next();
};
  
export default checkMedia;
