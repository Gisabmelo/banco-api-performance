import http from 'k6/http'
import {sleep,check} from 'k6'

export const options = {
  // Define the number of iterations for the test
  iterations: 10,
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
  console.log(resposta);
  
 check(resposta, {
  'Valida que o status é 400': (r) => r.status === 400,
  'Mensagem contém "Error: Bad Request"': (r) => r.body.includes('Error: Bad Request'),
  'Usuário ou senha inválidos': (r) =>
    r.body.includes('usuário ou senha inválidos') ||
    r.body.includes('usuario ou senha invalidos'),
  'Tempo de resposta menor que 500 ms': (r) => (r.timings && (r.timings.duration || r.timings['duration'])) < 500,


});

  sleep(1);
  }
  