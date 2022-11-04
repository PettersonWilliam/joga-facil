import BaseRoutes from "./base";
import MatchSchema from "../schemas/matchs";
import MatchController from "../controllers/matchController";

export default class MatchRoutes extends BaseRoutes {
  constructor() {
    super();

    this.matchSchema = MatchSchema();
    this.matchController = new MatchController();
  }

  setup() {
    this.router.post("/", this.loginRequired, this.SchemaValidator(this.matchSchema.store),this.matchController.store);

    this.router.get("/",  this.loginRequired,  this.matchController.index);

    this.router.get("/:id", this.loginRequired, this.SchemaValidator(this.matchSchema.show),this.matchController.show);

    this.router.put("/:id", this.loginRequired, this.SchemaValidator(this.matchSchema.update),this.matchController.update);

    this.router.put("/status/:id", this.loginRequired, this.SchemaValidator(this.matchSchema.updateStatus),this.matchController.updateStatus); //

    this.router.delete("/:id",this.SchemaValidator(this.matchSchema.delete),this.matchController.delete);

    return this.router;
  }
}
