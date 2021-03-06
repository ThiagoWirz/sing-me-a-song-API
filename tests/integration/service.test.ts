import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import recommendationBodyFactory from "../factories/recommendationBodyFactory.js";
import recommendantionFactory from "../factories/recommendationFactory.js";
import recommendationsManyFactory from "../factories/recommendationsManyFactory.js";

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

describe("UPVOTE recommendations/upvote POST", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 200 and score be 1", async () => {
    const body = recommendationBodyFactory();
    const recommendation = await recommendantionFactory(body);

    const response = await supertest(app)
      .post(`/recommendations/${recommendation.id}/upvote`)
      .send();

    const result = await prisma.recommendation.findUnique({
      where: {
        id: recommendation.id,
      },
    });

    expect(response.status).toEqual(200);
    expect(result.score).toEqual(1);
  });
});

describe("DOWNVOTE recommendations/downvote POST", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 200 and score be -1", async () => {
    const body = recommendationBodyFactory();
    const recommendation = await recommendantionFactory(body);

    const response = await supertest(app)
      .post(`/recommendations/${recommendation.id}/downvote`)
      .send();

    const result = await prisma.recommendation.findUnique({
      where: {
        id: recommendation.id,
      },
    });

    expect(response.status).toEqual(200);
    expect(result.score).toEqual(-1);
  });
});

describe("GET recommendations", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 200 and an array with the recommendations", async () => {
    const body = recommendationBodyFactory();
    await recommendantionFactory(body);

    const response = await supertest(app).get("/recommendations");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });
});

describe("GET recommendantions by id", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 200 and a recommendation given a id", async () => {
    const body = recommendationBodyFactory();
    const insertedRecommendation = await recommendantionFactory(body);

    const response = await supertest(app).get(
      `/recommendations/${insertedRecommendation.id}`
    );

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(insertedRecommendation.id);
  });
});

describe("GET random recommendation", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 200 and a recommendation", async () => {
    await recommendationsManyFactory();

    const response = await supertest(app).get("/recommendations/random");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
  });
});

describe("GET recommendations by amount", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconect);
  it("should return 200 and 3 recommendantions ordered by score given 3 at params", async () => {
    await recommendationsManyFactory();

    const response = await supertest(app).get("/recommendations/top/3");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0].score).toBeGreaterThanOrEqual(
      response.body[1].score
    );
  });
});
async function truncateRecommendations() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}

async function disconect() {
  await prisma.$disconnect();
}
