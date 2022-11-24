import { Router } from 'express';

import UserRoutes from './routes/userRoutes';
import PositionRoutes from './routes/positionRoutes';
import ParticipantRoutes from './routes/participantRoutes';
import MatchRoutes from './routes/matchRoutes';
import MatchsParticipantRoutes from './routes/matchsParticipantsRoutes';

 export default class Routes {
	constructor() {
		this.routes = new Router();

        this.userRoutes = new UserRoutes();
        this.matchRoutes = new MatchRoutes();
        this.positionRoutes = new PositionRoutes();
        this.participantRoutes = new ParticipantRoutes();
        this.matchsParticipantRoutes = new MatchsParticipantRoutes();
	}

	setup() {
        this.routes.use('/user', this.userRoutes.setup());
        this.routes.use('/position', this.positionRoutes.setup());
        this.routes.use('/participant', this.participantRoutes.setup());
        this.routes.use('/match', this.matchRoutes.setup());
        this.routes.use('/matchs-participants', this.matchsParticipantRoutes.setup());

		return this.routes;
	}
 }
