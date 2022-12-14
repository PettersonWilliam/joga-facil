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
        this.router.get('/top-3-gol',this.loginRequired, this.ParticipantsController.top3gols);
        this.router.get('/top-3-rate',this.loginRequired, this.ParticipantsController.top3Rate);
        this.router.post('/',this.loginRequired, this.SchemaValidator(this.participantsSchema.store), this.ParticipantsController.store);
        this.router.get('/',this.loginRequired, this.ParticipantsController.index);
        this.router.get('/:id',this.loginRequired, this.SchemaValidator(this.participantsSchema.show), this.ParticipantsController.show);
        this.router.put('/:id',this.loginRequired, this.SchemaValidator(this.participantsSchema.update), this.ParticipantsController.update);
        this.router.delete('/:id',this.loginRequired, this.SchemaValidator(this.participantsSchema.delete), this.ParticipantsController.delete);

        return this.router;
    }
}
