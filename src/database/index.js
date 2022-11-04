import Sequelize from 'sequelize';

import User from '../models/User';
import Matchs from '../models/Matchs';
import Position from '../models/Position';
import databaseConfig from '../config/database';
import Participants from '../models/Participants';
import UserAccessLogs from '../models/UserAccessLogs';
import MatchsParticipants from '../models/MatchsParticipants';

const models = [User, Position, Participants, Matchs, MatchsParticipants, UserAccessLogs];

const sequelize = new Sequelize(databaseConfig);
const instances = {};

models.forEach(model => instances[model.name] = model.init(sequelize));

models.forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(instances);
    }
});
