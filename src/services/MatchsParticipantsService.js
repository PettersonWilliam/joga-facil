import Matchs from '../models/Matchs';
import Position from '../models/Position';
import Participants from '../models/Participants';
import MatchsParticipants from '../models/MatchsParticipants';

class MatchsParticipantsService {
  async checkGoalKeeperAmount(data, goalKeeperPosition){
    const matchsWithGoalKeepers = await Matchs.findOne({
        where: {
          id: data.match_id,
          deleted_at: null
        },
        paranoid: false,
        attributes: ['id'],
        include: {
          model: Participants,
          required: false,
          as: 'participants',
          include: {
            model: Position,
            where: {
              id: goalKeeperPosition.id
            },
            attributes: ['id']
          }
        }
    });
  
    const parsedMatch = matchsWithGoalKeepers.toJSON();//matchsWithGoalKeepers -- partidas com goleiros
  
    return parsedMatch.participants.length < 2;
  }

    async create(data) {
      const matchsParticipants = await MatchsParticipants.count({
        where: {
          match_id: data.match_id,
          participant_id: data.participant_id
        }
      });

      if (matchsParticipants) {
        throw new Error('O participante nao pode esta na mesma partida por mais de uma vez')
      }

      const goalKeeperPosition = await Position.findOne({
        where: {
          name: 'Goleiro',
          deleted_at: null
        },
        attributes: ['id'],
        paranoid: false,
        raw: true
      });

      const goalKeeperToInsert = await Participants.count({
        where: {
          id: data.participant_id,
          position_id: goalKeeperPosition.id,
          deleted_at: null
        },
        paranoid: false,
        include:  {
          model: Position
        }
      });

      if (goalKeeperToInsert) { //goalKeeperToInsert -- inserir goleiro
        const allowCreateGoalKeeper = await this.checkGoalKeeperAmount(data, goalKeeperPosition);//allowCreateGoalKeeper -- permitir criar goleiro

        if (!allowCreateGoalKeeper) {//allowCreateGoalKeeper -- permitir criar goleiro
          throw ('So é permitido 2 goleiros por partida.')
        }
      }
    
      return MatchsParticipants.create(data);
    }

    index() {
      return MatchsParticipants.findAll({ 
        attributes: [ 'id','match_id', 'participant_id','is_confirmed','gols','rate', ] 
      });
  }
    async show(id) {
    const matchParticipant = await MatchsParticipants.findOne({
        where: {
            id,
            deleted_at: null
        },
        paranoid: false,
        attributes:[ 'id','match_id', 'participant_id','is_confirmed','gols','rate']
    }); 

    if (!matchParticipant) {
        throw new Error('ID DO RELACIONAMENTO não existE.');
    }
        return matchParticipant;

}
  async update({ filter, changes })  {
    return MatchsParticipants.update(changes, {
      where: {
        ...filter
      },
      attributes: [ 'id','match_id', 'participant_id','is_confirmed','gols','rate'],
    });
  }

  async delete(id) {
    const matchParticipant = await MatchsParticipants.findOne({
      where: {
        id
      }
    })
   if (!matchParticipant) {
      throw new Error('NÃO EXITE PARTICIPANTE RELACIONADO A UMA PARTIDA.');      
    }
    await MatchsParticipants.destroy({
        where: {
          id
        },
        attributes: ['id','match_id', 'participant_id','is_confirmed','gols','rate']
    });

    return true;
  }
}
export default new MatchsParticipantsService();