import { query } from "express";
import sqlConfig from "../config/dbconfig.js";
import sql from "mssql"
function Inserir(dadosCep){
    console.log(dadosCep)
    sql.connect(sqlConfig).then(() => {
            console.log('Conectado ao banco de dados!');
            // Executando o INSERT
            const request = new sql.Request();
            let ssql = "INSERT INTO dbo.CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi) ";
            const { cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi } = dadosCep
            ssql +=`VALUES(
                    '${cep}', 
                    '${logradouro}', 
                    '${complemento}', 
                    '${bairro}', 
                    '${localidade}', 
                    '${uf}', 
                    '${ibge}',
                    '${gia}',
                    '${ddd}',
                    '${siafi}'
                )`;
        request.query(ssql)
        .then((result) => {
            console.log('Registro inserido com sucesso!');
            return result
        }).catch((err) => {
            console.error('Erro ao inserir registro:', err);
            throw err;
        }).finally(() => {
            // Encerrando a conexão com o banco de dados
            sql.close();
            return;
        });
    }).catch((err) => {
            console.error('Erro ao conectar ao banco de dados:', err);
            throw err;
    })};

export default { Inserir }
