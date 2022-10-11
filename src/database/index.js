import Sequelize from 'sequelize';

import User from '../models/User';
import Participants from '../models/Participants';
import Position from '../models/Position';
import Matchs from '../models/Matchs';
import MatchsParticipants from '../models/MatchsParticipants';
import databaseConfig from '../config/database';

const models = [User, Position, Participants, Matchs, MatchsParticipants];

const sequelize = new Sequelize(databaseConfig);
const instances = {};

models.forEach(model => {
    instances[model.name] = model.init(sequelize);
});

models.forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(instances);
    }
});
