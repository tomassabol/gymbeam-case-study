module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],
  rootDir: ".",
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleFileExtensions: ["ts", "cjs", "js"],
};
