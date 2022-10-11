import MatchsParticipants from '../models/MatchsParticipants';

class MatchsParticipantsService {
    async create(data) {
      return MatchsParticipants.create(data);
    }
    index() {
      return MatchsParticipants.findAll({ attributes: [ 'id','match_id', 'participant_id','is_confirmed','gols','rate', ] });
  }
//     async show(id) {
//     const matchParticipant = await MatchsParticipants.findOne({
//         where: {
//             id,
//             deleted_at: null
//         },
//         paranoid: false,
//         attributes: ['id','date', 'status','started_at','end_at','team_amount']
//     });

//     if (!matchParticipant) {
//         throw new Error('RELACIONAMENTO não existE.');
//     }
//         return matchParticipant;
// }
//   async update({ filter, changes })  {
//     return Matchs.update(changes, {
//         where: {
//             id: filter.id
//         }
//     });
//   }
//   async delete(id) {
//     await Matchs.destroy({
//         where: {
//             id,
//             deleted_at: null
//         },
//         paranoid: false
//     });

//     return true;
//   }
}
export default new MatchsParticipantsService();