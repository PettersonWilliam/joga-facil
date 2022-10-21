import BaseController from "./base";
import UserService from "../services/UserService";
import { pick } from 'lodash';

class UserController extends BaseController {
  constructor() {
    super();

    this.bindActions(['store','index','show','update','delete','login']);

    // this.store = this.store.bind(this);
    // this.index = this.index.bind(this);
    // this.show = this.show.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);
    // this.login = this.login.bind(this);
  }

  async store(req, res) {
    try {
      const data = pick(req.data, ['name', 'password','email']);

      const { id, name, email } = await UserService.create(data);

      return this.handleResponse({ id, name, email }, res);
    } catch (e) {
      return this.handleError({
        message: 'Erro ao criar usuário.'
      }, req, res);
    }
  }

  async index(req, res) {
    try {
      const user = await UserService.index();

      return res.json(user);
    } catch (e) {
      return res.status(400).json("Erro ao listar usuário.");
    }
  }

  async show(req, res) {
    try {
      const user = await UserService.show(req.filter.id);

      return res.json(user);
    } catch (e) {
      return res.status(401).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const filter =  pick(req.filter,['id']);
      const changes = pick(req.data, ['name', 'email']);

      const user = await UserService.update(filter, changes);

      return res.json(user);
    } catch (e) {
      return res.status(400).json("Erro ao atualizar usuário.");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.filter;

      const userId = await UserService.delete(id);

      return res.json(userId);
    } catch (e) {
      return res.status(400).json("Erro ao deletar usuário.");
    }
  }

  async login(req, res) {
    try {
      const data = pick(req.data, ['password','email'])

      const token = await UserService.login(data);

      return res.json(token);
    } catch (e) {
      return res.status(401).json("Dados inválidos");
    }
  }
  
}

export default UserController;
