module.exports = {
  globalSetup: "/opt/backend/app/tests/setup.js",
  globalTeardown: "/opt/backend/app/tests/teardown.js",
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Bookeat Test Report",
        outputPath: "/opt/backend/app/report/test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
        includeSuiteFailure: true,
        includeStackTrace: true,
        verbose: true,
      },
    ],
  ],
};
