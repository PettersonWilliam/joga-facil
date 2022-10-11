import { Router } from 'express';
import matchParticipantsController from '../controllers/matchParticipantsController';
import MatchsParticipantSchema from '../schemas/matchsParticipants';
import schemaValidator from '../middlewares/schemaValidator';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
const matchsParticipantsSchema = MatchsParticipantSchema();

router.post('/', loginRequired, schemaValidator(matchsParticipantsSchema.store), matchParticipantsController.store);

router.get('/', loginRequired, matchParticipantsController.index);

// router.get('/:id', loginRequired, schemaValidator(matchsSchema.show), matchController.show);

// router.put('/:id', loginRequired, schemaValidator(matchsSchema.update), matchController.update);


// router.delete('/:id', loginRequired, schemaValidator(matchsSchema.delete), matchController.delete);


export default router;