module.exports = {
    globalSetup: './app/tests/setup.js',
    globalTeardown: './app/tests/teardown.js',
    reporters: [
        'default',
        ['jest-html-reporter', {
          pageTitle: 'Bookeat Test Report',
          outputPath: './report/test-report.html',
        }],
      ],
};