import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import MatchLogManager from "./manager";
import BaseController from "../common/controller";

class MatchLogController extends BaseController {
  public path: string = "/api";
  public router: Router;

  protected manager: MatchLogManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new MatchLogManager();
  }

  protected createRouter(): Router {
    const router = Router();

    router.get("/match-logs", this.get);
    router.get("/users/:userId/match-logs", this.get);
    router.get("/users/:userId/match-logs/:matchId", this.get);
    router.post("/users/:userId/match-logs", this.post);
    router.patch("/match-logs/:matchId", this.patch);
    router.delete("/match-logs/:matchId", this.delete);

    return router;
  }

  protected get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.params.userId && !req.params.matchId) {
        const matchLogs = await this.manager.getAllMatchLog();
        if (!matchLogs) {
          res.status(404).send({ error: "matchLogs not found" });
          return;
        }
        res.json(matchLogs);
      } else if (req.params.userId && !req.params.matchId) {
        const userId = req.params.userId;
        const matchLogs = await this.manager.getMatchLogByUser(userId);
        if (!matchLogs) {
          res.status(404).send({ error: "matchLogs not found" });
          return;
        }
        res.json(matchLogs);
      } else {
        const userId = req.params.userId;
        const matchId = req.params.matchId;
        const matchLogs = await this.manager.getMatchLogByUserAndMatch(
          userId,
          matchId
        );
        if (!matchLogs) {
          res.status(404).send({ error: "matchLogs not found" });
          return;
        }
        res.json(matchLogs);
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
      const details = req.body;
      const match = await this.manager.createMatchLog(details);

      res.statusCode = 201;
      res.end();
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
      const matchId = req.params.matchId;
      const newMatchLogDetails = req.body;

      const updatedMatch = await this.manager.updateMatchLog(
        matchId,
        newMatchLogDetails
      );

      res.statusCode = 200;
      res.end();
    } catch (err) {
      next(err);
    }
  };

  protected delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const matchId = req.params.matchId;
    try {
      await this.manager.removeMatchLogByMatch(matchId);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  };
}

export default MatchLogController;
