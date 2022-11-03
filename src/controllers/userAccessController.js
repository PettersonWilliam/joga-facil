import BaseController from "./base";
import UserAccessService from "../services/UserAccessService";

class CheckAccessController extends BaseController {
  constructor() {
    super();

    this.bindActions(["checkAccess"]);
  }

  async checkAccess(req, res) {
    try {
      const filter = {
        user_id: req.userId
      };

      const accessLog = await UserAccessService.checkAccess(filter);

      return this.handleResponse({ accessLog }, res);
    } catch (e) {
      return this.handleError(
        {
          message: "ERRO AO LOGAR USUARIO"
        },
        req,
        res
      );
    }
  }
}
export default CheckAccessController;
