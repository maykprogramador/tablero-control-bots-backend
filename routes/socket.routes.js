import { Router } from 'express';
import { BotController } from '../controllers/bot.controller.js';
import { authenticateToken } from '../middlewares/auth-middleware.js';
import { Registro } from '../models/Registro.js';
import { RegistroController } from '../controllers/registro.controller.js';

const router = Router();

router.post('/nuevo-registro', RegistroController.create);

export default router;
