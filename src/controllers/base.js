class BaseController {
	bindActions(actions) {
		actions.forEach(action => this[action] = this[action].bind(this));
	}
	handleResponse(data, res) {
		return res.status(200).json({
			status: 'sucess',
			data: data
		});
	};

	handleError(error, req, res) {
		res.status(500).json({
			status: 'error',
			code: 500,
			message: error.message || 'Algo de errado ocorreu, por favor, tente novamente mais tarde.'
		});
	}
}

export default BaseController;