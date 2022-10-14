import MatchsParticipantsService from "../services/MatchsParticipantsService";

class MatchParticipantsController {
  async store(req, res) {
    try {
      const matchParticipantsData = req.data;

      const { match_id, participant_id, is_confirmed, gols, rate } =
        await MatchsParticipantsService.create(matchParticipantsData);

      return res.json({ match_id, participant_id, is_confirmed, gols, rate });
    } catch (e) {
      console.log(e);
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
      const filter = {
        id: req.filter.id,
      };
      const changes = req.data;

      await MatchsParticipantsService.update(filter, changes);

      return res.json(changes);
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao atualizar matchsParticipants.");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.filter;

      if (!id) {
        return res.json("ID não existe");
      }

      const userId = await MatchsParticipantsService.delete(id);

      return res.json(userId);
    } catch (e) {
      return res.status(400).json("Erro ao deletar Matchs Participants.");
    }
  }
}

export default new MatchParticipantsController();
