import http from 'k6/http'
import {sleep,check} from 'k6'

export const options = {
  // Define o numero de interações para o teste
  vus: 1,
  iterations: 20,
  thresholds: {
    http_req_duration: ['p(90)<100'], // 90% das requisições devem ser menores que 100ms
    http_req_failed: ['rate<=1'],    // Em vez de exigir 0% de falhas, permitir até 100% se esperado
    
  },
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
  console.log('Resposta da API:', resposta.body);
  console.log('Status:', resposta.status);
  
 check(resposta, {
  'Status é 400 (Bad Request)': (r) => r.status === 400,
  'Resposta contém mensagem de erro': (r) => r.body.includes('Usuário não encontrado'),
  'Resposta é um JSON válido': (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch (e) {
        return false;
      }
    },
  'Tempo de resposta menor que 500 ms': (r) => (r.timings && (r.timings.duration || r.timings['duration'])) < 500,


});

  sleep(1);
  }
  