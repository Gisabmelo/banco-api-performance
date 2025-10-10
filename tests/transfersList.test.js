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
  const res = http.get('http://localhost:3000/transfers')

  check(res, {
    'status é 400 ou 401': (r) => r.status === 400 || r.status === 401,
    'resposta contém mensagem de token': (r) =>
      r.body.includes('Token não fornecido.') || r.body.includes('Token inválido'),
  })

  sleep(1)
}