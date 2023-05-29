import controllersCep from '../controllers/controllers.cep.js';
import { Router } from 'express';
const routeCep = Router();

routeCep.get('/consulta/', controllersCep.Consulta);
routeCep.post('/inserir/', controllersCep.Inserir);

export default routeCep
