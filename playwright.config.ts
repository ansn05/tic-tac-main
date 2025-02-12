import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", 
  timeout: 30000, 
  retries: 0, 
  use: {
    baseURL: "http://localhost:5173", // 
    browserName: "chromium", 
    headless: true, 
    viewport: { width: 1280, height: 720 }, 
    screenshot: "only-on-failure", 
    trace: "on-first-retry", 
  },
  projects: [
     { name: "chromium", use: { browserName: "chromium" } },
     //{ name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
