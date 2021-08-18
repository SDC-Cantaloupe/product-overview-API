import http from 'k6/http';
import { check } from 'k6';
const port = 3002;

export let options = {
  'vus': 10,
  'duration': '10s',
  'thresholds': {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<200'] // 95% of requests should be below 200ms
  },
};

export default function () {
  let resProductStyles = http.get(`http://localhost:${port}/products/1/styles/`);
  check(resProductStyles, {
    'getProductStyles: status 200': (r) => r.status === 200,
    'getProductStyles: correct response': (r) => r.body.length === 12277
  });
  // console.log('Response time for product styles was ' + String(resProductStyles.timings.duration) + ' ms');
}
