import BaseRoutes from './base';
import UserSchema from '../schemas/user';
import UserController from '../controllers/userController';

export default class UserRoutes extends BaseRoutes {
	constructor() {
		super();

			this.userSchema = UserSchema();
			this.userController = new UserController();
	}

	setup() {
		this.router.get('/', this.loginRequired, this.userController.index);

		this.router.post('/login', this.SchemaValidator(this.userSchema.login), this.userController.login);

		this.router.post('/', this.SchemaValidator(this.userSchema.store), this.userController.store);

		this.router.get('/:id', this.loginRequired,this.SchemaValidator(this.userSchema.show), this.userController.show);

		this.router.put('/:id', this.loginRequired, this.SchemaValidator(this.userSchema.update), this.userController.update);

		this.router.delete('/:id', this.loginRequired, this.SchemaValidator(this.userSchema.delete), this.userController.delete);

	    return this.router;

	}
}
