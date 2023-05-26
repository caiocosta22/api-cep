const express = require('express');
const router = express.Router();
const ApiNodeCorreios = require('node-correios');

const correios = new ApiNodeCorreios();

router.get('/', (request, response) => {
  const { cep } = request.body

    correios.consultaCEP({ cep }).then(result => {
      
        return response.json(result)

    }).catch(error => {
  
      return response.json(error)
  
/*  correios.consultaCEP({ cep: '60710705' })
    .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);*/
  });
});
module.exports = router