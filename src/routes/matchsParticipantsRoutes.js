import { Router } from 'express';
import matchParticipantsController from '../controllers/matchParticipantsController';
import MatchsParticipantSchema from '../schemas/matchsParticipants';
import schemaValidator from '../middlewares/schemaValidator';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
const matchsParticipantsSchema = MatchsParticipantSchema();

router.post('/', loginRequired, schemaValidator(matchsParticipantsSchema.store), matchParticipantsController.store);

router.get('/', loginRequired, matchParticipantsController.index);

router.get('/:id', loginRequired, schemaValidator(matchsParticipantsSchema.show), matchParticipantsController.show);

router.put('/:id', loginRequired, schemaValidator(matchsParticipantsSchema.update), matchParticipantsController.update);


router.delete('/:id', loginRequired, schemaValidator(matchsParticipantsSchema.delete), matchParticipantsController.delete);


export default router;
