/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../app");

describe("POST /identify", () => {
  test("should responds with 200", async () => {
    const response = await request(app).post("/identify").send({
      email: "abc@gmail.com",
    });
    expect(response.ResultCode).toBe(200);
  });
});
