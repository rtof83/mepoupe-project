import { Request, Response, NextFunction } from 'express';

const checkCEP = (req: Request, response: Response, next: NextFunction) => {
    if (!parseInt(req.params.cep) || req.params.cep.length !== 8)
        return response.status(401).json({ erro: 'Parâmetro inválido!' });
  
    next();
};
  
export default checkCEP;
