import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });
  
  it("Schould be able to create a new survey", async () => {
    const response = await request(app).post("/surveys")
      .send({
        title: "Title Example",
        desciption: "Description Example"
      });
    expect(response.status).toBe(201);
  });
});