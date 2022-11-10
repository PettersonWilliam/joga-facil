import BaseRoutes from './base';
import MatchsParticipantsSchema from '../schemas/matchsParticipants'
import MatchsParticipantsController from '../controllers/matchParticipantsController'

export default class MatchsParticipantsRoutes extends BaseRoutes {
    constructor() {
        super();

        this.matchsParticipantsSchema = MatchsParticipantsSchema();
        this.matchsParticipantsController = new MatchsParticipantsController();
    }

    setup() {
        this.router.get('/', this.loginRequired, this.matchsParticipantsController.index);

        this.router.post('/',  this.loginRequired, this.SchemaValidator(this.matchsParticipantsSchema.store), this.matchsParticipantsController.store);

        this.router.get('/:id', this.loginRequired, this.SchemaValidator(this.matchsParticipantsSchema.show), this.matchsParticipantsController.show);

        this.router.put('/:id', this.loginRequired, this.SchemaValidator(this.matchsParticipantsSchema.update), this.matchsParticipantsController.update);

        this.router.put('/is-confirmed/:id', this.loginRequired, this.SchemaValidator(this.matchsParticipantsSchema.updateIsConfirmed), this.matchsParticipantsController.update);

        this.router.delete('/:id', this.loginRequired, this.SchemaValidator(this.matchsParticipantsSchema.delete), this.matchsParticipantsController.delete);

        return this.router;
    }
}
