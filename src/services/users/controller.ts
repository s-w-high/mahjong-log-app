import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import UserManager from "./manager";
import BaseController from "../common/controller";

class UserController extends BaseController {
  public path: string = "/api/users";
  public router: Router;

  protected manager: UserManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new UserManager();
  }

  protected createRouter(): Router {
    const router = Router();

    router.get("/:userName", this.get);
    router.get("/", this.get);
    router.post("/", this.post);
    router.patch("/:userName", this.patch);
    router.delete("/:userName", this.delete);

    return router;
  }

  protected get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.params.userName) {
        const user = await this.manager.getAllUser();
        res.json(user);
      } else {
        const { userName } = req.params;
        const user = await this.manager.getUser(userName);
        if (!user) {
          res.status(404).send({ error: "user not found" });
          return;
        }

        res.json(_.pick(user, ["id", "username", "email"]));
      }
    } catch (err) {
      next(err);
    }
  };

  protected post = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userDetails = req.body;
      const user = await this.manager.createUser(userDetails);

      res.status(201).json(_.pick(user, ["id", "username"]));
    } catch (err) {
      next(err);
    }
  };

  protected patch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const newUserDetails = req.body;
      const updatedUser = await this.manager.updateUser(userId, newUserDetails);

      res.json(_.pick(updatedUser, ["id", "username"]));
    } catch (err) {
      next(err);
    }
  };

  protected delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req.params;

    try {
      await this.manager.removeUser(userId);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
