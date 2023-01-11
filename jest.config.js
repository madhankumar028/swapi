const config = {
  rootDir: "src",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/file.mock.ts",
  },
  setupFiles: ["<rootDir>/test-utils/envs.ts"],
  setupFilesAfterEnv: ["<rootDir>/test-utils/setupTests.ts"],
  resetMocks: true,
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: 'jsdom',
  testURL: "http://localhost/",
};

export default config;
