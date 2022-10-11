import MatchsService from '../services/MatchsService';

class MatchController {
    async store(req, res) {
        try {
            const matchData = req.data;

            const { id, date, status, started_at, end_at, team_amount } = await MatchsService.create(matchData);

            return res.json({ id, date, status, started_at, end_at, team_amount });
        } catch (e) {
            return res.status(400).json('Erro ao criar partida.');
        }
    }

    async index(req, res) {
        try {
            const matchs = await MatchsService.index();
                
            return res.json(matchs)
        } catch(e) {
            return res.status(400).json('Erro ao listar partidas.');
        }
    }

    async show(req, res) {
        try {
            const match = await MatchsService.show(req.filter.id);
           
            return res.json(match);
        } catch (e) {
            console.log(e);

            return res.status(401).json({ errors: 'partida não existe' });
        }
    }     
    
    async update(req, res) {
        try {
            const options = {
                filter: {
                    id: req.filter.id
                },
                changes: req.data
            }

            const matchs = await MatchsService.update(options);
            
            return res.json(matchs)
        } catch(e) {
            return res.status(400).json('Erro ao atualizar partida.');
            }
    }

    async delete(req, res) {
        try {
            const { id } = req.filter;

            if (!id) {
                return res.json('ID não existe')
            }

            const userId = await MatchsService.delete(id);

            return res.json(userId);
        }   catch(e) {
                return res.status(400).json('Erro ao deletar usuário.');
        }
    }

};

export default new MatchController();
