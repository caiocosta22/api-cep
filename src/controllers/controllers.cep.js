import ApiNodeCorreios from 'node-correios';
const correios = new ApiNodeCorreios();
/*
function Consulta(request, response){
    const parametro = request.body;
    response.json(parametro)
}*/


function Consulta(request, response){
    
    const {cep} = request.body;
        correios.consultaCEP({ cep })
        .then(result =>
            {
                return response.status(200).json(result)
        }).catch(error => {

            
            });
};
/*function Consulta(){
        const correios = new ApiNodeCorreios();
        correios.consultaCEP({ cep: "60710705" }).then(result =>
            {
                console.log(result);
        }).catch(error => {
                console.log(error);
            });
    };*/

export default {Consulta};
/*routeCep.get('/', (request, response) => {
    const { cep } = request.body
   
      correios.consultaCEP({ cep }).then(result => {
        
          return response.json(result)
  
      }).catch(error => {
    
        return response.json(error)
    });
  });*/

  