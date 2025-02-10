import { GamePage } from "../pages/game-page";
import { TestInfo, test as baseTest } from "@playwright/test";

const test = baseTest.extend<{
  gamePage: GamePage;
}>({
  gamePage: async ({ page, context }, use) => {
    await use(new GamePage(page, context));
  },
});

export default test;
