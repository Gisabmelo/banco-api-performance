import http from 'k6/http';
import { check } from 'k6';

export const options = {
  // Define the number of iterations for the test
  vus: 1,
  iterations: 100,
  thresholds: {
    http_req_duration: ['p(90)<100'], // 90% das requisições devem ser menores que 100ms
    http_req_failed: ['rate<0.01'],    // Em vez de exigir 0% de falhas, permitir até 100% se esperado
    
  },
};


export default function () {
  const url = 'http://localhost:3000/users'

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.get(url, params);
 console.log('Resposta da API:', res.body);

  check(res, {
    'status é 200 (OK)': (r) => r.status === 200,

    'Resposta é um JSON válido': (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch (e) {
        return false;
      }
    },

    'Retorna uma lista de usuários': (r) => {
      try {
        const data = JSON.parse(r.body);
        return Array.isArray(data);
      } catch (e) {
        return false;
      }
    },

    'Lista contém pelo menos 1 usuário': (r) => {
      try {
        const data = JSON.parse(r.body);
        return Array.isArray(data) && data.length > 0;
      } catch (e) {
        return false;
      }
    },

    'Tempo de resposta menor que 500 ms': (r) => r.timings.duration < 500,
  });
}