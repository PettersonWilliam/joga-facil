import MatchsParticipantsService from "../services/MatchsParticipantsService";
import { pick } from 'lodash';

class MatchParticipantsController {
  async store(req, res) {
    try {
      const matchParticipants = pick(req.data, ['match_id','participant_id','is_confirmed','gols','rate']);

        await MatchsParticipantsService.create(matchParticipants);

      return res.json(matchParticipants);
    } catch (e) {
      return res.status(400).json("Erro ao criar RELACIONAMENTO.");
    }
  }

  async index(req, res) {
    try {
      const matchsParticipants = await MatchsParticipantsService.index();

      return res.json(matchsParticipants);
    } catch (e) {
      return res.status(400).json("Erro ao listar TodosRELACIONAMENTOS.");
    }
  }

  async show(req, res) {
    try {
      const matchParticipant = await MatchsParticipantsService.show(
        req.filter.id
      );

      return res.json(matchParticipant);
    } catch (e) {
      return res.status(400).json({ errors: "ID DO RELACINAMENTO NÃO EXISTE" });
    }
  }

  async update(req, res) {
    try {
      const options = {
       filter: pick(req.filter,['id']),
       changes: pick(req.data,['match_id','participant_id','is_confirmed','gols','rate'])
      }

      await MatchsParticipantsService.update(options);


      return res.json(true);
    } catch (e) {
      console.log(e)
      return res.status(400).json("Erro ao atualizar matchsParticipants.");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.filter;

      if (!id) {
        return res.json("nao exite nenhuma partida vinculada ao participante");
      }

      const userId = await MatchsParticipantsService.delete(id);

      return res.json(userId);
    } catch (e) {
      return res.status(400).json("Error, Matchs Participants nao existe.");
    }
  }
}

export default new MatchParticipantsController();
