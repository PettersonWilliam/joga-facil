import Position from '../models/Position';

class PositionService {
    async create(position) {
        return Position.create(position)
    }

    index() {
        return Position.findAll({ attributes: ['id', 'name'] });
    }

    async update(filter, changes)  {
        return Position.update(changes, {
            where: {
                id: filter.id
            }
        });
    }
        
    async delete(id) {
        await Position.destroy({
            where: {
                id,
                deleted_at: null
            }
        });
    }
}
export default new PositionService();