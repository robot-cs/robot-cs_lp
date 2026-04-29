module.exports = {
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  overrides: [
    {
      // Astroファイル用の設定
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // ここにAstro固有のルールを書けます
      },
    },
  ],
};
