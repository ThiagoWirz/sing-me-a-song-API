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

  describe("Upvote", () => {
    it("should throw a not found error if no recommendation is found", () => {
      jest.spyOn(recommendationRepository, "find").mockReturnValue(null);

      return expect(recommendationService.upvote(3)).rejects.toEqual(
        notFoundError()
      );
    });
  });
  describe("Downvote", () => {
    it("should delete the recommendation if score is lower than -5", async () => {
      const recomedationTest = {
        id: 1,
        name: "Miajuda",
        youtubeLink: "nsei",
        score: -5,
      };

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(recomedationTest);
      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValue({ ...recomedationTest, score: -6 });

      const removeTest = jest
        .spyOn(recommendationRepository, "remove")
        .mockResolvedValue(null);

      await recommendationService.downvote(1);
      expect(removeTest).toBeCalledTimes(1);
    });
  });
});
