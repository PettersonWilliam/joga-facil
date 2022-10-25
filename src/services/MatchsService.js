import Matchs from '../models/Matchs';
import Participants from '../models/Participants';

class MatchsService {
    store(data) {
    return Matchs.create(data);
    console.log(data);
  }

  index() {
    return Matchs.findAll({
      attributes: ['id','date', 'status','started_at','end_at','team_amount'],
      logging: true,
      include: {
        as: 'participants',
        model: Participants
      },
      where: {
        deleted_at: null
      },
      paranoid: false
    });
  }

  async show(id) {
    const match = await Matchs.findOne({
        where: {
          id,
          deleted_at: null
        },
        paranoid: false,
        attributes: ['id','date', 'status','started_at','end_at','team_amount'],
        include: {
          model: Participants,
          required: false,
          as: 'participants'
        }
    });

    if (!match) {
      throw new Error('partida não existente.');
    }

    return match;
  }

  async update({ filter, changes }) {
    return Matchs.update(changes, {
        where: {
          id: filter.id,
          deleted_at: null
        },
        paranoid: false
    });
  }

  async delete(id) {
    const match = await Matchs.findOne({
      where: {
        status: 'OPEN',
        id
      }
    });
  
    if (!match) { 
      throw new Error('Nao é possivel deletar a partida');
    }

    await Matchs.destroy({
        where: {
          id,
          deleted_at: null
        },
        paranoid: false
    });

    return true;
  }
}
export default new MatchsService();
