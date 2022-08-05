import supertest from "supertest";
import app from "../src/server";

const api = supertest(app);

//wait for knex
beforeAll(async () => await new Promise((r) => setTimeout(r, 1000)));

test("user creation works", async () => {
  const res = await api
    .post("/users")
    .send({ password: "test", username: "test" })
    .expect(200);
  expect(res.body.username).toBe("test");
});

test("login works", async () => {
  const res = await api
    .post("/login")
    .send({ username: "test", password: "test" })
    .expect(200);
  expect(res.text.length).toBeGreaterThan(20);
});
