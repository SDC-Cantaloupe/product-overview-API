//const request = require('supertest')('http://localhost:3001');
const api = require('../index.js');
const db = require('../db.js');
const request = require('supertest')(api.app);
const sampleData = require('./sampleData.js');

jest.setTimeout(10000);

afterAll(() => {
  db.client.end();
  api.server.close();
});

describe('end-to-end test', () => {

  it('test get request to the endpoint /products/:product_id', (done) => {
    request.get('/products/1')
      .expect(200)
      .expect((res) => {
        expect(res.text).toBe(sampleData.productInfo);
      })
      .end(done);
  });

  it('test get request to the endpoint /products/:product_id/styles', (done) => {
    request.get('/products/1/styles')
      .expect(200)
      .expect((res) => {
        expect(res.text).toBe(sampleData.styleInfo);
      })
      .end(done);
  });

  it('test get request to the endpoint /products/:product_id/related', (done) => {
    request.get('/products/1/related')
      .expect(200)
      .expect((res) => {
        console.log(res.text);
        expect(res.text).toBe(sampleData.relatedProducts);
      })
      .end(done);
  });

});

