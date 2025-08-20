// utils/jwtUtils.js
import jwt from 'jsonwebtoken';

export function generateToken(user, secret, expiresIn = '3h') {
  return jwt.sign(
    {
      user_id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
    secret,
    { expiresIn }
  );
}
