- [Unit testing coding standards](#unit-testing-coding-standards)
  - [Prefer Using the AAA Pattern in Unit Tests with Jest](#prefer-using-the-aaa-pattern-in-unit-tests-with-jest)
    - [❌ Avoid Writing Tests Without Clear Structure](#-avoid-writing-tests-without-clear-structure)
    - [✅ Prefer Using the AAA Pattern for Clear and Maintainable Tests](#-prefer-using-the-aaa-pattern-for-clear-and-maintainable-tests)
    - [ℹ️ Explanation](#ℹ️-explanation)
  - [Prefer Using `screen.getByText` Over Destructuring `getByText` Directly](#prefer-using-screengetbytext-over-destructuring-getbytext-directly)
    - [❌ Avoid Destructuring `getByText` Directly from the Render Result](#-avoid-destructuring-getbytext-directly-from-the-render-result)
    - [✅ Prefer Using `screen.getByText` for Better Readability and Maintainability](#-prefer-using-screengetbytext-for-better-readability-and-maintainability)
    - [ℹ️ Explanation](#ℹ️-explanation-1)
    - [📚 References](#-references)
  - [Prefer Using `jest.spyOn` / `vi.spyOn` with Explicit Imports for Mocking Custom Hooks](#prefer-using-jestspyon--vispyon-with-explicit-imports-for-mocking-custom-hooks)
    - [❌ Avoid Mocking Custom Hooks Without Explicit Spy](#-avoid-mocking-custom-hooks-without-explicit-spy)
    - [✅ Prefer Using `jest.spyOn` or `vi.spyOn` with Explicit Imports](#-prefer-using-jestspyon-or-vispyon-with-explicit-imports)
    - [ℹ️ Explanation](#ℹ️-explanation-2)
  - [Prefer Using `it.each` for Parametrized Tests Over Multiple Individual `it` Blocks](#prefer-using-iteach-for-parametrized-tests-over-multiple-individual-it-blocks)
    - [❌ Avoid Using Multiple Individual `it` Blocks for Similar Tests](#-avoid-using-multiple-individual-it-blocks-for-similar-tests)
    - [✅ Prefer Using `it.each` for Parametrized Tests](#-prefer-using-iteach-for-parametrized-tests)
    - [ℹ️ Explanation](#ℹ️-explanation-3)
  - [Prefer Using `getByRole` Over `getByTestId` for Finding Elements in React Native](#prefer-using-getbyrole-over-getbytestid-for-finding-elements-in-react-native)
    - [❌ Avoid Using `getByTestId` for Finding All Elements](#-avoid-using-getbytestid-for-finding-all-elements)
    - [✅ Prefer Using `getByRole` for Finding Elements](#-prefer-using-getbyrole-for-finding-elements)
    - [ℹ️ Explanation](#ℹ️-explanation-4)
    - [📚 References](#-references-1)
  - [Prefer Mock Factory Function Over Re-Assignable Object Graph](#prefer-mock-factory-function-over-re-assignable-object-graph)
    - [❌ Avoid usage of re-assignable object graph](#-avoid-usage-of-re-assignable-object-graph)
    - [✅ Prefer a mock factory with partial overrides](#-prefer-a-mock-factory-with-partial-overrides)
    - [ℹ️ Explanation](#ℹ️-explanation-5)

# Unit testing coding standards

This section lists coding patterns promoted in the unit tests of a `React` `TypeScript` project, using **Jest** or **Vitest** with React Testing Library. The same patterns apply: use `describe`, `it`, `it.each`, AAA, `screen` queries, and mock factories. Use `jest` (Jest) or `vi` (Vitest) for spies and mocks (e.g. `vi.spyOn`, `vi.clearAllMocks`, `jest.spyOn`).

## Prefer Using the AAA Pattern in Unit Tests with Jest

### ❌ Avoid Writing Tests Without Clear Structure

```tsx
// This code lacks a clear structure, making it harder to read and maintain
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "react-native";
import { MyComponent } from "./MyComponent";

test("should increment count on button press", () => {
  render(<MyComponent />);
  const button = screen.getByText("Increment");
  fireEvent.press(button);
  expect(screen.getByText("Count: 1")).toBeTruthy();
});
```

### ✅ Prefer Using the AAA Pattern for Clear and Maintainable Tests

```tsx
// This code uses the AAA pattern, making the test more readable and maintainable
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("should increment count on button press", () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const button = screen.getByText("Increment");
    fireEvent.press(button);

    // Assert
    expect(screen.getByText("Count: 1")).toBeTruthy();
  });

  it("should display initial count", () => {
    // Arrange
    render(<MyComponent />);

    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByText("Count: 0")).toBeTruthy();
  });
});
```

### ℹ️ Explanation

- **Avoid Unstructured Tests:** Writing tests without a clear structure can make them hard to read, understand, and maintain. It can be challenging to quickly discern the setup, the action being tested, and the expected outcome.
- **Use the AAA Pattern:** The Arrange-Act-Assert (AAA) pattern provides a clear structure for tests, dividing them into three distinct sections:
  - **Arrange:** Set up the necessary conditions and inputs.
  - **Act:** Perform the action being tested.
  - **Assert:** Verify that the expected outcome occurred.
- **Readability and Maintenance:** Using the AAA pattern improves readability by clearly separating the different stages of the test. This makes it easier to understand what is being tested and why, facilitating easier maintenance and debugging.
- **Consistent Structure:** Consistently using the AAA pattern helps ensure that all tests follow the same structure, making the test suite more cohesive and easier to navigate.

## Prefer Using `screen.getByText` Over Destructuring `getByText` Directly

### ❌ Avoid Destructuring `getByText` Directly from the Render Result

```tsx
// This code destructures getByText directly from the render result, which can be less readable and harder to maintain
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";

test("should increment count on button press", () => {
  const { getByText } = render(<MyComponent />);
  const button = getByText("Increment");
  fireEvent.press(button);
  expect(getByText("Count: 1")).toBeTruthy();
});
```

### ✅ Prefer Using `screen.getByText` for Better Readability and Maintainability

```tsx
// This code uses screen.getByText, making the test more readable and maintainable
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("should increment count on button press", () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const button = screen.getByText("Increment");
    fireEvent.press(button);

    // Assert
    expect(screen.getByText("Count: 1")).toBeTruthy();
  });

  it("should display initial count", () => {
    // Arrange
    render(<MyComponent />);

    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByText("Count: 0")).toBeTruthy();
  });
});
```

### ℹ️ Explanation

- **Avoid Destructuring `getByText` Directly:** Destructuring `getByText` (or other query functions) directly from the render result can make tests less readable and harder to maintain, as it introduces additional variables and spreads the query logic throughout the test.
- **Use `screen.getByText`:** Using `screen.getByText` centralizes the querying logic in `screen`, which enhances readability by making it clear where the query functions come from. It also follows best practices recommended by the Testing Library.
- **Readability and Maintenance:** Using `screen.getByText` improves readability by keeping the focus on the test logic rather than on managing multiple variables. It makes the test structure simpler and more intuitive.
- **Consistent Structure:** Consistently using `screen.getByText` (and other `screen` query methods) helps ensure that all tests follow the same pattern, making the test suite more cohesive and easier to navigate.

By following these best practices and using `screen.getByText`, you can create tests that are clearer, more maintainable, and easier to understand.

### 📚 References

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)

## Prefer Using `jest.spyOn` / `vi.spyOn` with Explicit Imports for Mocking Custom Hooks

Use `jest.spyOn` (Jest) or `vi.spyOn` (Vitest) with explicit imports so the mocked module is clear. Same pattern for both runners.

### ❌ Avoid Mocking Custom Hooks Without Explicit Spy

```tsx
// This code mocks a custom hook without using jest.spyOn/vi.spyOn, making it less explicit
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";
import { useMyCustomHook } from "location/of/my-custom-hook";

jest.mock("location/of/my-custom-hook", () => ({
  useMyCustomHook: jest.fn(),
}));

test("should render custom hook data", () => {
  (useMyCustomHook as jest.Mock).mockReturnValue("mocked data");
  render(<MyComponent />);
  expect(screen.getByText("mocked data")).toBeTruthy();
});
```

### ✅ Prefer Using `jest.spyOn` or `vi.spyOn` with Explicit Imports

```tsx
// Jest: jest.spyOn
import * as hookModule from "location/of/my-custom-hook";
const useMyCustomHookSpy = jest.spyOn(hookModule, "useMyCustomHook");

// Vitest: vi.spyOn
import { vi } from "vitest";
import * as hookModule from "location/of/my-custom-hook";
const useMyCustomHookSpy = vi.spyOn(hookModule, "useMyCustomHook");

describe("MyComponent", () => {
  afterEach(() => {
    useMyCustomHookSpy.mockClear();
  });

  afterAll(() => {
    useMyCustomHookSpy.mockRestore();
  });

  it("should render custom hook data with mocked data", () => {
    // Arrange
    useMyCustomHookSpy.mockReturnValue("mocked data");
    // Act
    render(<MyComponent />);
    // Assert
    expect(screen.getByText("mocked data")).toBeTruthy();
  });
});
```

### ℹ️ Explanation

- **Avoid Mocking Without `jest.spyOn`:** Directly mocking the custom hook without `jest.spyOn` can make the test setup less explicit and harder to understand. It also makes it less clear which module and function are being mocked.
- **Use `jest.spyOn` with Explicit Imports:** Using `jest.spyOn` with explicit imports makes the mocking process more transparent. It clearly indicates which module and function are being mocked, improving readability.
- **Readability and Maintenance:** Using `jest.spyOn` enhances readability by making the test setup explicit. It shows exactly which function is being mocked and how it is being used in the test.
- **Better Control:** `jest.spyOn` provides better control over the mock's lifecycle. You can easily restore the original implementation after the test using `mockRestore()`, preventing potential side effects on other tests.
- **Consistent Structure:** Consistently using `jest.spyOn` for mocking functions helps maintain a clear and consistent test structure, making the test suite easier to understand and navigate.

By following these best practices and using `jest.spyOn` with explicit imports, you can create tests that are clearer, more maintainable, and easier to understand.

## Prefer Using `it.each` for Parametrized Tests Over Multiple Individual `it` Blocks

### ❌ Avoid Using Multiple Individual `it` Blocks for Similar Tests

```tsx
// This code uses multiple individual it blocks for similar tests, which can be repetitive and harder to maintain
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it('should render with text "Hello, Alice!"', () => {
    render(<MyComponent name="Alice" />);
    expect(screen.getByText("Hello, Alice!")).toBeTruthy();
  });

  it('should render with text "Hello, Bob!"', () => {
    render(<MyComponent name="Bob" />);
    expect(screen.getByText("Hello, Bob!")).toBeTruthy();
  });

  it('should render with text "Hello, Charlie!"', () => {
    render(<MyComponent name="Charlie" />);
    expect(screen.getByText("Hello, Charlie!")).toBeTruthy();
  });
});
```

### ✅ Prefer Using `it.each` for Parametrized Tests

```tsx
// This code uses it.each for parametrized tests, making the test more concise and easier to maintain
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it.each`
    name         | expected
    ${"Alice"}   | ${"Hello, Alice!"}
    ${"Bob"}     | ${"Hello, Bob!"}
    ${"Charlie"} | ${"Hello, Charlie!"}
  `('should render with text "$expected"', ({ name, expected }) => {
    // Arrange & Act
    render(<MyComponent name={name} />);

    // Assert
    expect(screen.getByText(expected)).toBeTruthy();
  });
});
```

### ℹ️ Explanation

- **Avoid Multiple Individual `it` Blocks:** Using multiple `it` blocks for similar tests can lead to repetitive code and makes the test suite harder to maintain. Each test block often contains similar setup and assertion logic, which can be consolidated.
- **Use `it.each` for Parametrized Tests:** The `it.each` function allows you to run the same test logic with different parameters. This makes the tests more concise and easier to read, reducing redundancy.
- **Readability and Maintenance:** Using `it.each` enhances readability by providing a single, clear test case that runs multiple times with different data. This reduces the amount of code and makes it easier to add or modify test cases.
- **Consistent Structure:** `it.each` helps maintain a consistent structure in the test suite, making it easier to understand and navigate. It also ensures that all similar tests are grouped together, improving organization.

By following these best practices and using `it.each` for parametrized tests, you can create a test suite that is more readable, maintainable, and easier to extend.

## Prefer Using `getByRole` Over `getByTestId` for Finding Elements in React Native

### ❌ Avoid Using `getByTestId` for Finding All Elements

```tsx
// This code uses getByTestId for finding elements, which can be less semantic and harder to maintain
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text, Button, View } from "react-native";

const MyComponent = () => (
  <View>
    <Text testID="heading">Welcome</Text>
    <Button testID="submit-button" title="Submit" onPress={() => {}} />
  </View>
);

describe("MyComponent", () => {
  it('should render a button with text "Submit"', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const button = screen.getByTestId("submit-button");

    // Assert
    expect(button).toBeTruthy();
  });

  it('should render a heading with text "Welcome"', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const heading = screen.getByTestId("heading");

    // Assert
    expect(heading).toBeTruthy();
  });
});
```

### ✅ Prefer Using `getByRole` for Finding Elements

```tsx
// This code uses getByRole for finding elements, making the tests more semantic and maintainable
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text, Button, View } from "react-native";

const MyComponent = () => (
  <View>
    <Text accessibilityRole="header">Welcome</Text>
    <Button title="Submit" onPress={() => {}} />
  </View>
);

describe("MyComponent", () => {
  it('should render a button with text "Submit"', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const button = screen.getByRole("button", { name: "Submit" });

    // Assert
    expect(button).toBeTruthy();
  });

  it('should render a heading with text "Welcome"', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const heading = screen.getByRole("header", { name: "Welcome" });

    // Assert
    expect(heading).toBeTruthy();
  });
});
```

### ℹ️ Explanation

- **Avoid Using `getByTestId` for All Elements:** Using `getByTestId` can be less semantic and makes the tests more brittle. It relies on custom attributes that can be easily removed or changed, making tests harder to maintain.
- **Use `getByRole`:** Prefer `getByRole` for finding elements. It queries elements based on their semantic role (e.g., button, header), making tests more robust and maintainable. It also aligns better with how users interact with the application, improving accessibility.
- **Readability and Maintainability:** Using `getByRole` enhances readability by making it clear what kind of element is being queried. It also ensures that tests are less likely to break due to changes in non-semantic attributes.
- **Accessibility:** `getByRole` promotes accessibility by encouraging developers to use semantic roles, which are essential for assistive technologies.

By following these best practices and using `getByRole` for finding elements, you can create tests that are more readable, maintainable, and aligned with best practices for accessibility and semantic roles in React Native.

### 📚 References

- [The test should resemble how users interact with your code](https://testing-library.com/docs/queries/about/#priority)

## Prefer Mock Factory Function Over Re-Assignable Object Graph

### ❌ Avoid usage of re-assignable object graph

```typescript
// somewhere in a tests shared folder
export const mockPerson: Person = {
  id: 1,
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  isActive: true,
};

// unit test using the shared object
describe("Person tests with shared mock object", () => {
  it("should update the name", () => {
    mockPerson.name = "Jane Doe"; // modifies the shared object
    expect(mockPerson.name).toBe("Jane Doe");
  });

  it("should have the initial name", () => {
    expect(mockPerson.name).toBe("John Doe"); // ❌ fails because the shared object was modified in the previous test
  });
});
```

### ✅ Prefer a mock factory with partial overrides

```typescript
// somewhere in a tests shared folder
export const buildMockPerson = (overrides?: Partial<Person>): Person => ({
  id: 1,
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  isActive: true,
  ...overrides,
});

// unit test using the mock factory function
describe("Person tests with mock factory function", () => {
  it("should update the name in one instance", () => {
    const person = buildMockPerson({ name: "Jane Doe" });
    expect(person.name).toBe("Jane Doe");
  });

  it("should not affect other instances", () => {
    const person = buildMockPerson();
    expect(person.name).toBe("John Doe"); // ✅ passes because a new instance is created for each test
  });
});
```

### ℹ️ Explanation

- **Isolation in Tests:** In the "bad" example, modifying the shared `mockPerson` object affects subsequent tests, leading to unintended side-effects. In the "good" example, the factory function creates a new object for each test, ensuring independence.
- **Flexibility:** The factory function accepts `overrides`, allowing specific attributes to be customized for individual tests without altering the base structure.
- **Reusability:** The factory function can be reused in multiple test files and scenarios, improving consistency and reducing duplication.
- **Maintainability:** Updates to the `Person` structure only need to be made in the factory function, reducing maintenance overhead.

By using a factory function, you eliminate shared state issues, enhance test clarity, and make your test setup more robust and maintainable.
