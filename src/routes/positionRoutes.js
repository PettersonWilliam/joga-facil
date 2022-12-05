import BaseRoutes from './base';
import PositionSchema from '../schemas/position';
import PositionController from '../controllers/positionController';

export default class PositionRoutes extends BaseRoutes {
    constructor() {
        super();

        this.positionSchema = PositionSchema();

        this.positionController = new PositionController();
    }

    setup() {
        this.router.get('/', this.positionController.index);
        this.router.post('/', this.SchemaValidator(this.positionSchema.store), this.positionController.store);
        this.router.get('/:id', this.SchemaValidator(this.positionSchema.show), this.positionController.show);
        this.router.put('/:id', this.SchemaValidator(this.positionSchema.update), this.positionController.update);
        this.router.delete('/:id', this.SchemaValidator(this.positionSchema.delete), this.positionController.delete);


        return this.router;
    }
}
