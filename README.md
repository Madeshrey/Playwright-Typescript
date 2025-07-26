# 🧪 OrangeHRM Automation Test Suite — Playwright + TypeScript

Automated end-to-end testing of the [OrangeHRM Demo Site](https://opensource-demo.orangehrmlive.com/) using **Playwright** with **TypeScript**.  
Project follows Page Object Model (POM) design, supports multi-browser execution, environment variables, Docker, and GitHub Actions CI/CD.

---

## 🚀 Tech Stack

- 🎭 [Playwright](https://playwright.dev/)
- 🧑‍💻 TypeScript
- 🌐 Page Object Model (POM)
- 🐳 Docker
- ⚙️ GitHub Actions
- 🧪 ESLint + Prettier
- 📄 .env config support

---

## 📁 Folder Structure

```
├── tests/                # Test specs
├── unitTests/            # unit test specs
├── pages/                # Page Object Model files
├── fixtures/             # Custom fixtures (e.g. login, env utils)
├── playwright.config.ts  # Global config for Playwright
├── .env                  # Env vars for secure test data
├── Dockerfile         # Container setup
├── .dockerignore
├── .gitignore
├── README.md
```

---

## ⚙️ .env Setup

Create a `.env` file in the root directory:

```env
TEST_URL=https://opensource-demo.orangehrmlive.com/
APPUSERNAME=Admin
APPPASSWORD=admin123
```

Make sure to load it in your `config.ts`:

```ts
import * as dotenv from 'dotenv';
dotenv.config();
```

---

## ✅ Test Cases Covered

### 🔐 Login Test
- Login with valid credentials
- Login with invalid/empty inputs

### 👤 Employee Management
- Add new employee
- Search employee in the list

### 🚪 Logout Test
- Log out after login

---

## 📦 Install & Run Locally

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run tests
npx playwright test
```

---

## 🧪 Multi-browser Support

The project supports:
- ✅ Chromium (enabled)
- ❌ Firefox (optional, disabled by default)
- ❌ WebKit (optional)

Update `playwright.config.ts` to enable/disable browsers.

---

## 🐳 Docker Support

### 🛠️ Build Docker Image
```bash
docker build -t playwright-tests .
```

### ▶️ Run Tests in Docker
```bash
docker run --env-file=.env playwright-tests
```

---

## ⚙️ GitHub Actions CI/CD

CI workflow is triggered on every push to `main` or `master`.

### ✅ `.github/workflows/playwright.yml`

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

---

## 📊 View Test Report

After test execution:

```bash
npx playwright show-report
```

Or view the uploaded HTML report artifact from GitHub Actions run.

---

## 👨‍💻 Author

**R. V. Madeshwaran**  
Automation Tester | Playwright | Selenium | REST API | CI/CD  
🔗 [LinkedIn](https://www.linkedin.com/in/madeshwaran-r-v-992831245/) 

---

## 🏁 Final Notes

- All credentials are securely managed via `.env`
- Docker image uses latest supported Playwright version
- Fully customizable and scalable test suite
