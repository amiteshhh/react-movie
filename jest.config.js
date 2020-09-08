module.exports = {
    "collectCoverageFrom": [
        "src/**/*.{js,jsx}",
        "!src/**/*.test.{js,jsx}"
    ],
    "coverageThreshold": {
        "global": {
            "statements": 80,
            "branches": 0,
            "functions": 0,
            "lines": 0
        }
    },
    "setupFilesAfterEnv": [
        "@testing-library/jest-dom"
    ],
    "moduleNameMapper": {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
}