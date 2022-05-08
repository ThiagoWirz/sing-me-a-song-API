import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export default function recommedationBodyFactory() {
  const body = {
    name: faker.word.noun(),
    youtubeLink:
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
  };

  return body;
}
