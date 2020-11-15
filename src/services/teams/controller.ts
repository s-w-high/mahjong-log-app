import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import TeamManager from "./manager";
import BaseController from "../common/controller";

class TeamController extends BaseController {
  public path: string = "/api/teams";
  public router: Router;

  protected manager: TeamManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new TeamManager();
  }

  protected createRouter(): Router {
    const router = Router();

    router.get("/", this.get);
    router.get("/:teamId", this.get);
    router.post("/", this.post);
    router.patch("/:teamId", this.patch);
    router.delete("/:teamId", this.delete);

    return router;
  }

  protected get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.params.teamId) {
        const team = await this.manager.getAllTeam();
        res.json(team);
      } else {
        const team = await this.manager.getTeam(req.params.teamId);
        if (!team) {
          res.status(404).send({ error: "team not found" });
          return;
        }
        res.json(team);
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
      const teamDetails = req.body;
      await this.manager.createTeam(teamDetails);

      res.status(201).end();
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
      const teamId = req.params.teamId;
      const newTeamDetails = req.body;
      await this.manager.updateTeam(teamId, newTeamDetails);

      res.status(200).end();
    } catch (err) {
      next(err);
    }
  };

  protected delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const teamId = req.params.teamId;

    try {
      await this.manager.removeTeam(teamId);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  };
}

export default TeamController;
