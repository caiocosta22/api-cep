import controllersCep from '../controllers/controllers.cep.js';
import { Router } from 'express';
const routeCep = Router();

routeCep.get('/consulta/', controllersCep.Consulta);
routeCep.post('/inserir/', controllersCep.Inserir);
routeCep.get('/inserir/', controllersCep.getDB);
routeCep.post('/checar-inserir/', controllersCep.checkAndInsert);

export default routeCep
