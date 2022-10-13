import { Router } from 'express';
import PositionController from '../controllers/positionController';
import PositionSchema from '../schemas/position';
import schemaValidator from '../middlewares/schemaValidator';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
const positionSchema = PositionSchema();

router.post('/',loginRequired, schemaValidator(positionSchema.store), PositionController.store);
router.get('/', loginRequired, PositionController.index);
router.get('/:id', loginRequired, schemaValidator(positionSchema.show), PositionController.show);
router.put('/:id', loginRequired, schemaValidator(positionSchema.update), PositionController.update);
router.delete('/:id', loginRequired, schemaValidator(positionSchema.delete), PositionController.delete);

export default router;