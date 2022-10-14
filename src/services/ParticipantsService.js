import Matchs from '../models/Matchs';
import Participants from '../models/Participants';

class ParticipantsService {
    create(data) {
        return Participants.create(data);
    }

    index() {
        return Participants.findAll({
            attributes: ['id', 'name'],
            where: {
                deleted_at: null
            },
            include: {
                model: Matchs,
                as: 'matches',
                attributes: ['id', 'date', 'status', 'started_at', 'end_at', 'team_amount'],
                through: {
                    attributes: []
                }
            },
            paranoid: false
        });
    }

    async update({ filter, changes })  {
        return Participants.update(changes, {
            where: {
                id: filter.id,
                deleted_at: null
            },
            paranoid: false
        });
    }

    async delete(userId) {
        await Participants.destroy({
            where: {
                id: userId,
                deleted_at: null
            },
            paranoid: false
        });

        return true;
    }

    async show(id) {
        const participant = await Participants.findOne({
            where: {
                id,
                deleted_at: null
            },
            include: {
                model: Matchs,
                as: 'matches',
                attributes: ['id', 'date', 'status', 'started_at', 'end_at', 'team_amount'],
                through: {
                    attributes: []
                }
            },
            paranoid: false,
            attributes: ['id','name', 'born','number','position_id']
        });

        if (!participant) {
            throw new Error('participante não existe.');
        }
        return participant;
    }
}
export default new ParticipantsService();