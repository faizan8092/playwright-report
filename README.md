# 🎭 Playwright Report

[![npm version](https://img.shields.io/npm/v/playwright-report.svg)](https://www.npmjs.com/package/playwright-report)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/playwright-report.svg)](https://nodejs.org)

Beautiful, modern test results dashboard for Playwright with interactive charts, detailed insights, and comprehensive test execution views.

![Playwright Report Dashboard](https://cdn0030.qrcodechimp.com/qr/PROD/67400392c28e4a6144509af7/fm/landingpage.png)

![Playwright Report Dashboard](https://cdn0030.qrcodechimp.com/qr/PROD/67400392c28e4a6144509af7/fm/landingpage_copy.png?v=1765708408583)

![Playwright Report Dashboard](https://cdn0030.qrcodechimp.com/qr/PROD/67400392c28e4a6144509af7/fm/landingpage_copy.png?v=1765708408583)

## ✨ Features

- 🎨 **Modern Dark UI** - Beautiful sidebar with test run history
- 📊 **Interactive Charts** - Pie charts for status distribution, bar charts for slowest tests
- 🔍 **Search & Filter** - Find tests quickly with search and status filters
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎭 **Detailed Test Views** - Expandable test details with execution steps
- 💻 **Terminal-Style Errors** - Beautiful error traces with syntax highlighting
- 📸 **Attachment Support** - View screenshots, videos, and traces
- 📄 **Export Reports** - Download test results as PDF or Excel files
- ⚡ **Real-time Updates** - Auto-refresh test results
- 🌐 **Cross-Platform** - Works on Windows, macOS, and Linux

## 📋 Prerequisites

Before installing Playwright Report, ensure you have:

- **Node.js** - Version 16.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm** - Comes with Node.js (verify with `npm --version`)
- **Playwright** - Already installed in your project (`npm install @playwright/test`)
- **Existing Playwright Tests** - At least one test file in your project

### Verify Prerequisites

```bash
# Check Node.js version (should be 16.0+)
node --version

# Check npm version
npm --version

# Check if Playwright is installed
npx playwright --version
```

If you don't have Playwright installed yet:

```bash
# Initialize a new Playwright project
npm init playwright@latest
```

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

### Step 1: Navigate to Your Playwright Project

```bash
cd my-playwright-project
```

Make sure you have a `playwright.config.js` or `playwright.config.ts` file in your project root.

### Step 2: Setup Dashboard

```bash
playwright-report
```

The interactive setup will ask:
- **Project location** (default: current directory)
- **Backend server port** (default: 3001)
- **Dashboard UI port** (default: 3000)
- **Auto-open browser** after tests (default: yes)

The installer will:
✅ Create `dashboard-server.js` (backend API)
✅ Create `dashboard-ui/` folder (React dashboard)
✅ Update `playwright.config.js` with JSON reporter
✅ Add dashboard scripts to `package.json`
✅ Install required dependencies

### Step 3: Run Your Playwright Tests

```bash
npm run test
```

This will:
- Execute your Playwright tests
- Generate JSON test results in the `test-results/` folder
- Capture screenshots/videos/traces for failed tests

### Step 4: View Dashboard

```bash
npm run dashboard
```

Dashboard opens automatically at `http://localhost:3000` 🎉

You can now:
- View test results in beautiful UI
- Filter tests by status
- Search for specific tests
- View error traces and attachments
- Download reports as PDF or Excel

## 📖 Usage

### Available Commands

```bash
# Setup dashboard (first time only)
playwright-report

# Run Playwright tests
npm run test

# Start dashboard (server + UI)
npm run dashboard

# Run backend server only
npm run dashboard:server

# Run UI only
npm run dashboard:ui
```

### Complete Workflow for Beginners

```bash
# 1. Navigate to your Playwright project
cd my-playwright-project

# 2. Setup dashboard (only once)
npx playwright-report

# 3. Run your tests to generate JSON results
npm run test

# 4. View the dashboard
npm run dashboard

# 5. Open browser at http://localhost:3000
# The dashboard will automatically display your test results!
```

## ⚙️ Configuration

### ⚠️ IMPORTANT: Playwright Configuration for JSON Reporter

The dashboard requires JSON test results. You MUST configure your `playwright.config.js` file correctly.

**Key Points:**
- The `reporter` option is a **JSON ARRAY** (uses square brackets `[]`)
- You can have multiple reporters (HTML + JSON)
- JSON reporter must include `outputFile` with timestamp

### Playwright Configuration File

Open your `playwright.config.js` and update the `reporter` section:

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // ⚠️ CRITICAL: reporter is a JSON ARRAY with multiple reporters
  reporter: [
    // HTML reporter (optional)
    ['html', { open: 'never' }],

    // JSON reporter (REQUIRED for dashboard)
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

### Configuration Breakdown

```javascript
reporter: [
  // This is a JSON ARRAY - notice the square brackets []

  // First reporter: HTML (optional)
  ['html', { open: 'never' }],

  // Second reporter: JSON (REQUIRED)
  // Format: ['reporter-name', { options }]
  ['json', { 
    outputFile: `test-results/results-${Date.now()}.json` 
    //           ^
    //           | This creates unique file per test run
    //           | Example: results-1734172800000.json
  }]
]
```

### ❌ Common Mistakes

**WRONG - Single reporter (not an array):**
```javascript
reporter: 'html'  // ❌ This won't work
```

**WRONG - Missing JSON reporter:**
```javascript
reporter: [['html']]  // ❌ No JSON reporter
```

**WRONG - Missing outputFile:**
```javascript
reporter: [['json']]  // ❌ No outputFile specified
```

**✅ CORRECT - Array with JSON reporter:**
```javascript
reporter: [
  ['html', { open: 'never' }],
  ['json', { outputFile: `test-results/results-${Date.now()}.json` }]
]
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
│   ├── results-1732694890000.json
│   └── ...screenshots, videos
├── dashboard-ui/                 # React dashboard UI
│   ├── src/
│   ├── public/
│   └── package.json
├── dashboard-server.js           # Express backend server
├── playwright.config.js          # ⚠️ Updated with JSON reporter
└── package.json                  # Updated with dashboard scripts
```

## 🎨 Dashboard Features

### Sidebar
- **Test Run History** - List of all test executions with timestamps
- **Status Indicators** - Visual pass/fail/flaky status badges
- **Timestamps** - When each test run was executed
- **Pass Rate** - Live percentage indicator for each run
- **Quick Navigation** - Click any run to view its details

### Main Dashboard
- **KPI Cards** - Total tests, passed, failed, flaky counts
- **Status Distribution** - Interactive pie chart with percentages
- **Duration Insights** - Bar chart showing slowest tests
- **Filter Tabs** - Filter by All, Passed, Failed, Flaky status
- **Search Bar** - Real-time search across test suites and cases
- **Export Options** - Download reports as PDF or Excel

### Test Details
- **Execution Metadata** - Duration, worker ID, project info
- **Error Traces** - Terminal-style error display with syntax highlighting
- **Attachments** - View screenshots, videos, traces inline
- **Execution Steps** - Step-by-step test execution breakdown
- **Retry Information** - Shows retry attempts for flaky tests

### Export Reports

Download test results in multiple formats:

- **PDF Report** - Professional formatted report with charts and test details
- **Excel Report** - Spreadsheet with all test data for analysis

Click the "Export" button in the dashboard to download reports.

## 🔧 Troubleshooting

### 1. No Test Results Showing

**Problem:** Dashboard is empty or shows "No test runs found"

**Solution:**
```bash
# 1. Verify JSON files exist
ls test-results/*.json

# 2. Check playwright.config.js has JSON reporter (as an ARRAY)
# Make sure you have:
reporter: [
  ['json', { outputFile: `test-results/results-${Date.now()}.json` }]
]

# 3. Run tests again
npm run test

# 4. Restart dashboard
npm run dashboard
```

### 2. Port Already in Use

**Problem:** Error: "Port 3000 is already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### 3. Dashboard Not Opening

**Problem:** Browser doesn't open or shows blank page

**Solution:**
1. Check both servers are running:
   ```bash
   curl http://localhost:3001/api/test-runs
   curl http://localhost:3000
   ```

2. Check `test-results/` folder exists and contains JSON files:
   ```bash
   ls -la test-results/
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   cd dashboard-ui && npm install
   ```

### 4. Module Not Found Errors

**Problem:** "Cannot find module" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

cd dashboard-ui
rm -rf node_modules package-lock.json
npm install
```

### 5. JSON Reporter Not Working

**Problem:** Tests run but no JSON files are created

**Solution:**
```javascript
// Check your playwright.config.js file
// Make sure reporter is an ARRAY (with square brackets)

// ❌ WRONG
reporter: 'html'

// ✅ CORRECT
reporter: [
  ['json', { outputFile: `test-results/results-${Date.now()}.json` }]
]
```

## 🌐 CI/CD Integration

### GitHub Actions

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
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

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
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

### Jenkins Pipeline

```groovy
pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Archive Results') {
      steps {
        archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
      }
    }
  }
}
```

## 📊 Example Test

```javascript
import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://example.com/login');

    // Fill in credentials
    await page.fill('#email', 'user@example.com');
    await page.fill('#password', 'password123');

    // Click login button
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://example.com/login');

    // Fill in wrong credentials
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpass');

    // Click login button
    await page.click('button[type="submit"]');

    // Verify error message is displayed
    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toContainText('Invalid credentials');
  });

  test('should validate empty fields', async ({ page }) => {
    await page.goto('https://example.com/login');

    // Click login without filling fields
    await page.click('button[type="submit"]');

    // Check validation messages
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#password-error')).toBeVisible();
  });
});
```

Run tests and view results:
```bash
# Run tests
npx playwright test

