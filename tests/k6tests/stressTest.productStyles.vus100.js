import http from 'k6/http';

export let options = {
  'vus': 100,
  'duration': '10s',
  'thresholds': {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<200'] // 95% of requests should be below 200ms
  },
};

export default function () {
  let resProductStyles = http.get('http://localhost:3001/products/1/styles/');
  // console.log('Response time for product styles was ' + String(resProductStyles.timings.duration) + ' ms');
}
