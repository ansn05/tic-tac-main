import test from "@lib/BaseTest";
import { expect } from "@playwright/test";

test(
  `verify players take turns`,
  { tag: "@Functional" },
  async ({ gamePage }) => {
    await gamePage.navigateToURL();
    await gamePage.clickSquare(0, 0);
    await gamePage.checkSquareStatus(0, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(0, 1);
    await gamePage.checkSquareStatus(0, 1, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(0, 2);
    await gamePage.checkSquareStatus(0, 2, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
  }
);

test(`verify empty game board`, { tag: "@Smoke" }, async ({ gamePage }) => {
  await gamePage.navigateToURL();
  await gamePage.checkSquareStatus(0, 0, "");
  await gamePage.checkSquareStatus(0, 1, "");
  await gamePage.checkSquareStatus(0, 2, "");
  await gamePage.checkSquareStatus(1, 0, "");
  await gamePage.checkSquareStatus(1, 1, "");
  await gamePage.checkSquareStatus(1, 2, "");
  await gamePage.checkSquareStatus(2, 0, "");
  await gamePage.checkSquareStatus(2, 1, "");
  await gamePage.checkSquareStatus(2, 2, "");
  await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
});

test(
  `vertical win - first column`,
  { tag: "@Functional" },
  async ({ gamePage }) => {
    await gamePage.navigateToURL();
    await gamePage.clickSquare(0, 0);
    await gamePage.checkSquareStatus(0, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(0, 1);
    await gamePage.checkSquareStatus(0, 1, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(1, 0);
    await gamePage.checkSquareStatus(1, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(1, 1);
    await gamePage.checkSquareStatus(1, 1, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(2, 0);
    await gamePage.checkSquareStatus(2, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.WIN_MESSAGE_X);
  }
);

test(
  `horizontal win - top row`,
  { tag: "@Functional" },
  async ({ gamePage }) => {
    await gamePage.navigateToURL();
    await gamePage.clickSquare(0, 0);
    await gamePage.checkSquareStatus(0, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(1, 0);
    await gamePage.checkSquareStatus(1, 0, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(0, 1);
    await gamePage.checkSquareStatus(0, 1, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(1, 1);
    await gamePage.checkSquareStatus(1, 1, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(0, 2);
    await gamePage.checkSquareStatus(0, 2, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.WIN_MESSAGE_X);
  }
);

test(
  `diagonal win`,
  { tag: "@Functional" },
  async ({ gamePage }) => {
    await gamePage.navigateToURL();
    await gamePage.clickSquare(0, 0);
    await gamePage.checkSquareStatus(0, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(0, 1);
    await gamePage.checkSquareStatus(0, 1, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(1, 1);
    await gamePage.checkSquareStatus(1, 1, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(1, 2);
    await gamePage.checkSquareStatus(1, 2, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(2, 2);
    await gamePage.checkSquareStatus(2, 2, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.WIN_MESSAGE_X);
  }
);

test(
  `diagonal win /`,
  { tag: "@Functional" },
  async ({ gamePage }) => {
    await gamePage.navigateToURL();
    await gamePage.clickSquare(0, 2);
    await gamePage.checkSquareStatus(0, 2, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(0, 1);
    await gamePage.checkSquareStatus(0, 1, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(1, 1);
    await gamePage.checkSquareStatus(1, 1, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_O);
    await gamePage.clickSquare(1, 0);
    await gamePage.checkSquareStatus(1, 0, "O");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.TURN_MESSAGE_X);
    await gamePage.clickSquare(2, 0);
    await gamePage.checkSquareStatus(2, 0, "X");
    await expect(gamePage.TURN_STATUS).toHaveText(gamePage.WIN_MESSAGE_X);
  }
);
