/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const esmPackages = [
  "typed-query-selector",
];

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ["<rootDir>/src"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/fixtures"],
  transformIgnorePatterns: [
     `node_modules/(?!(${esmPackages.join("|")})/)`,
   ],
};
