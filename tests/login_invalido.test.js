import http from 'k6/http'
import {sleep,check} from 'k6'

export const options = {
 stages: [
    { duration: '30s', target: 50 }, // Ramp-up to 10 VUs over 10 seconds
    { duration: '20s', target: 10 }, // Stay at 10 VUs for 20 seconds
    { duration: '5s', target: 0 },  // Ramp-down to 0 VUs over 10 seconds
  ],
};

export default function () {
    const url = 'http://localhost:3000/users/login';
  const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    username: 'juli',
    password: '123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

   const resposta = http.post(url, payload, params);
 // console.log('status', resposta.status);

  
 check(resposta, {
  'Status é 400 (Bad Request)': (r) => r.status === 400,
  'Usuario ou senha inválidos': (r) => r.body.includes('Usuário não encontrado'),
  'Tempo de resposta menor que 500 ms': (r) => (r.timings && (r.timings.duration || r.timings['duration'])) < 500,


});

  sleep(1);
  }
  