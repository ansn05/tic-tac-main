import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Folder, w którym Playwright szuka testów
  timeout: 30000, // Maksymalny czas trwania testu w milisekundach
  retries: 1, // Ilość ponownych prób po niepowodzeniu
  use: {
    baseURL: "http://localhost:5173", // Adres aplikacji Tic-Tac-Toe
    browserName: "chromium", // Możesz dodać 'firefox' i 'webkit'
    headless: false, // false → widoczna przeglądarka, true → testy w tle
    viewport: { width: 1280, height: 720 }, // Ustawienie okna przeglądarki
    screenshot: "only-on-failure", // Screenshoty tylko po błędzie
    trace: "on-first-retry", // Śledzenie testów przy pierwszej awarii
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    // { name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
