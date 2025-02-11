import test from "@lib/BaseTest";

test.describe("tic tac toe game verification", () => {
  test.beforeEach(async ({ gamePage }) => {
    await gamePage.navigateToURL();
  });

  test(`empty game board check`, { tag: "@Smoke" }, async ({ gamePage }) => {
    await gamePage.verifyAllSquaresEmpty(gamePage.squaresToCheck);
  });

  test(
    `players take turns check`,
    { tag: "@Functional" },
    async ({ gamePage }) => {
      await gamePage.playAndVerifyMoves(gamePage.moves);
    }
  );

  test(
    `vertical win - first column check`,
    { tag: "@Functional" },
    async ({ gamePage }) => {
      await gamePage.playAndVerifyMoves(gamePage.movesToXwinVertical);
    }
  );

  test(
    `horizontal win - top row check`,
    { tag: "@Functional" },
    async ({ gamePage }) => {
      await gamePage.playAndVerifyMoves(gamePage.movesToXwinHorizontal);
    }
  );

  test(`diagonal win check`, { tag: "@Functional" }, async ({ gamePage }) => {
    await gamePage.playAndVerifyMoves(gamePage.movesToXwinDiagonal);
  });

  test(`restart game check`, { tag: "@Functional" }, async ({ gamePage }) => {
    await gamePage.playAndVerifyMoves(gamePage.moves);
    await gamePage.RESET_BUTTON.click();
    await gamePage.verifyAllSquaresEmpty(gamePage.squaresToCheck);
  });

  test(
    `game is over - draw message shown`,
    { tag: "@Functional" },
    async ({ gamePage }) => {
      await gamePage.playAndVerifyMoves(gamePage.movesToGameOver); // Failed because of bug - no Draw message displayed when game over
    }
  );

  test(`history of the turns check`, { tag: "@Functional" }, async ({ gamePage }) => {
    // gamePage.verifyMoveHistory(1, 1, 1);
    await gamePage.playAndVerifyHistoryMoves(gamePage.moves); // //Failed because of bug - missing number of step in displayed history 'Go to move # move'
  });

  test(
    `go back to previous turn check`,
    { tag: "@Functional" },
    async ({ gamePage }) => {
      await gamePage.goBackToPreviousTurn(gamePage.moves);
    }
  );
});
