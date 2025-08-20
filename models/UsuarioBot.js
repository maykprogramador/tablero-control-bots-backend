// models/UsuarioBot.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.js';

export class UsuarioBot extends Model {}

UsuarioBot.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  bot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'bots',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'UsuarioBot',
  tableName: 'usuarios_bots',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'bot_id'], // Evita duplicados
    },
  ],
});
