const fetchAPI = require("./utils").fetchAPI;

describe("Home", () => {
  describe("GET /", () => {
    it("should return 200", async () => {
      const res = await fetchAPI("/", "GET");
      expect(res.statusCode).toEqual(200);
    });
  });
});
