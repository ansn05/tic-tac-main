import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export class GamePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly BOARD_ROW: Locator;
  readonly BUTTON_SQUARE: Locator;
  readonly SQUARE_MARK: Locator;
  readonly TURN_STATUS: Locator;
  readonly TURN_MESSAGE_X = 'Next player: X';
  readonly TURN_MESSAGE_O = 'Next player: O';

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.BOARD_ROW = page.locator("div.board-row");
    this.BUTTON_SQUARE = page.locator("button.square");
    this.SQUARE_MARK = page.locator(
      "div.board-row:nth-child(1) button.square:nth-child(1)"
    );
    this.TURN_STATUS = page.locator(".status");
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto("/");
  }

  async clickSquare(rowIndex: number, buttonIndex: number): Promise<void> {
    await this.BOARD_ROW.nth(rowIndex)
      .locator("button.square")
      .nth(buttonIndex)
      .click();
  }

  async getSquareState(rowIndex: number, buttonIndex: number ) {
    return this.BOARD_ROW.nth(rowIndex)
      .locator("button.square")
      .nth(buttonIndex);
    //return squareLocator;
    //expect(squareLocator).toHaveText(expectedState);
  }

  async checkSquareStatus(rowIndex: number, buttonIndex: number, status: string): Promise<void> {
    expect(await this.BOARD_ROW.nth(rowIndex)
      .locator("button.square")
      .nth(buttonIndex)).toHaveText(status)
  }
}
