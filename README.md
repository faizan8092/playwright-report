# 🎭 Playwright Report

[![npm version](https://img.shields.io/npm/v/playwright-report.svg)](https://www.npmjs.com/package/playwright-report)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/playwright-report.svg)](https://nodejs.org)

Beautiful, modern test results dashboard for Playwright with interactive charts, detailed insights, and comprehensive test execution views.

<!-- ![Playwright Report Dashboard](https://via.placeholder.com/800x400/0f172a/60a5fa?text=Dashboard+Preview) -->

## ✨ Features

- 🎨 **Modern Dark UI** - Beautiful sidebar with test run history
- 📊 **Interactive Charts** - Pie charts for status distribution, bar charts for slowest tests
- 🔍 **Search & Filter** - Find tests quickly with search and status filters
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎭 **Detailed Test Views** - Expandable test details with execution steps
- 💻 **Terminal-Style Errors** - Beautiful error traces with syntax highlighting
- 📸 **Attachment Support** - View screenshots, videos, and traces
- ⚡ **Real-time Updates** - Auto-refresh test results
- 🌐 **Cross-Platform** - Works on Windows, macOS, and Linux

## 📦 Installation

### Option 1: Global Installation (Recommended)

```bash
npm install -g playwright-report
```

### Option 2: Use with npx (No installation)

```bash
npx playwright-report
```

### Option 3: Local Installation

```bash
npm install --save-dev playwright-report
```

## 🚀 Quick Start

### 1. Setup Dashboard in Your Playwright Project

```bash
cd my-playwright-project
playwright-report
```

Interactive setup will ask:
- Project location (default: current directory)
- Backend server port (default: 3001)
- Dashboard UI port (default: 3000)
- Auto-open browser after tests

### 2. Run Your Playwright Tests

```bash
npm run test
```

This generates JSON test results in the `test-results/` folder.

### 3. View Dashboard

```bash
npm run dashboard
```

Dashboard opens automatically at `http://localhost:3000` 🎉

## 📖 Usage

### Commands

```bash
# Setup dashboard (first time)
playwright-report

# Run Playwright tests
npm run test

# View dashboard
npm run dashboard

# Run server only
npm run dashboard:server

# Run UI only
npm run dashboard:ui
```

### Workflow

```bash
# 1. Navigate to your Playwright project
cd my-playwright-project

# 2. Setup dashboard (only once)
npx playwright-report

# 3. Run tests to generate results
npm run test

# 4. View beautiful dashboard
npm run dashboard
```

## ⚙️ Configuration

### Playwright Configuration

The installer automatically updates your `playwright.config.js` to include JSON reporter:

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['html', { open: 'never' }],
    ['json', { 
      outputFile: `test-results/results-${Date.now()}.json` 
    }]
  ],

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
  ],
});
```

### Manual Configuration

If you prefer manual setup, add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "dashboard:server": "node dashboard-server.js",
    "dashboard:ui": "cd dashboard-ui && npm start",
    "dashboard": "concurrently \"npm run dashboard:server\" \"npm run dashboard:ui\""
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "concurrently": "^8.2.0"
  }
}
```

## 📁 Project Structure

After installation, your project will have:

```
my-playwright-project/
├── tests/                        # Your Playwright tests
│   └── example.spec.js
├── test-results/                 # Test results (auto-generated)
│   ├── results-1732694523000.json
│   └── ...screenshots, videos
├── dashboard-ui/                 # React dashboard UI
│   ├── src/
│   ├── public/
│   └── package.json
├── dashboard-server.js           # Express backend server
├── playwright.config.js          # Updated with JSON reporter
└── package.json                  # Updated with dashboard scripts
```

## 🎨 Dashboard Features

### Sidebar
- **Test Run History** - List of all test executions
- **Status Indicators** - Visual pass/fail/flaky status
- **Timestamps** - When each test was run
- **Pass Rate** - Live percentage indicator

### Main Dashboard
- **KPI Cards** - Total tests, passed, failed, flaky
- **Status Distribution** - Interactive pie chart
- **Duration Insights** - Bar chart showing slowest tests
- **Filter Tabs** - Filter by All, Passed, Failed, Flaky
- **Search Bar** - Search test suites and cases

### Test Details
- **Execution Metadata** - Duration, worker, project info
- **Error Traces** - Terminal-style error display with syntax highlighting
- **Attachments** - View screenshots, videos, traces
- **Execution Steps** - Step-by-step test execution breakdown

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### No Test Results

Ensure JSON reporter is configured:
```javascript
reporter: [
  ['json', { outputFile: `test-results/results-${Date.now()}.json` }]
]
```

### Dashboard Not Opening

1. Check both servers are running:
   ```bash
   curl http://localhost:4141/api/test-runs
   curl http://localhost:3000
   ```

2. Check `test-results/` folder exists and contains JSON files

3. Reinstall dependencies:
   ```bash
   npm install
   cd dashboard-ui && npm install
   ```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

cd dashboard-ui
rm -rf node_modules package-lock.json
npm install
```

## 🌐 CI/CD Integration

### GitHub Actions

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run tests
        run: npm run test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-results
          path: test-results/
          retention-days: 30
```

### GitLab CI

```yaml
stages:
  - test

playwright-tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  script:
    - npm ci
    - npm run test
  artifacts:
    when: always
    paths:
      - test-results/
    expire_in: 30 days
```

## 📊 Example Test

```javascript
import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('https://example.com/login');
    await page.fill('#email', 'user@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('https://example.com/login');
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error')).toBeVisible();
  });
});
```

Run with:
```bash
npx playwright test
npm run dashboard
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for [Playwright](https://playwright.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- UI components inspired by modern design systems

## 📧 Support

- 📚 [Documentation](https://github.com/yourusername/playwright-report#readme)
- 🐛 [Issue Tracker](https://github.com/yourusername/playwright-report/issues)
- 💬 [Discussions](https://github.com/yourusername/playwright-report/discussions)

## 🗺️ Roadmap

- [ ] Export reports to PDF
- [ ] Compare test runs
- [ ] Slack/Teams notifications
- [ ] Custom themes
- [ ] Historical trends
- [ ] Performance benchmarks

---

**Made with ❤️ for the Playwright community**

⭐ Star us on [GitHub](https://github.com/yourusername/playwright-report)
