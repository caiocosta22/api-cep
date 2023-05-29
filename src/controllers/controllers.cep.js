import ApiNodeCorreios from 'node-correios';
// import { query } from "express";
import sqlConfig from "../config/dbconfig.js";
import sql from "mssql"
import modelCep from '../models/model.cep.js';

//Consulta na API dos correios retornando o endereco a partir do CEP.
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

//Funcao para inserir manualmente um JSON no banco de dados com o endereco completo.
function Inserir(request, response) {
    modelCep.Inserir(request.body)
      .then(result => {
        return response.status(201).json(result);
      })
      .catch(error => {
        return response.status(404).json(error);
      });
  }

//Funcao para consultar o banco de dados e trazer todos os CEPS inseridos.
function checar (request, result) {
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

//Funcao assincrona que espera fazer a consulta na API dos correios para prosseguir.
async function checarinserir(request, response){
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
//Comeco da insercao, apos voce informar o parametro desejo como 'Sim' no body da requisicao
    if(desejo) {
        sql.connect(sqlConfig).then(() => {
            const request = new sql.Request();
            
            const dados = finalJson;
            let insertQuery = `INSERT INTO dbo.CONSULTA_CEP(cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi) `;
    
            const { cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd, siafi } = dados;
            insertQuery += `VALUES('${cep}', '${logradouro}', '${complemento}', '${bairro}', '${localidade}', '${uf}', '${ibge}','${gia}','${ddd}','${siafi}')`;
    
            request.query(insertQuery).then((insert) => {
              console.log(dados)
              return response.status(201).json({ message: 'Insert realizado com sucesso!', dadosInseridos: {dados} });
    
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
    checar,
    checarinserir
}