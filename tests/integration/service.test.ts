import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";
import recommendationBodyFactory from "../factories/recommedationBodyFactory.js";

describe("POST recomedations", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 201 and persist given a valid body", async () => {
    const body = recommendationBodyFactory();

    const response = await supertest(app).post("/recommendations").send(body);

    const result = await prisma.recommendation.findMany({
      where: {
        name: body.name,
      },
    });

    expect(response.status).toEqual(201);
    expect(result.length).toEqual(1);
  });
});

async function truncateRecommendations() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}

async function disconect() {
  await prisma.$disconnect();
}
