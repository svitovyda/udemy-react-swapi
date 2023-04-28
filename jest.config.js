process.env.TZ = "Europe/Berlin";

module.exports = {
  verbose: false,
  testTimeout: 3000,
  clearMocks: true,
  reporters: ["default", "jest-junit"],
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["./src/**/{*.js,*.ts,*.tsx}", "!**/node_modules/**", "!**/assets/**", "!**/models/**"],
  coverageReporters: ["json-summary", "text-summary", "html"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mock__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/__mock__/fileMock.js",
    "^config$": "<rootDir>/config/development.json"
  },
  modulePathIgnorePatterns: ["/test/__mock__/.*"],
  resetModules: true,
  rootDir: "./",
  roots: ["src", "test"],
  testEnvironmentOptions: {
    url: "http://localhost"
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/gen/"],
  testRegex: ["(/test/.*|(\\.|/)(spec))\\.tsx?$"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }]
  },
  transformIgnorePatterns: ["/node_modules/", "\\.svg\\.[^\\/]+$"],
  fakeTimers: {
    enableGlobally: true
  }
};
