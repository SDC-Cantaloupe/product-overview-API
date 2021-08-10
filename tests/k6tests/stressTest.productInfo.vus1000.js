import http from 'k6/http';

export let options = {
  'vus': 1000,
  'duration': '10s',
  'thresholds': {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<200'] // 95% of requests should be below 200ms
  }
};

export default function () {
  let resProductInfo = http.get('http://localhost:3001/products/1/');
  //console.log('Response time for product info was ' + String(resProductInfo.timings.duration) + ' ms');
}