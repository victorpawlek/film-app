module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": process.env.NODE_ENV === "production" ? "warn" : "off",
    "operator-linebreak": process.env.NODE_ENV === "production" ? "warn" : "off",
    eqeqeq: process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-plusplus": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-await-in-loop": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-restricted-syntax": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-return-assign": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
