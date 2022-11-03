import Position from '../models/Position';

class PositionService {
    async create(position) {
        return Position.create(position)
    }

    index() {
        return Position.findAll({ attributes: ['id', 'name'] });
    }

    async show(id) {
        const position = await Position.findOne({
            where: {
                id,
                deleted_at: null
            },
            paranoid: false,
            attributes: [ 'id', 'name']
        });

        if (!position) {
            throw new Error('posição não existe');
        }
            return position;
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
            },
            paranoid: false
        });
    }
    
}
export default new PositionService();