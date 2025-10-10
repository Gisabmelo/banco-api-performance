Para iniciar os testes:
k6 run tests <nome do arquivo>

ou para rodar todos os arquivos da pasta test:

 K6 run tests/*.test.js

 ou
ls tests/*.js | xargs -n 1 -P 4 k6 run
 ls tests/performance/*.js | xargs -n 1 -P 4 k6 run

