import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import SchemaValidator from '../middlewares/schemaValidator';

class BaseRoutes {
	constructor() {
		this.router = new Router();

		this.loginRequired = loginRequired;
		this.SchemaValidator = SchemaValidator;
	}
}

export default BaseRoutes;