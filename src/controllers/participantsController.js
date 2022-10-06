import ParticipantsService from '../services/ParticipantsService';

class PartcipantsController {
    async store(req, res) {
        try {
            const participants = {
                name: req.data.name,
                born: req.data.born,
                number: req.data.number,
                position_id: req.data.position_id
            };

            const { id, name, born, number, position_id} = await ParticipantsService.create(participants);

            return res.json({ id, name, born, number, position_id });
        } catch (e) {
            return res.status(400).json('Erro ao criar o participante.');
        }
    },
    async index(req, res) {
        try {
            const participants = await ParticipantsService.index();
                
            return res.json(participants)
        } catch(e) {
            return res.status(400).json('Erro ao listar participantes.');
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

            const participants = await ParticipantsService.update(filter, changes);
            
            return res.json(participants)
        } catch(e) {
            return res.status(400).json('Erro ao atualizar paricipante.');
            }
    }
    async delete(req, res) {
        try {
            const { id } = req.filter;

            if (!id) {
                return res.json('ID não existe')
            }

            const userId = await ParticipantsService.delete(id);

            return res.json(userId);
        }   catch(e) {
                return res.status(400).json('Erro ao deletar usuário.');
            }
    }     
};

export default new PartcipantsController();
