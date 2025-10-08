import http from 'k6/http'
import {sleep,check} from 'k6'

export const options = {
  // Define the number of iterations for the test
  iterations: 2,
};

export default function () {
    const url = 'http://localhost:3000/users/login';
  const payload = JSON.stringify({
   // Object representing the payload, converted to JSON
    username: 'julio',
    password: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

 const resposta = http.post(url, payload, params);

 check(resposta, {
  'Check that status is 200': (r) => r.status === 200,
  'Check that token is a string': (r) => typeof r.json().token === 'string',
  'Check that token is not empty': (r) => r.json().token.length > 0,
    

});

  sleep(1);
}
