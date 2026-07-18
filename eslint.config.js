import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Your codebase uses console.warn/console.error alongside pino/Sentry —
      // relax this rather than fighting it everywhere
      "no-console": "off",

      // verbatimModuleSyntax already enforces import/export hygiene at
      // compile time; let TS handle unused imports/vars, but still flag
      // unused vars ESLint would catch that tsc doesn't (e.g. catch bindings)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],

      // You're intentionally using `any` in places like Sentry error payloads;
      // warn instead of hard error so it doesn't block builds
      "@typescript-eslint/no-explicit-any": "warn",

      // Async route handlers that don't await are a common Express bug source
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  eslintConfigPrettier,
);
