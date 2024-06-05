// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^types/(.*)$": "<rootDir>/src/types/$1",
        "^hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^config/(.*)$": "<rootDir>/src/config/$1",
        "^pages/(.*)$": "<rootDir>/src/pages/$1",
        "^components/(.*)$": "<rootDir>/src/components/$1",
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};