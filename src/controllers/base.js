class BaseController {
	bindActions(actions) {
		actions.forEach(action => this[action] = this[action].bind(this));
	}

	handleResponse(response, res) {
		return res.status(200).json(response);
	};

	handleError(error, req, res, status) {
		return res.status(500).send({
			status: 'error',
			code: 500,
			message: error.message || 'Algo de errado ocorreu, por favor, tente novamente mais tarde.'
		});
	}
}

export default BaseController;
