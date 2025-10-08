import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
  // Define the number of iterations for the test
  iterations: 10,
};

export default function () {
    const url = 'http://localhost:3000/users/login';
  const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    username: 'julio',
    senha: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

 const resposta = http.post(url, payload, params);
 console.log(resposta);
  sleep(1);
}
