import './database';
import cors from 'cors';
import express from 'express';
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
        this.app.use(cors());
    }

    setup() {
        const routes = new Routes();

        this.app.use(routes.setup());

    }
};

export default new App().app;
