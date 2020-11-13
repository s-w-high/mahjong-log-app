import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import MatchLogManager from "./manager";
import BaseController from "../common/controller";

class MatchLogController extends BaseController {
  public path: string = "/api/match-logs";
  public router: Router;

  protected manager: MatchLogManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new MatchLogManager();
  }

  protected createRouter(): Router {
    const router = Router();

    router.get("/:userName", this.get);
    router.get("/", this.get);
    router.post("/", this.post);
    router.patch("/:userName", this.patch);
    router.delete("/", this.delete);
    router.delete("/:userName", this.delete);

    return router;
  }

  // protected get = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     if (!req.params.userName) {
  //       const user = await this.manager.getAllUser();
  //       let resultUser = [];
  //       _.pick(
  //         user.forEach((user) => {
  //           resultUser.push(_.pick(user, ["id", "username", "email"]));
  //         })
  //       );
  //       res.json(resultUser);
  //     } else {
  //       const { userName } = req.params;
  //       const user = await this.manager.getUser(userName);
  //       if (!user) {
  //         res.status(404).send({ error: "user not found" });
  //         return;
  //       }
  //       res.json(_.pick(user, ["id", "username", "email"]));
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  // protected post = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     const userDetails = req.body;
  //     const user = await this.manager.createUser(userDetails);

  //     res.status(201).json(_.pick(user, ["id", "username"]));
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  // protected patch = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     const { userName } = req.params;
  //     const newUserDetails = req.body;

  //     const updatedUser = await this.manager.updateUser(
  //       userName,
  //       newUserDetails
  //     );

  //     res.json(_.pick(updatedUser, ["id", "username"]));
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  // protected delete = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   const { userName } = req.params;

  //   try {
  //     await this.manager.removeUser(userName);
  //     res.status(200).end();
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}

export default MatchLogController;
