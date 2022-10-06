import Participants from '../models/Participants';

class ParticipantsService {
    create(data) {
      return Participants.create(data);
    }
    index() {
      return Participants.findAll({ attributes: ['id', 'name'] });
  }
  async update(filter, changes)  {
    return Participants.update(changes, {
        where: {
            id: filter.id
        }
    });
  }
  async delete(userId) {
    await Participants.destroy({
        where: {
            id: userId,
            deleted_at: null
        }
    });

    return true;
  }
}
export default new ParticipantsService();