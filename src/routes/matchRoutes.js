import { Router } from 'express';
import matchController from '../controllers/matchController';
import MatchsSchema from '../schemas/matchs';
import schemaValidator from '../middlewares/schemaValidator';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
const matchsSchema = MatchsSchema();

router.post('/', loginRequired, schemaValidator(matchsSchema.store), matchController.store);

router.get('/', loginRequired, matchController.index);

router.get('/:id', loginRequired, schemaValidator(matchsSchema.show), matchController.show);

router.put('/:id', loginRequired, schemaValidator(matchsSchema.update), matchController.update);


router.delete('/:id', loginRequired, schemaValidator(matchsSchema.delete), matchController.delete);


export default router;