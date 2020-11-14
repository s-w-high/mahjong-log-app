import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import MatchDetailLogManager from "./manager";
import BaseController from "../common/controller";

class MatchDetailLogsController extends BaseController {
  public path: string = "/api";
  public router: Router;

  protected manager: MatchDetailLogManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new MatchDetailLogManager();
  }

  protected createRouter(): Router {
    const router = Router();

    router.get("/match-detail-logs", this.get);
    router.get("/users/:userId/match-detail-logs", this.get);
    router.get("/match/:matchId/match-detail-logs", this.get);
    // router.post("/", this.post);
    // router.patch("/:userName", this.patch);
    // router.delete("/", this.delete);
    // router.delete("/:userName", this.delete);

    return router;
  }

  // protected get = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     if (!req.params.userId && !req.params.matchId) {
  //       const matchDetailLog = await this.manager.getAllMatchDetailLog();
  //       res.json(matchDetailLog);
  //     } else if (req.params.userId) {
  //       const userId = req.params.userId;
  //       const matchDetailLog = await this.manager.getByUserId(userId);
  //       if (!matchDetailLog) {
  //         res.status(404).send({ error: "matchDetailLog not found" });
  //         return;
  //       }
  //       res.json(matchDetailLog);
  //     } else if (req.params.matchId) {
  //       const matchId = req.params.matchId;
  //       const matchDetailLog = await this.manager.getByMatchId(matchId);
  //       if (!matchDetailLog) {
  //         res.status(404).send({ error: "matchDetailLog not found" });
  //         return;
  //       }
  //       res.json(matchDetailLog);
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

export default MatchDetailLogsController;
