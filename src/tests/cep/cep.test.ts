import request from 'supertest';
import app from '../../app/server';

describe('Test CEP Endpoint', () => {
    it('should get cep route and return bairro', async () => {
        const res = await request(app).get('/cep/01310200');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('bairro');
    });
});

describe('Test CEP Endpoint', () => {
    it('should get cep route and do not return bairro', async () => {
        const res = await request(app).get('/cep/18150000');

        expect(res.statusCode).toEqual(404);
        expect(res.body.bairro).toEqual(undefined);
    });
});

describe('Test CEP Endpoint', () => {
    it('address not found', async () => {
        const res = await request(app).get('/cep/11111111');

        expect(res.statusCode).toEqual(404);
        expect(res.body.erro).toEqual('Não foi possível encontrar o endereço deste CEP!');
    });
});
