import http from 'k6/http'
import { Counter } from 'k6/metrics'
import { check } from 'k6'

const errosLogin = new Counter('erros_login')
const errosTransferencia = new Counter('erros_transferencia')
const username = 'julio'
const password = '123456'

export const options = {
    iterations: 100,
    thresholds:{
        'http_req_duration': ['p(95)<25'],
        'http_req_failed': ['rate<0.01'],
        erros_login: ['count<=0'],
        erros_transferencia: ['count<=0']
    }
}

export default function(){
    const loginUrl = 'http://localhost:3000/users/login'

    const loginPayload = JSON.stringify({
      username: username,
      password: password,
    })
    
    const loginParams = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const respostaLogin = http.post(loginUrl, loginPayload, loginParams)
    const loginBody = JSON.parse(respostaLogin.body)
    const token = loginBody.token

    if(respostaLogin.status !== 200){
        errosLogin.add(1)
    }

    const urlTransferencia = 'http://localhost:3000/transfers'
    
    const payloadTransferencia = JSON.stringify({
        from: 'julio',
        to: 'priscila',
        value: 10
    })

    const paramsTransferencia = {
        headers:{
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    }

    const respostaTransferencia = http.post(urlTransferencia, payloadTransferencia, paramsTransferencia)

    if(respostaTransferencia.status !== 201){
        errosTransferencia.add(1)
    }

    check(respostaTransferencia, {
        'Status = 201': (res) => res.status == 201
    })
}