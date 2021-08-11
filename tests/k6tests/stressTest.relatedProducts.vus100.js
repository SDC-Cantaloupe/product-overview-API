import http from 'k6/http';
import { check } from 'k6';

export let options = {
  'vus': 100,
  'duration': '10s',
  'thresholds': {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<200'] // 95% of requests should be below 200ms
  },
};

export default function () {
  let resRelatedProducts = http.get('http://localhost:3001/products/1/related/');
  check(resRelatedProducts, {
    'getRelatedProducts: status 200': (r) => r.status === 200,
    'getRelatedProducts: correct response': (r) => r.body.length === 9
  });
  // console.log('Response time for related products was ' + String(resRelatedProducts.timings.duration) + ' ms');
}