import express from "express"
const app = express();
import connectToDatabase from "./config/database.js";
import routeCep from "./routes/route.cep.js";


//Middleware que interpreta arquivos json para o framework express
app.use(express.json());
//Banco de dados
app.use(connectToDatabase);
//Rota/
app.use(routeCep);
//Resposta do Servidor
app.listen(8082, () => {
  console.log("Iniciando Servidor na Porta 8082!")
});

