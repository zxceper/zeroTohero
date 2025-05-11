import { defineConfig } from "allure";

export default defineConfig({
  name: "Allure Report Example",
  output: "./out/allure-report",
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: "en",
      },
    },
    reporter: [
      ['list'], // консольный вывод
      ['allure-playwright'] // отчет для Allure
    ],
  },
});