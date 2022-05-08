import { prisma } from "../../src/database.js";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export default async function userFactory(
  recommendation: CreateRecommendationData
) {
  const insertedRecommendation = await prisma.recommendation.create({
    data: {
      ...recommendation,
    },
  });
  return insertedRecommendation;
}
