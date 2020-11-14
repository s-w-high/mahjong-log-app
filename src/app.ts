import express, { Application } from "express";
import { Middleware, ErrorHandlingMiddleware } from "./middleware/types";
import BaseController from "./services/common/controller";
import bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";
import UserController from "./services/users/controller";
import errorHandler from "./middleware/errorHandler";
import MatchLogController from "./services/matchLogs/controller";
import MatchDetailLogsController from "./services/matchDetailLogs/controller";

const path = require("path");

interface AppConfig {
  appSecret: string;
  services: BaseController[];
  port?: number;
  middleware?: Middleware[];
  errorHandlers?: ErrorHandlingMiddleware[];
}

class App {
  public static readonly DEFAULT_PORT: number = 9000;

  public readonly app: Application;
  public readonly port: number;
  public readonly appSecret: string;

  protected postStartHook: () => void;

  constructor({
    appSecret,
    port,
    middleware,
    services,
    errorHandlers,
  }: AppConfig) {
    this.appSecret = appSecret;

    this.app = express();
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.set("APP_SECRET", this.appSecret);

    this.port = port || App.DEFAULT_PORT;

    this.registerMiddleware(middleware);
    this.registerServices(services);

    this.registerErrorHandlers(errorHandlers);

    this.postStartHook = () => {
      console.log(`App listening on localhost:${this.port}`);
    };
  }

  public start(): void {
    this.app.listen(this.port, this.postStartHook);
  }

  protected registerMiddleware(
    middleware: (Middleware | ErrorHandlingMiddleware)[]
  ): void {
    middleware.forEach((_middleware) => this.app.use(_middleware));
  }

  protected registerServices(services: BaseController[]): void {
    services.forEach((_service) =>
      this.app.use(_service.path, _service.router)
    );
  }

  protected registerErrorHandlers(
    errorHandlers: ErrorHandlingMiddleware[]
  ): void {
    errorHandlers.forEach((_errorHandler) => this.app.use(errorHandlers));
  }
}

export function getDefaultApp(appSecret: string) {
  return new App({
    appSecret,
    port: 3000,
    services: [
      new UserController(),
      new MatchLogController(),
      new MatchDetailLogsController(),
    ],
    middleware: [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      loggerMiddleware,
    ],
    errorHandlers: [errorHandler],
  });
}

export default App;
