import test from "@lib/BaseTest";
import { expect } from "@playwright/test";

test(`verify players take turns`, { tag: "@Functional" }, async ({ gamePage }) => {
  await test.step(`Navigate to Application`, async () => {
    await gamePage.navigateToURL();
    await gamePage.clickSquare(0, 1);
    await gamePage.getAndCheckSquareState(0, 1, "X");
  });
});

test.only(`verify empty game board`, { tag: "@Smoke" }, async ({ gamePage }) => {
  await test.step(`Navigate to Application`, async () => {
    await gamePage.navigateToURL();
    await gamePage.getAndCheckSquareState(0, 0, "");
    await gamePage.getAndCheckSquareState(0, 1, "");
    await gamePage.getAndCheckSquareState(0, 2, "");
    await gamePage.getAndCheckSquareState(1, 0, "");
    await gamePage.getAndCheckSquareState(1, 1, "");
    await gamePage.getAndCheckSquareState(1, 2, "");
    await gamePage.getAndCheckSquareState(2, 0, "");
    await gamePage.getAndCheckSquareState(2, 1, "");
    await gamePage.getAndCheckSquareState(2, 2, "");
    //await expect(gamePage.TURN_STATUS).toHaveText('Next player: X', { timeout: 5000 });
   await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X) 
  });
});
