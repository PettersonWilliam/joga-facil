import BaseController from "./base";
import UserService from "../services/UserService";
import { pick } from 'lodash';

class UserController extends BaseController {
  constructor() {
    super();

    this.bindActions(['store', 'index', 'show', 'update', 'delete', 'login']);
  }

  async store(req, res) {
    try {
      const data = pick(req.data, ['name', 'password','email']);

      const { id, name, email } = await UserService.create(data);

      return this.handleResponse({ id, name, email }, res);
    } catch (error) {
      return this.handleError({
        message: 'Erro ao criar usuário.'
      }, req, res);
    }
  }

  async index(req, res) {
    try {
      const user = await UserService.index();

      return this.handleResponse({ user }, res);
    } catch (error) {
      return this.handleError({
        message: 'Erro ao listar usuário.'
      }, req, res);
    }
  }

  async show(req, res) {
    try {
      const user = await UserService.show(req.filter.id);

      return this.handleResponse({ user }, res);
    } catch (error) {
      return this.handleError({
        message: 'Erro ao listar usuário.'
      }, req, res);
    }
  }

  async update(req, res) {
    try {
      const filter =  pick(req.filter,['id']);
      const changes = pick(req.data, ['name', 'email']);

      const user = await UserService.update(filter, changes);

      return this.handleResponse({ user }, res);
    } catch (error) {
      return this.handleError({
        message: 'Erro ao atualizar usuário.'
      }, req, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.filter;

      const userId = await UserService.delete(id);

      return this.handleResponse({ userId }, res);
    } catch (error) {
      return this.handleError({
        message: 'Erro ao deletar usuário.'
      }, req, res);
    }
  }

  async login(req, res) {
    try {
      const data = pick(req.data, ['email', 'password'])

      const token = await UserService.login(data);

      return this.handleResponse({ token }, res);
    } catch (error) {
      return this.handleError(error, req, res);
    }
  }
}

export default UserController;

