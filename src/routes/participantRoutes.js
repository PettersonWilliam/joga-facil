import BaseRoutes from './base';
import ParticipantSchema from '../schemas/participants';
import ParticipantsController from '../controllers/participantsController';

export default class ParticipantsRoutes extends BaseRoutes {
    constructor() {
        super();

        this.participantsSchema = ParticipantSchema();

        this.ParticipantsController = new ParticipantsController();
    }


    setup() {

        this.router.post('/', this.SchemaValidator(this.participantsSchema.store), this.ParticipantsController.store);
        this.router.get('/', this.ParticipantsController.index);
        this.router.get('/:id', this.SchemaValidator(this.participantsSchema.show), this.ParticipantsController.show);
        this.router.put('/:id', this.SchemaValidator(this.participantsSchema.update), this.ParticipantsController.update);
        this.router.delete('/:id', this.SchemaValidator(this.participantsSchema.delete), this.ParticipantsController.delete);

        return this.router;
    }
}
