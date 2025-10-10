import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 10,            
  iterations: 100,    
  thresholds: {
    http_req_failed: ['rate<=1'], 
    http_req_duration: ['p(95)<100'], 
  },
}

export default function () {
  const loginUser = `http://localhost:3000/users/login`
  
  const loginPayload = JSON.stringify({ username: 'julio', password: '123456', })
  const loginParams = { headers: { 'Content-Type': 'application/json' }, }
  
  const loginResponse = http.post(loginUser, loginPayload, loginParams)  
  const token = loginResponse.json('token')
  
  // Verifica se o login foi bem-sucedido
  check(loginResponse, {
    'Login com sucesso: status 200 (OK)': (r) => r.status === 200,
    'Login com sucesso: retornou o token corretamente': (r) => r.json('token') !== undefined,
  })
  
  const transfersEndpoint = `http://localhost:3000/transfers` 
  const tokenInvalido = `Bearer ${token}error543210`
  
  const paramsInvalido = { headers: { 'Content-Type': 'application/json', Authorization: tokenInvalido, }}
  
  const res = http.get(transfersEndpoint)
  const resInvalido = http.get(transfersEndpoint, paramsInvalido)  

  // Consultar rota transfers sem informar token.
  check(res, {
    'Consultar transferências sem inserir um token: status 401': (r) => r.status === 401,
    'Consultar transferências - mensagem de erro: Token não fornecido.': (r) =>
      r.body.includes('Token não fornecido.'),
  })

  // Consultar rota transfers com token inválido.
  check(resInvalido, {
    'Consultar transferências com token inválido: status 403': (r) => r.status === 403,
    'Consultar transferências - mensagem de erro: Token inválido.': (r) =>
      r.body.includes('Token inválido.'),
  })

  sleep(1)
}