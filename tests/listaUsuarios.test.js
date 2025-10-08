import http, { get } from 'k6/http'
import {sleep,check} from 'k6'

export const options = {
  // Define the number of iterations for the test
  iterations: 1,
};

export default function () {
  const url = 'http://localhost:3000/users';
  const payload = JSON.stringify({
    //objeto que representa o payload, transformado em json
    username: 'julio',
    favorecido: 'priscila',
    saldo: '10000',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resposta = http.get(url, payload, params);

 check(resposta, {
  'Check that status is 200': (r) => r.status === 200,
  'Check that body is an array': (r) => Array.isArray(r.json()),
  'Check that array is not empty': (r) => r.json().length > 0,

});

  sleep(1);
}
