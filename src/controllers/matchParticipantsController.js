import BaseController from './base';
import MatchsParticipantsService from "../services/MatchsParticipantsService";
import { pick } from 'lodash';

class MatchParticipantsController extends BaseController {
  constructor() {
    super();

    this.bindActions(['store','index','show','update','delete']);
  }

  async store(req, res) {
    try {
      const matchParticipants = pick(req.data, ['match_id','participant_id','is_confirmed','gols','rate']);

        await MatchsParticipantsService.create(matchParticipants);

        return this.handleResponse({ matchParticipants } , res);
    } catch (e) {
      console.log(e);
      return this.handleError({
        message: e
      },req, res);
    }
  }

  async index(req, res) {
    try {
      const matchsParticipants = await MatchsParticipantsService.index();

      return this.handleResponse({ matchsParticipants } , res);
    } catch (e) {
      return this.handleError({
        message:'Erro ao listar RELACIONAMENTO DAS partidaS COM PARTICIPANTES.'
      },req, res);
    }
  }

  async show(req, res) {
    try {
      const matchParticipant = await MatchsParticipantsService.show(
        req.filter.id
      );

      return this.handleResponse({ matchParticipant } , res);
    } catch (e) {
      return this.handleError({
        message:'RELACIONAMENTO NÃO EXISTE.'
      },req, res);
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

      return this.handleResponse( { userId } , res);
    } catch (e) {
      console.log(e,'passei aki');
      return this.handleError({
        message:'Erro ao deletar relacionamento.'
      },req, res);
    }
  }
}

export default MatchParticipantsController;
