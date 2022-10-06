import express from 'express';

import './database';
import userRoutes from './routes/userRoutes';
import positionRoutes from './routes/positionRoutes';
import participantRoutes from './routes/participantRoutes';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/users', userRoutes);
        this.app.use('/position', positionRoutes);
        this.app.use('/participants', participantRoutes);
    }
};

export default new App().app;
