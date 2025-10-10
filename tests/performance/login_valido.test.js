import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {

    iterations: 20,
     thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(90)<100'], 
  },

};

export default function () {
    const url = 'http://localhost:3000/users/login';
    
    const payload = JSON.stringify({
      username: 'julio',
      password: '123456',
    });
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const res = http.post(url, payload, params);
    console.log('Resposta da API:', res.body);

    check(res, {
      'Validar que o Status é 200': (r) => r.status === 200,
      'Validar que o Token é string': (r) => typeof(r.json().token) == 'string',
      'Validar que o Token não é vazio': (r) => r.json().token.length > 0,
    })

    sleep(1);
}