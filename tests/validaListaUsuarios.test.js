import http from 'k6/http';
import { check } from 'k6';

export const options = {
  iterations: 1,    // quantas vezes o teste será executado
};

export default function () {
  const url = 'http://localhost:3000/users'

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.get(url, params);

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