import amountUserAccessController from '../controller/amountUserAccessController';

const routes = express.Router();

routes.post('/amount-access-log', this.amountUserAccessController.checkAccess);

return this.routes;