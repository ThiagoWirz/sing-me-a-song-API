import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

export default async function recommendationsManyFactory() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: faker.animal.bear(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        score: 0,
      },
      {
        name: faker.animal.bird(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        score: 45,
      },
      {
        name: faker.animal.cat(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        score: 70,
      },
      {
        name: faker.animal.cetacean(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        score: 50,
      },
      {
        name: faker.animal.cow(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        score: -3,
      },
    ],
  });
}
