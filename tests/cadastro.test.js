import { check } from 'k6'
import http from 'k6/http'
import { Faker } from 'k6/x/faker'

const faker = new Faker(11)
const baseUrl = 'http://localhost:3000'
const registerEndpoint = '/users/register'

export const options = {
    iterations: 20,
    thresholds: {   
        'http_req_duration' : ['p(95)<30'],
        'http_req_failed': ['rate<0.01']
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
    check(respostaCadastro, {
        'Status = 201' : (r) => r.status == 201
    })
}