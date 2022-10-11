import MatchsParticipantsService from '../services/MatchsParticipantsService';

class MatchParticipantsController {
    async store(req, res) {
        try {
            const matchParticipantsData = req.data;

            const { match_id, participant_id, is_confirmed, gols, rate } = await MatchsParticipantsService.create(matchParticipantsData);

            return res.json({ match_id, participant_id, is_confirmed, gols, rate });
        } catch (e) {
            return res.status(400).json('Erro ao criar RELACIONAMENTO.');
        }
    }

    async index(req, res) {
        try {
            const matchsParticipants = await MatchsParticipantsService.index();
                
            return res.json(matchsParticipants)
        } catch(e) {
            console.log(e);
            return res.status(400).json('Erro ao listar TodosRELACIONAMENTOS.');
        }
    }

    // async show(req, res) {
    //     try {
    //         const match = await MatchsService.show(req.filter.id);
           
    //         return res.json(match);
    //     } catch (e) {
    //         return res.status(401).json({ errors:  'partida não existe' });
    //     }
    // }     
    
    // async update(req, res) {
    //     try {
    //         const options = {
    //             filter: {
    //                 id: req.filter.id
    //             },
    //             changes: req.data
    //         }

    //         const matchs = await MatchsService.update(options);
            
    //         return res.json(matchs)
    //     } catch(e) {
    //         return res.status(400).json('Erro ao atualizar partida.');
    //         }
    // }

    // async delete(req, res) {
    //     try {
    //         const { id } = req.filter;

    //         if (!id) {
    //             return res.json('ID não existe')
    //         }

    //         const userId = await MatchsService.delete(id);

    //         return res.json(userId);
    //     }   catch(e) {
    //             return res.status(400).json('Erro ao deletar usuário.');
    //     }
    // }

};

export default new MatchParticipantsController();
