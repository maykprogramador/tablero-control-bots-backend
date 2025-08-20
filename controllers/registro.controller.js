import jwt from 'jsonwebtoken';
import { Registro } from '../models/Registro.js';
//import { UserRepository } from '../services/repositories/user-repository.js';

export const RegistroController = {
  async create(req, res) {
    try {
      const registro = req.body;

      const nuevoRegistro = await Registro.create({
        bot_id: registro.bot_id,
        mensaje: registro.mensaje,
        estado: registro.estado,
        fecha_ejecucion: registro.fecha_ejecucion || new Date(),
        duracion: registro.duracion
      });

      //console.log('Nuevo registro guardado:', nuevoRegistro.toJSON());

      // Emitir a todos los clientes conectados
      const io = req.app.get('io');
      io.emit('nuevo_registro', nuevoRegistro);

      res.json({ ok: true, nuevoRegistro });
      //res.status(200).json(solicitudes);
    } catch (error) {
      console.error('Error al crear registro:', error);
      res.status(500).json({ ok: false, error: 'Error al crear registro' });
    }
  }

};

