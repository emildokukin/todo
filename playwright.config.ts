import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    headless: true,
  },
  webServer: {
    command: "vite preview",
    port: 4173, // стандартный порт для Vite Preview
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
