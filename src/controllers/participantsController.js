import BaseController from './base';
import ParticipantsService from "../services/ParticipantsService";
import { pick } from 'lodash';

class ParticipantsController extends BaseController {
  constructor() {
    super();

    this.bindActions(['store','index','show','update','delete']);
  }
  async store(req, res) {
    try {
      const data = pick(req.data, ['name','born','number','position_id']);

      const { id, name, born, number, position_id } = await ParticipantsService.create(data);

      return res.json({ id, name, born, number, position_id });
    } catch (e) {
      return res.status(400).json("Erro ao criar o participante.");
    }
  }

  async index(req, res) {
    try {
      const participants = await ParticipantsService.index();

      return res.json(participants);
    } catch (e) {
      return res.status(400).json("Erro ao listar participantes.");
    }
  }

  async show(req, res) {
    try {
      const participant = await ParticipantsService.show(req.filter.id);

      return res.json(participant);
    } catch (e) {
      return res.status(401).json({ errors: "participante não existe" });
    }
  }

  async update(req, res) {
    try {
      const options = {
        filter: pick(req.filter, ['id']),
        changes: pick(req.data, ['name','born','number','position_id'])
        }
      const participants = await ParticipantsService.update(options);

      return res.json(participants);
    } catch (e) {
      return res.status(400).json("Erro ao atualizar paricipante.");
    }
  },

  async delete(req, res) {
    try {
      
      const { id } = req.filter;

      if (!id) {
        return res.json("ID não existe");
      }

      const userId = await ParticipantsService.delete(id);

      return res.json(userId);
    } catch (e) {
      return res.status(400).json("Erro ao deletar usuário.");
    }
  }
}

export default new ParticipantsController();
