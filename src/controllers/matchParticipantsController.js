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
      const matchParticipant = await MatchsParticipantsService.show(req.filter.id);

      return this.handleResponse({ matchParticipant } , res);
    } catch (e) {
      return this.handleError({
        message:'RELACIONAMENTO DA PARTIDA AO PARTICIPANTE NÃO EXISTE.'
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


      return this.handleResponse({ options } , res);
    } catch (e) {
      return this.handleError({
        message:'Erro ao atualizar os participantes da partida.'
      },req, res);
    }
  }

  async updateIsConfirmed(req,res) {
    try {
      const filter = pick(req.filter, ['id']);
      const changes = pick(req.data, ["is_confirmed"]);

	  const options = {
		filter: filter,
		changes: changes
	};

	  const matchParticipant = await MatchParticipantsService.update(options);

	  return handleResponse({matchParticipant}, res);
    }catch(e) {
      return this.handleError({
        message: "Erro ao atualizar a confirmação da Partida"
      },req,res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.filter;

      const userId = await MatchsParticipantsService.delete(id);

      return this.handleResponse( { userId } , res);
    } catch (e) {
      return this.handleError({
        message:'Erro ao deletar relacionamento de um participante a uma partida.'
      },req, res);
    }
  }
}

export default MatchParticipantsController;
