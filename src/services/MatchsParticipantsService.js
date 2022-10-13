import MatchsParticipants from '../models/MatchsParticipants';

class MatchsParticipantsService {
    async create(data) {
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
    await MatchsParticipants.destroy({
        where: {
          ...filter
        },
        attributes: [ 'id','match_id', 'participant_id','is_confirmed','gols','rate'],

    });

    return true;
  }
}
export default new MatchsParticipantsService();