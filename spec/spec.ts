import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Application } from "express";
import { getRepository, Repository, Not, IsNull } from "typeorm";
import { v4 as uuid4 } from "uuid";
import DatabaseConnectionManager from "../src/database";
import { getDefaultApp } from "../src/app";
import User from "../src/entities/User";
import testUserData from "../src/seeds/users.json";

chai.use(chaiHttp);
const expect = chai.expect;

describe("The express server", () => {
  const APP_SECRET = "xxxyyyxxxyyy";
  const TEST_USER_ID = "3461cac2-35bd-4d45-a163-f220beb43d76";

  let app: Application;
  let userRepo: Repository<User>;

  let request;
  beforeEach(() => {
    request = chai.request(app);
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
      it("GET /api/users one user", async () => {
        const res = await request.get("/api/users/sakai");
        expect(res).to.have.status(200);
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
    });

    describe("matchs test", () => {
      it("GET /api/users one user", async () => {
        const res = await request.get("/api/users/sakai");
        expect(res).to.have.status(200);
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
    });
  });
});
