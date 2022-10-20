class BaseController {
	bindActions(actions) {
		actions.forEach(action => this[action] = this[action].bind(this));
	}

	handleError(error, req, res) {
		res.status(500).json({
			status: 'error',
			code: 500,
			message: error.message || 'Algo de errado ocorreu, por favor, tente novamente.'
		});
	}

	handleResponse(data, res) {
		return res.status(200).json({
			status: 'success',
			data: data
		});
	}
}

export default BaseController;