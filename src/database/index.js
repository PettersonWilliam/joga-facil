import Sequelize from 'sequelize';
import User from '../models/User';
import Participants from '../models/Participants';
import Position from '../models/Position';
import databaseConfig from '../config/database';

const models = [User, Participants, Position];

const sequelize = new Sequelize(databaseConfig);

models.forEach((model) => model.init(sequelize));
