import BaseController from "./base";
import PositionsService from "../services/PositionsService";
import { pick } from "lodash";

class PositionController extends BaseController {
	constructor() {
		super();

		this.bindActions(["store", "index", "show", "update", "delete"]);
	}

	async store(req, res) {
		try {
			const position = pick(req.data, ["name"]);

			const { name } = await PositionsService.create(position);

			return this.handleResponse({ name }, res);
		} catch (e) {
			return this.handleError(
				{
					message: e.message,
				},req,res);
		}
	}

	async index(req, res) {
		try {
			const position = await PositionsService.index();

			return this.handleResponse({ position }, res);
		} catch (e) {
			return this.handleError(
				{
					message: "Erro ao listar posição.",
				},req,res);
		}
	}

	async show(req, res) {
		try {
			const position = await PositionsService.show(req.filter.id);

			return this.handleResponse({ position }, res);
		} catch (e) {
			return this.handleError(
				{
					message: "Erro ao listar posição.",
				},
				req,res);
		}
	}

	async update(req, res) {
		try {
			const filter = pick(req.filter, ["id"]);
			const changes = pick(req.data, ["name", "email", "password"]);

			const position = await PositionsService.update(filter, changes);

			return this.handleResponse({ position }, res);
		} catch (e) {
			return this.handleError(
				{
					message: "Erro ao atualizar posição.",
				},
				req,res);
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.filter;

			if (!id) {
				return res.json("ID não existe");
			}

			await PositionsService.delete(id);

			return this.handleResponse(true, res);
		} catch (e) {
			return this.handleError(
				{
					message: "Erro ao deletar posição.",
				},
				req,res);
		}
	}
}
export default PositionController;
