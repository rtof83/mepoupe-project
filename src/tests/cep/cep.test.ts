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

        expect(res.statusCode).toEqual(401);
        expect(res.body.bairro).toEqual(undefined);
    });
});
