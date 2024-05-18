const request = require("supertest");


describe("Stock Routes", () => {
  let token;
  let server;
 
  beforeAll(async () => {

    server = global.__SERVER__;
    const res = await request(server)
      .post('/api/users/login')
      .send({
        username: 'johndoe',
        password: 'password123'
      });

    token = res.body.token;
  });

  it("should create a new stock", async () => {
    const res = await request(server)
      .post("/api/stocks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 299.35,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("symbol", "MSFT");
  });

  it("should retrieve all stocks", async () => {
    const res = await request(server)
      .get("/api/stocks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
