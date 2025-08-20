import { Router } from 'express';
import { BotController } from '../controllers/bot.controller.js';
import { authenticateToken } from '../middlewares/auth-middleware.js';
import { UserController } from '../controllers/user.controller.js';


const router = Router();

router.get('/get', BotController.get);
router.get('/get/registros', BotController.getRegistros);
router.get('/get/users', BotController.getUsers);
router.get('/get/bots', BotController.getBots);
router.get('/get/solicitudes/usuario', UserController.getSolicitudes);
router.get('/descargar-formato', BotController.descargarFormato);
router.post('/add/bots/user', BotController.addBotsToUser);
router.post('/update/user/rol', BotController.updateUserRol);
router.post('/create/solicitud', BotController.createSolicitud);


export default router;
