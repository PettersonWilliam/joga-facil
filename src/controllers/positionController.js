import BaseController from "./base";
import PositionsService from "../services/PositionsService";
import { pick } from 'lodash';

class PositionController extends BaseController {
  constructor() {
    super();

    this.bindActions(['store','index','show','update','delete']);
  }

  async store(req, res) {
    try {
      const position = pick(req.data, ['name']);

      const { name } = await PositionsService.create(position)

      return this.handleResponse({ name } , res);
    } catch (e) {
      return this.handleError({
        message:'Erro ao criar posição.'
      },req, res);
    }
  }

  async index(req, res) {
    try {
      const position = await PositionsService.index();

      return res.json(position);
    } catch (e) {
      return res.status(400).json("Erro ao listar posição.");
    }
  }

  async show(req, res) {
    try {
      const position = await PositionsService.show(req.filter.id);

      return res.json(position);
    } catch (e) {
      return res.status(401).json("erro ao listar posição desejada ");
    }
  }

  async update(req, res) {
    try {
      const filter =  pick(req.filter, ['id']);
      const changes =  pick(req.data, ['name', 'email', 'password']);

      const position = await PositionsService.update(filter, changes);

      return res.json(position);
    } catch (e) {
      return res.status(400).json("Erro ao atualizar Posição.");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.filter;

      if (!id) {
        return res.json("ID não existe");
      }

      await PositionsService.delete(id);

      return res.json(true);
    } catch (e) {
      return res.status(400).json("Erro ao deletar posição.");
    }
  }
}

export default PositionController;