# View in dashboard
npm run dashboard

# Export as PDF or Excel from dashboard UI
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/playwright-report.git
cd playwright-report

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for [Playwright](https://playwright.dev/) - Modern web testing framework
- Charts powered by [Recharts](https://recharts.org/) - Composable charting library
- UI components inspired by modern design systems
- PDF generation using [jsPDF](https://github.com/parallax/jsPDF)
- Excel export using [ExcelJS](https://github.com/exceljs/exceljs)

## 📧 Support

Need help? We're here for you:

- 📚 [Documentation](https://github.com/yourusername/playwright-report#readme)
- 🐛 [Issue Tracker](https://github.com/yourusername/playwright-report/issues)
- 💬 [Discussions](https://github.com/yourusername/playwright-report/discussions)
- 📧 Email: support@playwright-report.dev

## 🗺️ Roadmap

### Current Features
- ✅ Export reports to PDF
- ✅ Export reports to Excel

### Upcoming Features
- [ ] Compare test runs side-by-side
- [ ] Slack/Teams/Discord notifications
- [ ] Custom themes (light/dark/custom colors)
- [ ] Historical trends and analytics
- [ ] Performance benchmarks
- [ ] Email reports scheduling
- [ ] Test flakiness detection
- [ ] Integration with CI/CD platforms

## 🎯 Quick Reference

### First Time Setup Checklist

- [ ] Node.js 16+ installed
- [ ] Playwright installed in project
- [ ] Run `npx playwright-report` to setup
- [ ] Verify `playwright.config.js` has JSON reporter ARRAY
- [ ] Run `npm run test` to generate results
- [ ] Run `npm run dashboard` to view results

### Essential Files

- `playwright.config.js` - Must have JSON reporter in ARRAY format
- `test-results/*.json` - Generated by running tests
- `dashboard-server.js` - Backend API server
- `dashboard-ui/` - React dashboard frontend

### Key Commands

```bash
playwright-report          # Setup (first time)
npm run test              # Run tests
npm run dashboard         # View dashboard
npm run dashboard:server  # Backend only
npm run dashboard:ui      # Frontend only
```

---

**Made with ❤️ for the Playwright community**

⭐ Star us on [GitHub](https://github.com/yourusername/playwright-report) | 📦 [npm package](https://www.npmjs.com/package/playwright-report)
