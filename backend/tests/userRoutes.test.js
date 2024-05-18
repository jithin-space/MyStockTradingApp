const request = require("supertest");

describe("User Routes", () => {

  let server;
  beforeAll(() => {
    server = global.__SERVER__;
  });
  
  it("should register a new user", async () => {
    const res = await request(server).post("/api/users/register").send({
      username: "testuser",
      password: "testpassword",
      email: "testuser@example.com",
      firstName: "Test",
      lastName: "User",
      phoneNumber: "1234567890",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username", "testuser");
  });

  it("should login an existing user", async () => {
    const res = await request(server).post("/api/users/login").send({
      username: "johndoe",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });
});
