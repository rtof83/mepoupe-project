import request from 'supertest';
import app from '../../app/server';

describe('Test Average Endpoint', () => {
    it('should get avg route', async () => {
        const res = await request(app).get('/media/2/3');

        expect(res.statusCode).toEqual(200);
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

describe('Test Average Endpoint', () => {
    it('should return avg and log', async () => {
        const res = await request(app).get('/media/3/2?log');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('log');
    });
});
