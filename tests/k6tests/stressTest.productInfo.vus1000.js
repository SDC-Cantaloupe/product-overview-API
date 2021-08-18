import http from 'k6/http';
import { check } from 'k6';
const port = 3002;

export let options = {
  'vus': 1000,
  'duration': '10s',
  'thresholds': {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<200'] // 95% of requests should be below 200ms
  }
};

export default function () {
  let resProductInfo = http.get(`http://localhost:${port}/products/1/`);
  check(resProductInfo, {
    'getProductInfo: status 200': (r) => r.status === 200,
    'getProductInfo: correct response': (r) => r.body.length === 342
  });
  //console.log('Response time for product info was ' + String(resProductInfo.timings.duration) + ' ms');
}
