import { query } from "express";
import sqlConfig from "../config/dbconfig.js";
import sql from "mssql"
function Inserir(dadosCep, callback){
    console.log("🚀 ~ file: model.cep.js:4 ~ Inserir ~ dadosCep:", dadosCep)
    sql.connect(sqlConfig).then(() => {
            console.log('Conectado ao banco de dados!');
            // Executando o INSERT
            const request = new sql.Request();
            let ssql = "INSERT INTO dbo.CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi) ";
            // ssql +="values(?,?,?,?,?,?,?,?,?,?) ";
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
            return err
        }).finally(() => {
            // Encerrando a conexão com o banco de dados
            sql.close();
            return;
        });
    }).catch((err) => {
            console.error('Erro ao conectar ao banco de dados:', err);
            return err;
    })};
    /*sql.connect(function(err, conn){
        conn.beginTransaction(function(err){
                
            let ssql = "insert into CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi) ";
            ssql += "values(?,?,?,?,?,?,?,?,?,?) ";

            conn.query(ssql,[dadosCep.cep, dadosCep.logradouro, dadosCep.complemento, dadosCep.bairro, dadosCep.localidade, dadosCep.localidade,
            dadosCep.uf, dadosCep.ibge, dadosCep.gia, dadosCep.ddd, dadosCep.siafi], function(err, result){
                if (err){
                    conn.rollback();
                    callback(err, result);
                } 
                else {
                    conn.commit();
                    callback(err, result);
                }
                
            });
            conn.release();
        });
    });
};*/

export default { Inserir }
