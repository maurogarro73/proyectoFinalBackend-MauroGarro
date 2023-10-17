import chai from 'chai';
import supertest from 'supertest';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

const expect = chai.expect;
const requester = supertest('http://127.0.0.1:8080');

describe('Testing API REST Ecommerce', () => {
  describe('Testing Product Routes', () => {
    it('El metodo GET trae todos los productos de la base de datos', async () => {
      const response = await requester.get('/api/products');
      const { status, ok, body } = response;
      expect(status).to.equal(200);
      expect(ok).to.be.true;
      expect(body.payload.docs).to.be.an('array');
    });

    it('Obtengo un producto por su ID', async () => {
      const response = await requester.get('/api/products/647e76e3f2fe3f6509a309c3');
      const { status, ok, body } = response;
      expect(status).to.equal(200);
      expect(ok).to.be.true;
      expect(body.payload).to.be.an('object');
      expect(body.payload).to.have.property('_id', '647e76e3f2fe3f6509a309c3');
    });

    it('Creo un producto por método POST', async () => {
      const product = {
        title: faker.commerce.productName(),
        description: 'Este es un producto nuevo.',
        price: 50,
        thumbnail: faker.internet.avatar(),
        code: faker.string.alphanumeric(5),
        stock: faker.string.numeric(1),
        category: faker.commerce.department(),
        status: true,
      };

      const response = await requester.post('/api/products').send(product);
      const { status, ok, body } = response;
      expect(status).to.equal(201);
      expect(ok).to.be.true;
      expect(body.payload).to.be.an('object');
      expect(body.payload).to.have.property('_id');
      expect(body.payload).to.have.property('title');
      expect(body.payload).to.have.property('description');
      expect(body.payload).to.have.property('price');
      expect(body.payload).to.have.property('thumbnail');
      expect(body.payload).to.have.property('code');
      expect(body.payload).to.have.property('stock');
      expect(body.payload).to.have.property('category');
      expect(body.payload).to.have.property('status');
    });
  });

  describe('Testing Cart Routes', () => {
    it('Obtengo todos los Cart con el metodo GET', async () => {
      const response = await requester.get('/api/carts');
      const { status, ok, body } = response;
      expect(status).to.equal(201);
      expect(ok).to.be.true;
      expect(body.payload).to.be.an('array');
    });

    it('Obtengo un Cart por su ID', async () => {
      const response = await requester.get('/api/carts/64ab4231fad1a441f3a16e1a/products');
      const { status, ok, body } = response;
      expect(status).to.equal(200);
      expect(ok).to.be.true;
      expect(body.payload).to.be.an('object');
    });

    it('Creo un cart con el método POST', async () => {
      const response = await requester.post('/api/carts');
      const { status, ok, body } = response;
      expect(status).to.equal(201);
      expect(ok).to.be.true;
      expect(body.payload).to.be.an('object');
    });
  });

  describe('Testing Session Routes', () => {
    it('Genero el login del Admin', async () => {
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
      let cookie;
      const user = {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      };
      const response = await requester.post('/auth/login').send(user);
      const session = await requester.get('/api/sessions/current');
      const cookieResult = response.header['set-cookie'][0];
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1],
      };
      expect(cookie.name).to.be.ok.and.equal('connect.sid');
      expect(cookie.value).to.be.ok;
      expect(session.status).to.equal(200);
    });

    it('Corroborar que se destruya la session', async () => {
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
      let cookie;
      const user = {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      };
      const response = await requester.post('/auth/login').send(user);
      const session = await requester.get('/api/sessions/current');
      const cookieResult = response.header['set-cookie'][0];
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1],
      };
      expect(cookie.name).to.be.ok.and.equal('connect.sid');
      expect(cookie.value).to.be.ok;
      expect(session.status).to.equal(200);

      const responseLogout = await requester.post('/auth/logout');
      const sessionLogout = await requester.get('/api/sessions/current');
      const cookieResultLogout = responseLogout.header['set-cookie'][0];
      cookie = {
        name: cookieResultLogout.split('=')[0],
        value: cookieResultLogout.split('=')[1],
      };
      expect(cookie.name).to.be.ok.and.equal('connect.sid');
      expect(cookie.value).to.be.ok;
      expect(sessionLogout.status).to.equal(200);
    });
  });
});
