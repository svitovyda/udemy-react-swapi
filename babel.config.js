module.exports = {
  presets: [
    ["@babel/preset-env", { debug: true }],
    "@babel/preset-react",
    ["@babel/preset-typescript", { allowNamespaces: true }]
  ],
  plugins: ["transform-react-remove-display-name"]
};
