import { Router } from 'express';
import UserController from '../controllers/userController';
import UserSchema from '../schemas/user';
import schemaValidator from '../middlewares/schemaValidator';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
const userSchema = UserSchema();
const userController = new UserController();

router.post('/', schemaValidator(userSchema.store), userController.store);

router.post('/login', schemaValidator(userSchema.login), userController.login);

router.get('/', loginRequired, userController.index);

router.get('/:id', loginRequired,schemaValidator(userSchema.show), userController.show);

router.put('/:id', loginRequired, schemaValidator(userSchema.update), userController.update);

router.delete('/:id', loginRequired, schemaValidator(userSchema.delete), userController.delete);

export default router;
