import express from 'express';
import './database';
import Routes from './routes';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.setup();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    setup() {
        const routes = new Routes();

        this.app.use(routes.setup());
        // this.app.use('/user', userRoutes);
        // this.app.use('/matchs', matchRoutes);
        // this.app.use('/position', positionRoutes);
        // this.app.use('/participants', participantRoutes);
        // this.app.use('/matchs-participants', matchsParticipantsRoutes);
    }
};

export default new App().app;
