import http, { get } from 'k6/http'
import {sleep} from 'k6'

export const options = {
  // Define the number of iterations for the test
  iterations: 2,
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
  console.log(resposta);
  sleep(1);
}
