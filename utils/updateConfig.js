const fs = require('fs-extra');
const path = require('path');

async function updatePlaywrightConfig(targetPath, answers) {
  const configPath = path.join(targetPath, 'playwright.config.js');
  
  if (!await fs.pathExists(configPath)) {
    console.warn('⚠️  playwright.config.js not found - skipping config update');
    return;
  }

  let configContent = await fs.readFile(configPath, 'utf8');

  // Check if JSON reporter exists
  if (!configContent.includes("'json'") && !configContent.includes('"json"')) {
    // Add JSON reporter
    if (configContent.includes('reporter:')) {
      configContent = configContent.replace(
        /reporter:\s*\[(.*?)\]/s,
        `reporter: [\n    ['html', { open: 'never' }],\n    ['json', { outputFile: \`test-results/results-\${Date.now()}.json\` }]\n  ]`
      );
    } else {
      // Add reporter section before closing brace
      configContent = configContent.replace(
        /}\);?\s*$/,
        `\n  reporter: [\n    ['html', { open: 'never' }],\n    ['json', { outputFile: \`test-results/results-\${Date.now()}.json\` }]\n  ],\n});`
      );
    }
  }

  await fs.writeFile(configPath, configContent);
}

module.exports = updatePlaywrightConfig;
