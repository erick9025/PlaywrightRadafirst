# PlaywrightRadafirst

A Playwright TypeScript test automation framework showcasing multiple design patterns: **Screenplay Pattern**, **Page Object Model (POM)**, and **BDD with Cucumber/Gherkin**.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev/) | ^1.58.2 | Browser automation & test runner |
| [TypeScript](https://www.typescriptlang.org/) | ^5.9.3 | Language |
| [@cucumber/cucumber](https://cucumber.io/) | ^12.7.0 | BDD test runner |
| [playwright-bdd](https://vitalets.github.io/playwright-bdd/) | ^8.4.2 | Cucumber + Playwright integration |
| [chalk](https://github.com/chalk/chalk) | ^5.6.2 | Colored console logging |
| [proxymise](https://github.com/chaijs/proxymise) | ^1.0.2 | Fluent method chaining |

---

## Project Structure

```
PlaywrightRadafirst/
├── screenplay/                    # Screenplay Pattern implementation
│   ├── core/                      # Actor, Ability, Performable, Question
│   ├── abilities/                 # BrowseTheWeb (wraps Playwright Page)
│   ├── interactions/              # Navigate, Click, Enter, Select, WaitFor
│   ├── elements/                  # Locator constants
│   ├── constants/                 # URLs, credentials, product names
│   ├── tasks/                     # Login, AddProductToCart, SortProducts, GoToCart
│   ├── tasks/email/               # IEmailTask, LoginToGmail, LoginToMailinator
│   ├── questions/                 # Text, IsVisible, ElementExists, CartTotal
│   ├── logger/                    # ScreenplayLogger (chalk + HTML report annotations)
│   └── utils/                     # locatorUtils (resolveLocator for templates)
├── src/
│   ├── features/                  # Gherkin .feature files
│   ├── pom/                       # Page Object Model implementation
│   │   ├── constants/             # Page constants
│   │   ├── elements/              # Locator definitions
│   │   └── pages/                 # Page classes (Login, Products, Cart)
│   ├── step-definitions/          # BDD step definitions
│   ├── support/                   # Cucumber hooks and World setup
│   └── utils/                     # Test utilities, Asserts, ExecutionParameters
├── tests/
│   ├── testSwagScreenplay.test.ts # Screenplay Pattern tests (5 tests)
│   ├── emailTests/                # Email polymorphism demo (Screenplay)
│   └── swagTests/                 # POM-based tests (4 variants)
├── playwright.config.js           # Main Playwright config
├── playwright.bdd.config.js       # BDD config (playwright-bdd)
└── package.json
```

---

## Design Patterns

### 1. Screenplay Pattern (primary)

Actors perform Tasks and ask Questions — a more expressive and composable alternative to POM.

```typescript
const buyer = Actor.named("Buyer").whoCan(BrowseTheWeb.using(page));

await buyer.attemptsTo(
  Login.withDefaultUser(),
  AddProductToCart.named("Sauce Labs Backpack"),
  SortProducts.by(ProductSortingOptions.NameAscending),
  GoToCart.now()
);

const total = await buyer.asks(CartTotal.accumulated());
```

### 2. Page Object Model (POM)

Three variants demonstrating progressive refactoring:

| File | Pattern |
|------|---------|
| `testSwag.test.ts` | Individual page classes |
| `testSwagPro.test.ts` | Aggregated `SwagPages` class |
| `testSwagProxymise.test.ts` | Proxymise fluent chaining |

### 3. BDD with Cucumber / playwright-bdd

Feature files in `src/features/`, step definitions in `src/step-definitions/`.

```gherkin
Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard
```

### 4. Email Polymorphism

Swap email providers at runtime via a shared `IEmailTask` interface:

```typescript
// Swap between providers with no test changes
const loginTask: IEmailTask = LoginToGmail.withCredentials(user, pass);
// const loginTask: IEmailTask = LoginToMailinator.withCredentials(user, pass);

await emailUser.attemptsTo(loginTask, OpenEmail.withSubject("...").from("..."));
```

---

## Running Tests

### Screenplay / POM tests (Playwright)

```bash
npx playwright test
```

### BDD tests (playwright-bdd)

```bash
npm run playwright:bdd
```

This command regenerates step specs and runs them:
```
bddgen --config playwright.bdd.config.js && playwright test --config playwright.bdd.config.js
```

### Cucumber tests (raw)

```bash
npm run cucumber
# or run only @smoke tagged scenarios:
npm run cucumber:tags
```

### View last HTML report

```bash
npm run regen
```

---

## Configuration

**`playwright.config.js`** — used for all Playwright tests:
- Browser: Chromium (real Chrome via `channel: 'chrome'`)
- Workers: 4 (parallel execution)
- Global timeout: 15s per test, 1s for assertions
- Reports: HTML (auto-opens after run)
- Artifacts: traces always on, screenshots/video on failure

**`playwright.bdd.config.js`** — used for BDD tests:
- Feature files: `src/features/**/*.feature`
- Step definitions: `src/step-definitions/**/*.ts`
- Generated specs output: `.features-gen/`

---

## Target Application

Tests run against **[Sauce Demo](https://www.saucedemo.com/)** — a publicly available demo e-commerce site.

Default credentials:
- Username: `standard_user`
- Password: `secret_sauce`
