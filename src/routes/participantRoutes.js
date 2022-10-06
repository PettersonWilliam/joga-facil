import { Router } from 'express';
import ParticipantsController from '../controllers/participantsController';
import ParticipantsSchema from '../schemas/participants';
import schemaValidator from '../middlewares/schemaValidator';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
const participantsSchema = ParticipantsSchema();

router.post('/', loginRequired, schemaValidator(participantsSchema.store), ParticipantsController.store);
router.get('/', loginRequired, schemaValidator(participantsSchema.index), ParticipantsController.index);
router.put('/:id', loginRequired, schemaValidator(participantsSchema.update), ParticipantsController.update);
router.delete('/:id', loginRequired, schemaValidator(participantsSchema.delete), ParticipantsController.delete);


export default router;