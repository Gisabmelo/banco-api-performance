import { check } from 'k6'
import http from 'k6/http'
import { Counter } from 'k6/metrics'
import { Faker } from 'k6/x/faker'

const faker = new Faker(11)
const baseUrl = 'http://localhost:3000'
const registerEndpoint = '/users/register'
const errosCadastro = new Counter('erros_cadastro')

export const options = {
    iterations: 20,
    thresholds: {   
        'http_req_duration' : ['p(95)<30'],
        'http_req_failed': ['rate<0.01'],
        erros_cadastro: ['count<=0']
    }
}

function generateUser(){
    return {
        username : faker.internet.username(),
        password : faker.internet.password(),
        favorecidos : faker.person.firstName()
    }
}

export default function(){ 
    const url = `${baseUrl}${registerEndpoint}`
    const usuario = generateUser()

    const payload = JSON.stringify({
        username: usuario.username,
        password: usuario.password,
        favorecidos: [usuario.favorecidos]
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const respostaCadastro = http.post(url, payload, params)

    if(respostaCadastro.status !== 201){
        errosCadastro.add(1)
    }
    
    check(respostaCadastro, {
        'Status = 201' : (r) => r.status == 201
    })
}