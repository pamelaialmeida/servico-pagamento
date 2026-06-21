import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    ignores: ["node_modules/**", "mochawesome-report/**"],
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: globals.mocha,
    },
  },
];
