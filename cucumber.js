const common = {
  require: [
    'src/support/hooks.ts',
    'src/steps/**/*.ts'
  ],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  paths: ['src/features/**/*.feature'],
  parallel: 2,
  timeout: 30000
};

module.exports = {
  default: common,
  smoke: {
    ...common,
    tags: '@smoke'
  },
  regression: {
    ...common,
    tags: '@regression'
  },
  security: {
    ...common,
    tags: '@security'
  }
};