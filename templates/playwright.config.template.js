// This is a template - the CLI will merge this with existing config

module.exports = {
  webServer: {
    command: 'npm run dashboard',
    port: 3000,
    timeout: 120000,
    reuseExistingServer: true,
  },
  
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: `test-results/results-${Date.now()}.json` }]
  ],
};
