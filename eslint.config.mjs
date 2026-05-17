import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...next,

  ...tseslint.configs.recommended,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      // =========================
      // GENERAL QUALITY
      // =========================
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],

      // =========================
      // REACT / NEXT
      // =========================
      "react-hooks/exhaustive-deps": "warn",

      // =========================
      // ARCHITECTURE GUARDRAILS
      // =========================
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message:
                "Avoid deep relative imports. Use @/ aliases for maintainability.",
            },
          ],
        },
      ],
    },
  },
]);
