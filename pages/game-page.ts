import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export class GamePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly BOARD_ROW: Locator;
  readonly BUTTON_SQUARE: Locator;
  readonly SQUARE_MARK: Locator;
  readonly TURN_STATUS: Locator;
  readonly TURN_MESSAGE_X = "Next player: X";
  readonly TURN_MESSAGE_O = "Next player: O";
  readonly WIN_MESSAGE_X = "Winner: X";
  readonly WIN_MESSAGE_O = "Winner: O";
  readonly DRAW_MESSAGE = "Draw";
  readonly RESET_BUTTON: Locator;
  readonly MOVE_HISTORY: Locator;

  // List of squares: [rowIndex, buttonIndex, expectedText]
  readonly squaresToCheck: [number, number, string][] = [
    [0, 0, ""],
    [0, 1, ""],
    [0, 2, ""],
    [1, 0, ""],
    [1, 1, ""],
    [1, 2, ""],
    [2, 0, ""],
    [2, 1, ""],
    [2, 2, ""],
  ];
  // List of moves: [rowIndex, buttonIndex, expectedText, expectedTurnMessage]
  readonly moves: [number, number, string, string][] = [
    [0, 0, "X", this.TURN_MESSAGE_O],
    [0, 1, "O", this.TURN_MESSAGE_X],
    [0, 2, "X", this.TURN_MESSAGE_O],
  ];
  // List of moves to X player win vertical: [rowIndex, buttonIndex, expectedText, expectedTurnMessage]
  readonly movesToXwinVertical: [number, number, string, string][] = [
    [0, 0, "X", this.TURN_MESSAGE_O], // X move
    [0, 1, "O", this.TURN_MESSAGE_X], // O move
    [1, 0, "X", this.TURN_MESSAGE_O], // X move
    [1, 1, "O", this.TURN_MESSAGE_X], // O move
    [2, 0, "X", this.WIN_MESSAGE_X], // X wins
  ];
  //List of moves to X player win horizontal: [rowIndex, buttonIndex, expectedText, expectedTurnMessage]
  readonly movesToXwinHorizontal: [number, number, string, string][] = [
    [0, 0, "X", this.TURN_MESSAGE_O], // X move
    [1, 0, "O", this.TURN_MESSAGE_X], // O move
    [0, 1, "X", this.TURN_MESSAGE_O], // X move
    [1, 1, "O", this.TURN_MESSAGE_X], // O move
    [0, 2, "X", this.WIN_MESSAGE_X], // X wins
  ];
  //List of moves to X player win diagonal: [rowIndex, buttonIndex, expectedText, expectedTurnMessage]
  readonly movesToXwinDiagonal: [number, number, string, string][] = [
    [0, 0, "X", this.TURN_MESSAGE_O], // X move
    [0, 1, "O", this.TURN_MESSAGE_X], // O move
    [1, 1, "X", this.TURN_MESSAGE_O], // X move
    [1, 2, "O", this.TURN_MESSAGE_X], // O move
    [2, 2, "X", this.WIN_MESSAGE_X], // X wins
  ];
  //List of moves to game over: [rowIndex, buttonIndex, expectedText, expectedTurnMessage]
  readonly movesToGameOver: [number, number, string, string][] = [
    [0, 0, "X", this.TURN_MESSAGE_O], // X move
    [0, 1, "O", this.TURN_MESSAGE_X], // O move
    [1, 0, "X", this.TURN_MESSAGE_O], // X move
    [2, 0, "O", this.TURN_MESSAGE_X], // O move
    [2, 1, "X", this.TURN_MESSAGE_O], // X wins
    [1, 2, "O", this.TURN_MESSAGE_X], // X wins
    [0, 2, "X", this.TURN_MESSAGE_O], // X wins
    [1, 1, "O", this.TURN_MESSAGE_X], // X wins
    [2, 2, "X", this.DRAW_MESSAGE], // X wins
  ];

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.BOARD_ROW = page.locator("div.board-row");
    this.BUTTON_SQUARE = page.locator("button.square");
    this.SQUARE_MARK = page.locator(
      "div.board-row:nth-child(1) button.square:nth-child(1)"
    );
    this.TURN_STATUS = page.locator(".status");
    this.RESET_BUTTON = page.getByRole("button", { name: "Reset" });
    this.MOVE_HISTORY = page.locator("ol li button");
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto("/");
  }
  
  // Method to verify empty squares based on the list
  async verifyAllSquaresEmpty(moves: [number, number, string][]) {
    for (const [rowIndex, buttonIndex, expectedText] of moves) {
      await this.checkSquareStatus(rowIndex, buttonIndex, expectedText);
      await expect(this.TURN_STATUS).toHaveText(this.TURN_MESSAGE_X);
    }
  }
  // Method to perform all actions based on the list
  async playAndVerifyMoves(moves: [number, number, string, string][]) {
    for (const [
      rowIndex,
      buttonIndex,
      expectedText,
      expectedTurnMessage,
    ] of moves) {
      await this.clickSquare(rowIndex, buttonIndex);
      await this.checkSquareStatus(rowIndex, buttonIndex, expectedText);
      await expect(this.TURN_STATUS).toHaveText(expectedTurnMessage);
    }
  }

  async clickSquare(rowIndex: number, buttonIndex: number): Promise<void> {
    await this.BOARD_ROW.nth(rowIndex)
      .locator("button.square")
      .nth(buttonIndex)
      .click();
  }

  async getSquareState(rowIndex: number, buttonIndex: number) {
    return this.BOARD_ROW.nth(rowIndex)
      .locator("button.square")
      .nth(buttonIndex);
  }

  async checkSquareStatus(
    rowIndex: number,
    buttonIndex: number,
    status: string
  ): Promise<void> {
    expect(
      //CheckSqare status is as expected
      await this.BOARD_ROW.nth(rowIndex)
        .locator("button.square")
        .nth(buttonIndex)
    ).toHaveText(status);
  }

  async playAndVerifyHistoryMoves(
    moves: [number, number, string, string][]
  ): Promise<void> {
    let moveNumber = 1;
    for (const [rowIndex, buttonIndex] of moves) {
      //Play all moves
      await this.clickSquare(rowIndex, buttonIndex);

      // Verify that the history entry is displayed correctly
      await expect(this.MOVE_HISTORY.nth(moveNumber)).toHaveText(
        `Go to move #${moveNumber}`
      ); //Failed because bug - missing number of step in displayed history 'Go to move # move'
    }
  }
  async goBackToPreviousTurn(
    moves: [number, number, string, string][]
  ): Promise<void> {
    let moveNumber = 1;
    //Play all moves
    for (const [rowIndex, buttonIndex] of moves) {
      await this.clickSquare(rowIndex, buttonIndex);
      moveNumber++;
    }

    //Go back through the move history
    for (const [rowIndex, buttonIndex] of moves.reverse()) {
      moveNumber--; // Decrease move number
      await this.MOVE_HISTORY.nth(moveNumber - 1).click();

      //Verify that only the undone square is now empty
      await expect(
        this.BOARD_ROW.nth(rowIndex).locator("button.square").nth(buttonIndex)
      ).toHaveText("");
    }
  }
}
