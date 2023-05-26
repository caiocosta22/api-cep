//Implementacao do node iniciada.
//Apos criar meu arquivo .js, iniciei o meu gerenciador NPM utilizando ( npm init ).
//Entao, utilizei o comando NPM INSTALL EXPRESS, para utilizar o micro framework express, que vai me possibilitar rodar o servidor.
//Instalei tambem a biblioteca NODEMON com NPM INSTALL NODEMON, para facilitar o processo de testes da aplicacao.
//Por ultimo, utilizo o NPM INSTALL NODE-CORREIOS, para instalar a biblioteca gratuita que e utilizada para consultar o CEP.

//Declarando a constante app, para sempre que eu chama-la ela utilizar o express.
const express = require('express');
const app = express();

//informando pro express que ele vai interpretar arquivos json
app.use(express.json());

//passando para nossa rota principal a nossa instancia do express
require('./src/index.js')(app)

app.listen(8082, () => {
  console.log('Iniciando Servidor na Porta 8082!')
})