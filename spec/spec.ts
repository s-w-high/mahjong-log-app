import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Application } from "express";
import { getRepository, Repository, Not, IsNull } from "typeorm";
import { v4 as uuid4 } from "uuid";
import DatabaseConnectionManager from "../src/database";
import { getDefaultApp } from "../src/app";
import User from "../src/entities/User";

chai.use(chaiHttp);
const expect = chai.expect;

describe("The express server", () => {
  const APP_SECRET = "xxxyyyxxxyyy";
  const TEST_USER_ID = "3461cac2-35bd-4d45-a163-f220beb43d76";
  const TEST_ACCOUNT_ID = "655f6179-543f-45e7-a4ae-69bd9f179c52";

  let app: Application;
  let userRepo: Repository<User>;

  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  before(async () => {
    await DatabaseConnectionManager.connect();
    app = getDefaultApp(APP_SECRET).app;
    userRepo = getRepository(User);
  });

  after(async () => {
    await userRepo.delete({ id: Not(IsNull()) });
  });

  beforeEach(async () => {
    let testUser = new User();
    testUser.id = TEST_USER_ID;
    testUser.username = "sakai";
    testUser = await userRepo.save(testUser);
  });

  describe("Mahjong App", () => {
    describe("Get /hello sample test", () => {
      it("return world", async () => {
        const res = await request.get("/users");
        res.should.have.status(200);
      });
    });
  });
});
