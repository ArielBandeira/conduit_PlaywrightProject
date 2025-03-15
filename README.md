# 🚀 Conduit Automation Project
This project contains end-to-end automation for a demo website named Conduit (from [Conduit](https://conduit.bondaracademy.com/)).
This project uses Playwright with TypeScript and the Page Object Model (POM) design pattern.

---

## ✨ Current Project Features

- Automated UI tests using **Playwright**
- **Page Object Model (POM)** architecture for better test maintainability
- Basic test coverage for core features of the Conduit application:
    - User Registration and Login
    - Article Creation, Editing, and Deletion
    - Favoriting/Unfavoriting Articles
    - Viewing Global Feed and User Feed
    - Adding Comments on Articles
    - User Logout
- Tests run in both **headless** and **UI mode**
- HTML test report generation

---

## ⚙️ Installation & Setup

> Follow these steps to install and run the tests locally.

### 📦 Install Playwright (using official setup)

```bash
  npm init playwright@latest
```

### Run Tests
```bash
  npx playwright test
```
#### Run Tests in UI Mode

```bash
  npx playwright test --ui
```

### View HTML Test Report
```bash
  npx playwright show-report
```
---

## 📈 Future Improvements
✔️Add test tagging and grouping by suite (e.g., smoke, regression, etc.)

✔️I️mplement custom error handling and logging

✔️Integrate CI pipelines (e.g., GitHub Actions, GitLab CI)

✔️Add API testing support

✔️Increase test coverage for edge cases and negative scenarios

## 📬 Contact

If you have questions or suggestions, feel free to reach out.

> - **Author**: Ariel Bandeira
>
> - **Email**: arielbandeira47@gmail.com
>
> - **LinkedIn**: [linkedin.com/in/arielbandeira](https://www.linkedin.com/in/arielbandeira/)


## 📢 Final Notes
This project is a work in progress. Improvements and feedback are always appreciated. Happy Testing! 🚀