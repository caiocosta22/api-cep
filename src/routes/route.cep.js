import controllersCep from '../controllers/controllers.cep.js';
import { Router } from 'express';
const routeCep = Router();

routeCep.post('/consulta/', controllersCep.Consulta);

export default routeCep;
