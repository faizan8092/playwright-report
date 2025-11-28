const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function installDependencies(targetPath) {
  console.log('\n📦 Installing backend dependencies...');
  const backendDeps = ['express', 'cors'];
  execSync(`npm install ${backendDeps.join(' ')}`, {
    cwd: targetPath,
    stdio: 'inherit'
  });

  console.log('\n📦 Installing frontend dependencies...');
  execSync('npm install', {
    cwd: path.join(targetPath, 'dashboard-ui'),
    stdio: 'inherit'
  });

  console.log('\n📦 Installing dev dependencies...');
  execSync('npm install -D concurrently', {
    cwd: targetPath,
    stdio: 'inherit'
  });

  // Update package.json scripts
  const packageJsonPath = path.join(targetPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  
  packageJson.scripts = {
    ...packageJson.scripts,
    "dashboard:server": "node dashboard-server.js",
    "dashboard:ui": "cd dashboard-ui && npm start",
    "dashboard": "concurrently \"npm run dashboard:server\" \"npm run dashboard:ui\""
  };

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

module.exports = installDependencies;
