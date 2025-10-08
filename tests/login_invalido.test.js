import http from 'k6/http'
import {sleep,check} from 'k6'

// Centralized expected error messages
const EXPECTED_MESSAGES = {
  INVALID_LOGIN: 'Invalid username or password',
};

export const options = {
  // Define the number of iterations for the test
  iterations: 1,
};

export default function () {
    const url = 'http://localhost:3000/users/login';
  const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    username: 'julio',
    password: '123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

   const resposta = http.post(url, payload, params);

 check(resposta, {
  'Check that status is 400': (r) => r.status === 400,
  'Check error message for invalid login': (r) => {
    try {
      const json = r.json();
      return json && json.message === EXPECTED_MESSAGES.INVALID_LOGIN;
    } catch (e) {
      return false;
    }
  }
});

 
      sleep(1);
  }
  