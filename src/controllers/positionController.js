import PositionsService from '../services/PositionsService';

class PositionController {
    async store(req, res) {
        try {
            const position = {
                name: req.data.name,
            };

            const { id, name } = await PositionsService.create(position);

            return res.json({ id, name });
        } catch (e) {
        return res.status(400).json('Erro ao criar posição.');
        }
    }

    async index(req, res) {
        try {
            const position = await PositionsService.index();
            
            return res.json(position)
            } catch(e) {
            return res.status(400).json('Erro ao listar posição.');
        }
    }

    async update(req, res) {
        try {
            const filter = {
                id: req.filter.id
            }
            const changes = {};
            
            if (req.data.name) {
                changes.name = req.data.name;
            }

            if (req.data.email) {
                changes.email = req.data.email;
            }

            if (req.data.password) {
                changes.password = req.data.password;
            } 

            const position = await PositionsService.update(filter, changes);
            
            return res.json(position)
            } catch(e) {
            return res.status(400).json('Erro ao atualizar usuário.');
        }
    }
        async delete(req, res) {
            try {
                const { id } = req.filter;

                if (!id) {
                    return res.json('ID não existe')
                }

                await PositionsService.delete(id);

                return res.json(true);
            } catch(e) {
                return res.status(400).json('Erro ao deletar posição.')
            }
        }
        async show(req, res) {
            try {
                const position = await UserService.findOne(req.filter.id);
               
                return res.json(position);
            } catch (e) {
                return res.status(401).json(e.message);
            }
        }
    }

export default new PositionController();