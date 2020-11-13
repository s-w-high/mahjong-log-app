const { setupServer } = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = setupServer();

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("Mahjong App", () => {
    describe("Get /hello sample test", () => {
      it("return world", async () => {
        const res = await request.get("/hello");
        res.should.have.status(200);
      });
    });
  });
});
