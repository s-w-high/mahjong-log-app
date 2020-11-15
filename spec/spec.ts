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
import testMatchLogData from "./mockData/matchLogs.json";

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
        const res = await request.get("/api/users/1");
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)).to.deep.equal({
          id: 1,
          username: "sakai",
          email: "sakai@nri.co.jp",
        });
      });

      it("GET /api/users ghost user", async () => {
        const res = await request.get("/api/users/999");
        expect(res).to.have.status(404);
      });

      it("GET /api/users all users", async () => {
        const res = await request.get("/api/users");

        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)).to.deep.equal(testUserData);
      });

      it("POST /api/users", async () => {
        const res = await request.post("/api/users").send({
          username: "tanaka",
          email: "tanaka@nri.co.jp",
          password: "xxxxxx",
        });

        expect(res).to.have.status(201);
        await tearDownRequest.delete("/api/users/7");
      });

      it("PATCH /api/users/:id", async () => {
        const res = await request.patch("/api/users/3").send({
          username: "iwashitaiwashita",
        });

        expect(res).to.have.status(200);
        await tearDownRequest.patch("/api/users/3").send({
          username: "iwashita",
        });
      });

      it("DELETE /api/users", async () => {
        await tearDownRequest.post("/api/users").send({
          username: "test",
          email: "test@nri.co.jp",
          password: "xxxxxx",
        });

        const res = await request.delete("/api/users/8");

        expect(res).to.have.status(200);
      });
    });

    describe("match-log test", () => {
      it("GET /api/match-log all logs", async () => {
        const res = await request.get("/api/match-logs");
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)).to.deep.equal(testMatchLogData);
      });

      it("GET /api/users/:id/match-logs", async () => {
        const res = await request.get("/api/users/1/match-logs");
        let expected = [];
        expected.push(testMatchLogData[0]);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text)).to.deep.equal(expected);
      });

      it("POST /api/match-logs", async () => {
        const res = await request.post("/api/match-logs").send({
          eastuser: {
            id: "1",
          },
          southuser: {
            id: "4",
          },
          westuser: {
            id: "2",
          },
          northuser: {
            id: "6",
          },
          eastuserpoint: 60,
          southuserpoint: 5,
          westuserpoint: -15,
          northuserpoint: -50,
          created: "2020-11-13",
        });

        expect(res).to.have.status(201);
        await tearDownRequest.patch("/api/match-logs/3");
      });

      it("PATCH /api/users/:userId/match-logs/:matchId", async () => {
        const res = await request.patch("/api/match-logs/1").send({
          eastuserpoint: 60,
          southuserpoint: 5,
          westuserpoint: -15,
          northuserpoint: -50,
        });

        expect(res).to.have.status(200);
        await tearDownRequest.patch("/api/match-logs/1").send({
          eastuserpoint: 50,
          southuserpoint: 10,
          westuserpoint: -20,
          northuserpoint: -40,
        });
      });

      it("DELETE /api/match-logs/1", async () => {
        // 準備
        await tearDownRequest.post("/api/match-logs").send({
          eastuser: {
            id: "5",
          },
          southuser: {
            id: "1",
          },
          westuser: {
            id: "2",
          },
          northuser: {
            id: "4",
          },
          eastuserpoint: 45,
          southuserpoint: 6,
          westuserpoint: -18,
          northuserpoint: -31,
          created: "2020-11-15",
        });

        const res = await request.delete("/api/match-logs/3");

        expect(res).to.have.status(200);
      });
    });

    // describe.only("match-detail-logs test", () => {
    //   it("GET /api/match-detail-logs all logs", async () => {
    //     const res = await request.get("/api/match-detail-logs");
    //     expect(res).to.have.status(200);
    //     expect(JSON.parse(res.text)).to.deep.equal(testMatchDetailLogData);
    //   });

    //   it("GET /api/users/:userId/match-detail-logs", async () => {
    //     const res = await request.get("/api/users/1/match-logs");
    //     let expected = [];
    //     expected.push(testMatchDetailLogData[1]);
    //     expected.push(testMatchDetailLogData[2]);
    //     expect(res).to.have.status(200);
    //     expect(JSON.parse(res.text)).to.deep.equal(expected);
    //   });

    //   it("GET /api/match/:matchId/match-detail-logs", async () => {
    //     const res = await request.get("/api/users/1/match-logs");
    //     let expected = [];
    //     expected.push(testMatchDetailLogData[0]);
    //     expect(res).to.have.status(200);
    //     expect(JSON.parse(res.text)).to.deep.equal(expected);
    //   });
    // });
  });
});
