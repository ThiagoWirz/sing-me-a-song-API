import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

export default async function recommendationsManyFactory() {
  prisma.recommendation.createMany({
    data: [
      {
        name: faker.animal.bear(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      },
      {
        name: faker.animal.bird(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      },
      {
        name: faker.animal.cat(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      },
      {
        name: faker.animal.cetacean(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      },
      {
        name: faker.animal.cow(),
        youtubeLink:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      },
    ],
  });
}
