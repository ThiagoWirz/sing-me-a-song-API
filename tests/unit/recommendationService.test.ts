import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import recommendationBodyFactory from "../factories/recommendationBodyFactory.js";
import { jest } from "@jest/globals";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";

describe("Recommendation Service Unit Test", () => {
  describe("Insert Recommendations", () => {
    it("should throw a conflict error given same name", () => {
      const recommendtaion = recommendationBodyFactory();
      jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValue({ id: 1, ...recommendtaion, score: 0 });

      return expect(
        recommendationService.insert(recommendtaion)
      ).rejects.toEqual(conflictError("Recommendations names must be unique"));
    });
  });
});
