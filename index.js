#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const { copyTemplate, updatePlaywrightConfig, installDependencies } = require('./utils/setup');

async function init() {
  console.log(chalk.blue.bold('\n🎭 Playwright Dashboard Setup\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectPath',
      message: 'Where is your Playwright project? (leave empty for current directory)',
      default: '.'
    },
    {
      type: 'number',
      name: 'serverPort',
      message: 'Backend server port:',
      default: 3001
    },
    {
      type: 'number',
      name: 'dashboardPort',
      message: 'Dashboard UI port:',
      default: 3000
    },
    {
      type: 'confirm',
      name: 'autoOpen',
      message: 'Auto-open dashboard after tests?',
      default: true
    }
  ]);

  const spinner = ora('Setting up dashboard...').start();

  try {
    const targetPath = path.resolve(process.cwd(), answers.projectPath);

    // Copy template files
    await copyTemplate(targetPath, {
      serverPort: answers.serverPort,
      dashboardPort: answers.dashboardPort
    });

    spinner.text = 'Updating Playwright config...';
    await updatePlaywrightConfig(targetPath, answers);

    spinner.text = 'Installing dependencies...';
    await installDependencies(targetPath);

    spinner.succeed(chalk.green('Dashboard setup complete! ✨'));

    console.log(chalk.cyan('\n📋 Next steps:\n'));
    console.log(`  ${chalk.gray('1.')} Run your tests: ${chalk.yellow('npm run test')}`);
    console.log(`  ${chalk.gray('2.')} View results: ${chalk.yellow('npm run dashboard')}`);
    console.log(`  ${chalk.gray('3.')} Dashboard will open at: ${chalk.blue(`http://localhost:${answers.dashboardPort}`)}\n`);

  } catch (error) {
    spinner.fail(chalk.red('Setup failed'));
    console.error(error);
    process.exit(1);
  }
}

init();
