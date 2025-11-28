const fs = require('fs-extra');
const path = require('path');

async function copyTemplate(targetPath, config) {
  const templatePath = path.join(__dirname, '../templates');
  
  // Copy server file
  const serverContent = await fs.readFile(
    path.join(templatePath, 'server.js'),
    'utf8'
  );
  await fs.writeFile(
    path.join(targetPath, 'dashboard-server.js'),
    serverContent.replace(/PORT = 3001/g, `PORT = ${config.serverPort}`)
  );

  // Copy React dashboard
  await fs.copy(
    path.join(templatePath, 'dashboard'),
    path.join(targetPath, 'dashboard-ui')
  );

  // Update API URL in dashboard
  const apiFilePath = path.join(targetPath, 'dashboard-ui/src/services/api.js');
  let apiContent = await fs.readFile(apiFilePath, 'utf8');
  apiContent = apiContent.replace(/3001/g, config.serverPort);
  await fs.writeFile(apiFilePath, apiContent);

  // Update dashboard port
  const dashboardPkgPath = path.join(targetPath, 'dashboard-ui/package.json');
  const dashboardPkg = await fs.readJson(dashboardPkgPath);
  dashboardPkg.scripts.start = `PORT=${config.dashboardPort} react-scripts start`;
  await fs.writeJson(dashboardPkgPath, dashboardPkg, { spaces: 2 });
}

module.exports = copyTemplate;
