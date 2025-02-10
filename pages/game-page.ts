import { BrowserContext, Page } from "@playwright/test";

export class GamePage {
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto("/");
  }
}
