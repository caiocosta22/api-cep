import ApiNodeCorreios from 'node-correios';
const correios = new ApiNodeCorreios();
import modelCep from '../models/model.cep.js';

function Consulta(request, response){
    
    const {cep} = request.body;
        correios.consultaCEP({ cep })
        .then(result => {
                return response.status(200).json(result);
        }).catch(error => {
                return response.status(404).json(error);
            });
};

function Inserir(request, response){

    modelCep.Inserir(request.body, function(err, result){
        if(err){
            result.status(500).send(err)
        } else {
            result.status(201).send(console.log("Cep inserido com sucesso"))
        }
    })
}


export default {Consulta, Inserir}


  