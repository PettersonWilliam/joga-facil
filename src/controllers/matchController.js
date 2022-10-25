import BaseController from './base';
import MatchsService from "../services/MatchsService";
import { pick } from 'lodash';

  class MatchController extends BaseController {
  constructor() {
    super();

    this.bindActions(['store','index','show','update','delete']);
    }

    async store(req, res) {
        try {          
          const matchCreated = await MatchsService.store(req.data);

          const novoObjeto = pick(matchCreated, ['id', 'date', 'status', 'started_at', 'end_at', 'team_amount']); 
          return this.handleResponse({ novoObjeto } , res);
        } catch (e) {
          return this.handleError({
            message:'Erro ao criar partida.'
          },req, res);
        }
    }

      async index(req, res) {
        try {
          const matchs = await MatchsService.index();

          return this.handleResponse({ matchs } , res);
        } catch (e) {
          return this.handleError({
            message:'Erro ao listar partida.'
          },req, res);
        }
    }

      async show(req, res) {
        try {
          const match = await MatchsService.show(req.filter.id);

          return this.handleResponse({ match } , res);
        } catch (e) {
          return this.handleError({
            message:'Erro ao listar partida.'
          },req, res);
        }
      }

      async update(req, res) {
        try {
          const filter = pick(req.filter,['id']);
          const changes = pick(req.data, ['date', 'status','started_at', 'end_at', 'team_amount']);

          const options = { filter, changes };

          const matchs = await MatchsService.update(options);
          return this.handleResponse({ matchs } , res);
        } catch (e) {
          return this.handleError({
            message:'Erro ao atualizar partida.'
          },req, res);
        }
      }

      async delete(req, res) {
        try {
          const filter =  pick(req.filter, ['id'])

          const userId = await MatchsService.delete(filter.id);

          return this.handleResponse( { filter } , res);
        } catch (e) {
          return this.handleError({
            message:'Erro ao deletar partida.'
          },req, res);
        }
      }
  }

export default MatchController;