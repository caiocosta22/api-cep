import sqlConfig from "../config/dbconfig.js";
import sql from "mssql"
function Inserir(dadosCep, callback){
    sql.connect(function(err, conn){
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
};

export default {Inserir}
