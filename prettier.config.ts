import { type Config } from "prettier";

const config: Config = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  tailwindStylesheet: "./app/globals.css",
  importOrder: [
    "^(react|react-dom)(/.*)?$",
    "^next(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/types$",
    "^@/env.*$",
    "^@/types/.*$",
    "^@/config/.*$",
    "^@/lib/.*$",
    "^@/hooks/.*$",
    "^@/components/ui/.*$",
    "^@/components/.*$",
    "^@/context/.*$",
    "^@/styles/.*$",
    "^@/app/.*$",
    "^@/utilities/.*$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
