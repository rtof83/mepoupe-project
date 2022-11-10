import request from 'supertest';
import app from '../src/server';

describe('Test Average Endpoint', () => {
    it('should get avg route', async () => {
        const res = await request(app).get('/media/2/2');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('media');
    });
});

describe('Test Average Endpoint', () => {
    it('should return error type', async () => {
        const res = await request(app).get('/media/a/2');

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('erro');
    });
});

describe('Test CEP Endpoint', () => {
    it('should get cep route and return bairro', async () => {
        const res = await request(app).get('/cep/01310200');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('bairro');
    });
});

describe('Test CEP Endpoint', () => {
    it('should get cep route and do not exists bairro', async () => {
        const res = await request(app).get('/cep/18150000');

        expect(res.statusCode).toEqual(401);
        expect(res.body.bairro).toEqual(undefined);
    });
});
