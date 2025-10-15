import http from 'k6/http';
import { check, sleep } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { obterToken } from '../helpers/autenticacao.js';
import { pegarBaseUrl } from '../utilis/variaveis.js';  // importa a função para pegar a base URL 
 
export const options = {
  iterations: 1,
};

export default function() {
 const token = obterToken();

 const url = `${pegarBaseUrl()}/transfers`;
const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    from: 'julio',
    to: 'priscila',
    value: 100.00 ,
});


 const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
  

  let res = http.post(url, payload, params);  
   console.log('status', res.status);


 check(res, {
    'Status é 201': (r) => r.status === 201,
  
 });

  sleep(1);
}
