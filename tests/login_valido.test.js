import http from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json')); //puxa o arquivo json de fixtures, converte em objeto
import { pegarBaseUrl } from '../utilis/variaveis.js'; // importa a função para pegar a base URL 

export const options = {
/*vus:10,
duration: '30s',
thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(90)<3000', 'max <5000'], 
  },

};
*/  iterations: 10,    // quantas vezes o teste será executado
};
export default function () {
    const url = `${pegarBaseUrl()}/users/login`;
    postLogin.username = "priscila" //alterando o username para cada iteração
    console.log('Payload de login:', postLogin);  

    const payload = JSON.stringify(postLogin);
      //objeto que representa o payload, transformado em json
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const res = http.post(url, payload, params);

    check(res, {
      'Validar que o Status é 200': (r) => r.status === 200,
      'Validar que o Token é string': (r) => typeof(r.json().token) == 'string',
      'Validar que o Token não é vazio': (r) => r.json().token.length > 0,
    })

    sleep(1);
}