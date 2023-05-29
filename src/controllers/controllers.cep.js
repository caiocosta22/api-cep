import ApiNodeCorreios from 'node-correios';
// import { query } from "express";
import sqlConfig from "../config/dbconfig.js";
import sql from "mssql"
import modelCep from '../models/model.cep.js';

const correios = new ApiNodeCorreios();

function Consulta(request, response){
    
    const {cep} = request.body;
        correios.consultaCEP({ cep })
        .then(result => {
                return response.status(200).json(result);
        }).catch(error => {
                return response.status(404).json(error);
        });
};

function Inserir(request, result){

    modelCep.Inserir(request.body)
    .then(result =>{
            return result.status(201).json(result);
    }).catch(error => {
            return result.status(404).json(error);
    });
} 

function getDB (request, result) {
    return sql.connect(sqlConfig).then(() => {
        const request = new sql.Request();
        request.query('SELECT * FROM dbo.CONSULTA_CEP').then((registro) => {
            return result.status(201).json(registro.recordset)
        }).catch((err) => {
            return result.status(404).json(err)
        }).finally(() => {
            sql.close();
        });
    }).catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
        return err;
    })
};


async function checkAndInsert(request, response){
    const { cep, desejo } = request.body;
    let finalJson = {};
    await correios.consultaCEP({ cep }).then(result => {
        finalJson = result;
        if(desejo !== 'Sim') {
            return response.status(201).json({ 
                message: "Deseja inserir esses dados no banco? Caso deseje, passe no body a requisicao no formato { cep: XXXXXXX-XXX, desejo: 'Sim' }", 
                dadosCep: { result }
            });
        }
    }).catch(error => {
        console.log('Erro na api do correios')
        return response.status(404).json(error);
    });

    if(desejo) {
        sql.connect(sqlConfig).then(() => {
            const request = new sql.Request();
            
            const dados = finalJson;
            let insertQuery = `INSERT INTO dbo.CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi) `;
    
            const { cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi } = dados;
            insertQuery += `VALUES('${cep}', '${logradouro}', '${complemento}', '${bairro}', '${localidade}', '${uf}', '${ibge}','${gia}','${ddd}','${siafi}')`;
    
            request.query(insertQuery).then((insert) => {
              console.log(dados)
              return response.status(201).json({ message: 'Insert realizado com sucesso!', dadosInseridos: {dados } });
    
            }).catch((err) => {
    
              console.log('Erro no insert: ', { details: err })
              return response.status(500).json({ error: 'Erro ao realizar o insert.', details: err });
    
            }).finally(() => {
              sql.close();
            });
        }).catch((err) => {
            console.error('Erro ao conectar ao banco de dados:', err);
            return err;
        })
    }
    
};


export default {
    Consulta, 
    Inserir, 
    getDB,
    checkAndInsert
}