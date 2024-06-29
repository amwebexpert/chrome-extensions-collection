
- [Unit testing coding standards](#unit-testing-coding-standards)
  - [Prefer Using the AAA Pattern in Unit Tests with Jest](#prefer-using-the-aaa-pattern-in-unit-tests-with-jest)
    - [❌ Avoid Writing Tests Without Clear Structure](#-avoid-writing-tests-without-clear-structure)
    - [✅ Prefer Using the AAA Pattern for Clear and Maintainable Tests](#-prefer-using-the-aaa-pattern-for-clear-and-maintainable-tests)
    - [ℹ️ Explanation](#ℹ️-explanation)
  - [Prefer Using `screen.getByText` Over Destructuring `getByText` Directly](#prefer-using-screengetbytext-over-destructuring-getbytext-directly)
    - [❌ Avoid Destructuring `getByText` Directly from the Render Result](#-avoid-destructuring-getbytext-directly-from-the-render-result)
    - [✅ Prefer Using `screen.getByText` for Better Readability and Maintainability](#-prefer-using-screengetbytext-for-better-readability-and-maintainability)
    - [ℹ️ Explanation](#ℹ️-explanation-1)

# Unit testing coding standards

This section list coding patterns promoted in the unit tests of a `React` `Typescript` project, while using `Jest` and `React Testing Library`.

## Prefer Using the AAA Pattern in Unit Tests with Jest

### ❌ Avoid Writing Tests Without Clear Structure

```tsx
// This code lacks a clear structure, making it harder to read and maintain
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from 'react-native';
import { MyComponent } from './MyComponent';

test('should increment count on button press', () => {
  render(<MyComponent />);
  const button = screen.getByText('Increment');
  fireEvent.press(button);
  expect(screen.getByText('Count: 1')).toBeTruthy();
});
```

### ✅ Prefer Using the AAA Pattern for Clear and Maintainable Tests

```tsx
// This code uses the AAA pattern, making the test more readable and maintainable
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should increment count on button press', () => {
    // Arrange
    render(<MyComponent />);
    
    // Act
    const button = screen.getByText('Increment');
    fireEvent.press(button);
    
    // Assert
    expect(screen.getByText('Count: 1')).toBeTruthy();
  });

  it('should display initial count', () => {
    // Arrange
    render(<MyComponent />);
    
    // Act
    // No action needed for this test
    
    // Assert
    expect(screen.getByText('Count: 0')).toBeTruthy();
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
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MyComponent } from './MyComponent';

test('should increment count on button press', () => {
  const { getByText } = render(<MyComponent />);
  const button = getByText('Increment');
  fireEvent.press(button);
  expect(getByText('Count: 1')).toBeTruthy();
});
```

### ✅ Prefer Using `screen.getByText` for Better Readability and Maintainability

```tsx
// This code uses screen.getByText, making the test more readable and maintainable
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should increment count on button press', () => {
    // Arrange
    render(<MyComponent />);
    
    // Act
    const button = screen.getByText('Increment');
    fireEvent.press(button);
    
    // Assert
    expect(screen.getByText('Count: 1')).toBeTruthy();
  });

  it('should display initial count', () => {
    // Arrange
    render(<MyComponent />);
    
    // Act
    // No action needed for this test
    
    // Assert
    expect(screen.getByText('Count: 0')).toBeTruthy();
  });
});
```

### ℹ️ Explanation

- **Avoid Destructuring `getByText` Directly:** Destructuring `getByText` (or other query functions) directly from the render result can make tests less readable and harder to maintain, as it introduces additional variables and spreads the query logic throughout the test.
- **Use `screen.getByText`:** Using `screen.getByText` centralizes the querying logic in `screen`, which enhances readability by making it clear where the query functions come from. It also follows best practices recommended by the Testing Library.
- **Readability and Maintenance:** Using `screen.getByText` improves readability by keeping the focus on the test logic rather than on managing multiple variables. It makes the test structure simpler and more intuitive.
- **Consistent Structure:** Consistently using `screen.getByText` (and other `screen` query methods) helps ensure that all tests follow the same pattern, making the test suite more cohesive and easier to navigate.

By following these best practices and using `screen.getByText`, you can create tests that are clearer, more maintainable, and easier to understand.