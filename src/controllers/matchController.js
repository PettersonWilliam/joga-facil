import MatchsService from "../services/MatchsService";
import { pick } from 'lodash'; 

class MatchController {
  async store(req, res) {
    try {
      const matchCreated = await MatchsService.create(req.data);

      const novoObjeto = pick(matchCreated, ['id', 'date', 'status', 'started_at', 'end_at', 'team_amount']); //  aplicar ao meu codigo lodash pick

      return res.json(novoObjeto);
    } catch (e) {
      return res.status(400).json("Erro ao criar partida.");
    }
  }

  async index(req, res) {
    try {
      const matchs = await MatchsService.index();

      return res.json(matchs);
    } catch (e) {
      return res.status(400).json("Erro ao listar partidas.");
    }
  }

  async show(req, res) {
    try {
      const match = await MatchsService.show(req.filter.id);

      return res.json(match);
    } catch (e) {

      return res.status(401).json({ errors: "partida não existe" });
    }
  }

  async update(req, res) {
    try {
      const filter = pick(req.filter,['id']);
      const changes = pick(req.data, ['date', 'status','started_at', 'end_at', 'team_amount']);

      const options = { filter, changes };

      const matchs = await MatchsService.update(options);
      return res.json(matchs);
    } catch (e) {
      return res.status(400).json("Erro ao atualizar partida.");
    }
  }

  async delete(req, res) {
    try {
      // const { id } = req.filter;
      const filter =  pick(req.filter, ['id'])

      const userId = await MatchsService.delete(id);

      return res.json(userId);
    } catch (e) {
      return res.status(400).json("Erro ao deletar partida.");
    }
  }
}

export default new MatchController()