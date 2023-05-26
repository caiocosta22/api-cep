import express from "express"
const app = express();

import routeCep from "./routes/route.cep.js";

//Middleware que interpreta arquivos json para o framework express
app.use(express.json());
//Rota/
app.use(routeCep);
//Resposta do Servidor
app.listen(8082, () => {
  console.log("Iniciando Servidor na Porta 8082!")
});

