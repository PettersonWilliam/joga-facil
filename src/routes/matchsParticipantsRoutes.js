import BaseController from './base';
import MatchsParticipantsService from '../services/matchsParticipantsService';
import { pick } = from 'lodash';

export default class MatchsParticipantsRoutes extends BaseController {
    constructor() {
        super();

        this.matchsParticipantsSchema = MatchsParticipantsSchema();
        this.matchsParticipantsController = new MatchsParticipantsController();
    }
}
this.router.post('/', this.loginRequired, this.schemaValidator(this.matchsParticipantsSchema.store), this.matchParticipantsController.store);
this.router.get('/', this.loginRequired, this.matchParticipantsController.index);
this.router.get('/:id', this.loginRequired, this.schemaValidator(this.matchsParticipantsSchema.show), this.matchParticipantsController.show);
this.router.put('/:id', this.loginRequired, this.schemaValidator(this.matchsParticipantsSchema.update), this.matchParticipantsController.update);
this.router.delete('/:id', this.loginRequired, this.schemaValidator(this.matchsParticipantsSchema.delete), this.matchParticipantsController.delete);


return this.router;
