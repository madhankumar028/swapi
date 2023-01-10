module.exports = {
  rootDir: "src",
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/file.mock.ts",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/test-utils/envs.js"],
  setupFilesAfterEnv: ["<rootDir>/test-utils/setupTests.js"],
  resetMocks: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
