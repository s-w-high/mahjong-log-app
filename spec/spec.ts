import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Application } from "express";
import { getRepository, Repository, Not, IsNull } from "typeorm";
import { v4 as uuid4 } from "uuid";
import DatabaseConnectionManager from "../src/database";
import { getDefaultApp } from "../src/app";
import User from "../src/entities/User";
import testUserData from "../spec/mockData/users.json";

chai.use(chaiHttp);
const expect = chai.expect;

describe("The express server", () => {
  const APP_SECRET = "xxxyyyxxxyyy";
  const TEST_USER_ID = "3461cac2-35bd-4d45-a163-f220beb43d76";

  let app: Application;
  let userRepo: Repository<User>;

  let request;
  let tearDownRequest;
  beforeEach(() => {
    request = chai.request(app);
    tearDownRequest = chai.request(app);
  });

  before(async function() {
    this.timeout(1000000000);
    await DatabaseConnectionManager.connect();
    app = getDefaultApp(APP_SECRET).app;
    userRepo = getRepository(User);
  });

  // after(async () => {
  //   await userRepo.delete({ id: Not(IsNull()) });
  // });

  // beforeEach(async () => {
  //   let testUser = new User();
  //   testUser.id = TEST_USER_ID;
  //   testUser.username = "sakai";
  //   testUser = await userRepo.save(testUser);
  // });

  describe("Mahjong App", () => {
    describe("users test", () => {
      it("GET /api/users:username one user", async () => {
        const res = await request.get("/api/users/sakai");
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)).to.deep.equal({
          id: "b12f9390-aeb0-11ea-b3de-0242ac130005",
          username: "sakai",
          email: "sakai@nri.co.jp",
        });
      });

      it("GET /api/users ghost user", async () => {
        const res = await request.get("/api/users/aaaaa");
        expect(res).to.have.status(404);
      });

      it("GET /api/users all users", async () => {
        const res = await request.get("/api/users");

        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)).to.deep.equal(testUserData);
      });

      it.skip("POST /api/users", async () => {
        const res = await request.post("/api/users").send({
          username: "sasaki",
          email: "sasaki@nri.co.jp",
          password: "xxxxxx",
        });

        expect(res).to.have.status(201);
      });

      it("PATCH /api/users:id", async () => {
        const res = await request.patch("/api/users/iwashita").send({
          username: "iwashitaiwashita",
        });

        expect(res).to.have.status(200);
        await tearDownRequest.patch("api/user/iwashitaiwashita").send({
          username: "iwashita",
        });
      });

      it("DELETE /api/users", async () => {
        const res = await request.delete("/api/users/sakai");

        expect(res).to.have.status(200);
      });
    });

    describe.skip("match-log test", () => {
      it("GET /api/match-log all logs", async () => {
        const res = await request.get("/api/match-logs");
        expect(res).to.have.status(200);
      });

      it("GET /api/users/:id/match-logs", async () => {
        const res = await request.get("/api/users/sakai/match-logs");
        expect(res).to.have.status(200);
      });

      it("POST /api/users/:id/match-logs", async () => {
        const res = await request.post("/api/users/sakai/match-logs");

        expect(res).to.have.status(201);
      });
    });
  });
});
