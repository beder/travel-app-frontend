module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};
