import UserAccessController from '../controller/userAccessController';

const routes = express.Router();

routes.post('/amount-access-log', this.userAccessController.checkAccess);

return this.routes;