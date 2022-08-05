module.exports = {
  moduleFileExtensions: ["js", "ts", "tsx"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
};
