import jwt from 'jsonwebtoken';
import { Registro } from '../models/Registro.js';
import { Bot } from '../models/Bot.js';
import { sequelize } from '../db/database.js';
//import { UserRepository } from '../services/repositories/user-repository.js';

export const RegistroController = {
  async create(req, res) {
    const t = await sequelize.transaction(); // crea la transacción
    try {
      const registro = req.body;

      // 1. Crear el registro
      const nuevoRegistro = await Registro.create({
        bot_id: registro.bot_id,
        mensaje: registro.mensaje,
        estado: registro.estado,
        fecha_ejecucion: registro.fecha_ejecucion || new Date(),
        duracion: registro.duracion
      }, { transaction: t });

      // 2. Actualizar el bot relacionado
      const bot = await Bot.findByPk(registro.bot_id, { transaction: t });

      await bot.update({
        total_registros: registro.total_registros,
        updatedAt: new Date(),
        procesados: registro.procesados
      }, { transaction: t });

      // 3. Confirmar (commit)
      await t.commit();

      // Emitir a todos los clientes conectados
      const io = req.app.get('io');
      io.emit('nuevo_registro', nuevoRegistro, bot);

      res.json({ ok: true, nuevoRegistro, bot });

    } catch (error) {
      // ❌ Revertir si algo falla
      await t.rollback();
      console.error('Error al crear registro (rollback ejecutado):', error);
      res.status(500).json({ ok: false, error: 'Error al crear registro' });
    }
  }

};

