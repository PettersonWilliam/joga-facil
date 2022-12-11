import Matchs from "../models/Matchs";
import { pick } from "lodash";
import Participants from "../models/Participants";
import MatchsParticipants from "../models/MatchsParticipants";

class MatchsService {
	async store(data) {
		const matchData = {
			...pick(data, ['date','started_at','end_at','team_amount']),
			status: 'OPEN'
		};

		return Matchs.create(matchData);
	}

	index() {
		return Matchs.findAll({
		attributes: ["id","date","status","started_at","end_at","team_amount"],
		include: {
			as: "participants",
			model: Participants
		},
		where: {
			deleted_at: null
		},
		paranoid: false
		});
	}

	async show(id) {
		const match = await Matchs.findOne({
		where: {
			id,
			deleted_at: null
		},
		paranoid: false,
		attributes: ["id","date","status","started_at","end_at","team_amount"],
		include: {
			model: Participants,
			required: false,
			as: "participants"
		}
		});

		if (!match) {
		throw new Error("partida não existente.");
		}

		return match;
	}

	async update({ filter, changes }) {
		const match = await Matchs.findOne({
		where: {
			status: "OPEN",
			deleted_at: null
		},
		paranoide: false
		});

		if (!match) {
		throw new Error("Erro ao atualizar partida");
		}

		return Matchs.update(changes, {
		where: {
			id: filter.id,
			deleted_at: null
		},
		paranoid: false
		});
	}

	async updateStatus({ filter, changes }) {
	const currentMatch = await Matchs.findOne({
		where: {
			id: filter.id,
			status: ['OPEN', 'PROGRESS']
		},
		attributes: ['status']
		});

		if (!currentMatch) { // open, progress, finished -- PRECISA TER ESSA ORDEM
		throw new Error('Não é possivel atualizar o status');
		}

		if (currentMatch.status === 'OPEN' && changes.status !== 'PROGRESS') {
		throw new Error('Não é possivel atualizar o status');
		}

		if (currentMatch.status === 'PROGRESS' && changes.status !== 'FINISHED') {
		throw new Error('Não é possivel atualizar o status');
		}

		return Matchs.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			paranoid: false
		});

	}

	async delete(id) {
		const match = await Matchs.findOne({
			where: {
				status: "OPEN",
				id
			}
		});

		if (!match) {
		throw "Nao é possivel deletar a partida";
		}

		await Matchs.destroy({
			where: {
				id,
				deleted_at: null
			},
			paranoid: false
		});

		return true;
	}
}
export default new MatchsService();
