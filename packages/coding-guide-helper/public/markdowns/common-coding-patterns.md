- [Typescript coding guidelines](#typescript-coding-guidelines)
  - [Prefer Type and Interface over usage of `any`](#prefer-type-and-interface-over-usage-of-any)
    - [❌ Avoid Using `any` for Type Definitions](#-avoid-using-any-for-type-definitions)
    - [✅ Prefer Using Type or Interface for Type Definitions](#-prefer-using-type-or-interface-for-type-definitions)
    - [ℹ️ Explanation](#ℹ️-explanation)
    - [Additional Resources](#additional-resources)
  - [Avoid Overusing the Ternary Operator](#avoid-overusing-the-ternary-operator)
    - [❌ Avoid Overusing the Ternary Operator in a Single Expression](#-avoid-overusing-the-ternary-operator-in-a-single-expression)
    - [✅ Prefer Using Early Returns for Multiple Conditions](#-prefer-using-early-returns-for-multiple-conditions)
    - [ℹ️ Explanation](#ℹ️-explanation-1)
  - [Prefer `const` Over `let` for Variable Declarations](#prefer-const-over-let-for-variable-declarations)
    - [❌ Avoid Using `let` When `const` Can Be Used](#-avoid-using-let-when-const-can-be-used)
    - [✅ Prefer Using `const` To Promote Values That Do Not Change](#-prefer-using-const-to-promote-values-that-do-not-change)
    - [ℹ️ Explanation](#ℹ️-explanation-2)
  - [Prefer `Array.includes()` Over Multiple Comparisons](#prefer-arrayincludes-over-multiple-comparisons)
    - [❌ Avoid Using Multiple Comparisons in Conditional Statements](#-avoid-using-multiple-comparisons-in-conditional-statements)
    - [✅ Prefer Using `Array.includes()` for Multiple Comparisons](#-prefer-using-arrayincludes-for-multiple-comparisons)
    - [ℹ️ Explanation](#ℹ️-explanation-3)
  - [Prefer Object Destructuring Over Positional Parameters](#prefer-object-destructuring-over-positional-parameters)
    - [❌ Avoid Using Positional Parameters in Function Arguments](#-avoid-using-positional-parameters-in-function-arguments)
    - [✅ Prefer Object Destructuring for Function Arguments](#-prefer-object-destructuring-for-function-arguments)
    - [ℹ️ Explanation](#ℹ️-explanation-4)
  - [Prefer `Array.some()` Over Checking `Array.find()` for Undefined](#prefer-arraysome-over-checking-arrayfind-for-undefined)
    - [❌ Avoid Checking `Array.find()` for Undefined](#-avoid-checking-arrayfind-for-undefined)
    - [✅ Prefer Using `Array.some()` for Better Readability](#-prefer-using-arraysome-for-better-readability)
    - [ℹ️ Explanation](#ℹ️-explanation-5)
  - [Prefer Logging Errors Over Silencing Them in `try-catch` Blocks](#prefer-logging-errors-over-silencing-them-in-try-catch-blocks)
    - [❌ Avoid Silencing Errors in `try-catch` Blocks](#-avoid-silencing-errors-in-try-catch-blocks)
    - [✅ Prefer Logging Errors in `try-catch` Blocks](#-prefer-logging-errors-in-try-catch-blocks)
    - [ℹ️ Explanation](#ℹ️-explanation-6)
  - [Prefer Flattening `try-catch` Blocks Over Using Nested `try-catch`](#prefer-flattening-try-catch-blocks-over-using-nested-try-catch)
    - [❌ Avoid Using Nested `try-catch` Blocks](#-avoid-using-nested-try-catch-blocks)
    - [✅ Prefer Flattening `try-catch` Blocks](#-prefer-flattening-try-catch-blocks)
    - [ℹ️ Explanation](#ℹ️-explanation-7)
  - [Avoid Re-throwing the Same Exception in `try-catch`](#avoid-re-throwing-the-same-exception-in-try-catch)
    - [❌ Avoid Using `try-catch` to Simply Re-throw the Same Exception](#-avoid-using-try-catch-to-simply-re-throw-the-same-exception)
    - [✅ Prefer Handling or Logging the Exception Instead of Re-throwing](#-prefer-handling-or-logging-the-exception-instead-of-re-throwing)
    - [✅ Prefer Letting the Exception Propagate Naturally](#-prefer-letting-the-exception-propagate-naturally)
    - [ℹ️ Explanation](#ℹ️-explanation-8)
  - [Prefer Using `??` Over `||` for Handling `null` and `undefined`](#prefer-using--over--for-handling-null-and-undefined)
    - [❌ Avoid Using `||` to Handle `null` and `undefined` Exclusively](#-avoid-using--to-handle-null-and-undefined-exclusively)
    - [✅ Prefer Using `??` to Handle `null` and `undefined`](#-prefer-using--to-handle-null-and-undefined)
    - [ℹ️ Explanation](#ℹ️-explanation-9)
  - [Prefer Type Guards isNullish, isBlank from @lichens-innovation/ts-common](#prefer-type-guards-isnullish-isblank-from-lichens-innovationts-common)
    - [❌ Avoid Verbose null/undefined/Empty-String Checks](#-avoid-verbose-nullundefinedempty-string-checks)
    - [✅ Prefer isNullish, isBlank and Their Negations for Readable Conditions](#-prefer-isnullish-isblank-and-their-negations-for-readable-conditions)
    - [ℹ️ Explanation](#ℹ️-explanation-10)
  - [Prefer Explicit Time Periods (PeriodsInMS) from @lichens-innovation/ts-common](#prefer-explicit-time-periods-periodsinms-from-lichens-innovationts-common)
    - [❌ Avoid Magic Numbers for Durations in Milliseconds](#-avoid-magic-numbers-for-durations-in-milliseconds)
    - [✅ Prefer PeriodsInMS for Readable Time Periods](#-prefer-periodsinms-for-readable-time-periods)
    - [ℹ️ Explanation](#ℹ️-explanation-11)
  - [Prefer Strict Inequality `!==` Over Loose Inequality `!=`](#prefer-strict-inequality--over-loose-inequality-)
    - [❌ Avoid Using `!=` for Inequality Comparisons](#-avoid-using--for-inequality-comparisons)
    - [✅ Prefer Using `!==` for Strict Inequality](#-prefer-using--for-strict-inequality)
    - [ℹ️ Explanation](#ℹ️-explanation-12)
  - [Prefer Using Optional Parameters Over `Type | undefined`](#prefer-using-optional-parameters-over-type--undefined)
    - [❌ Avoid Using `param: Type | undefined` for Optional Parameters](#-avoid-using-param-type--undefined-for-optional-parameters)
    - [✅ Prefer Using Optional Parameters with `param?: Type`](#-prefer-using-optional-parameters-with-param-type)
    - [ℹ️ Explanation](#ℹ️-explanation-13)
  - [Prefer Using Explicit Numeric Values for TypeScript Enums](#prefer-using-explicit-numeric-values-for-typescript-enums)
    - [❌ Avoid Using Implicit Ordinal Values for Enums](#-avoid-using-implicit-ordinal-values-for-enums)
    - [✅ Prefer Using Explicit Numeric Values for Enums](#-prefer-using-explicit-numeric-values-for-enums)
    - [ℹ️ Explanation](#ℹ️-explanation-14)
  - [Prefer Using `useWindowDimensions` Hook Over `Dimensions.get` in React Native](#prefer-using-usewindowdimensions-hook-over-dimensionsget-in-react-native)
    - [❌ Avoid Using `Dimensions.get` for Getting Window Dimensions](#-avoid-using-dimensionsget-for-getting-window-dimensions)
    - [✅ Prefer Using `useWindowDimensions` Hook for Getting Window Dimensions](#-prefer-using-usewindowdimensions-hook-for-getting-window-dimensions)
    - [ℹ️ Explanation](#ℹ️-explanation-15)
  - [Prefer Using Early Returns Over Multiple Nested If-Then-Else](#prefer-using-early-returns-over-multiple-nested-if-then-else)
    - [❌ Avoid Multiple Nested If-Then-Else Statements](#-avoid-multiple-nested-if-then-else-statements)
    - [✅ Prefer Using Early Returns for Improved Readability and Maintainability](#-prefer-using-early-returns-for-improved-readability-and-maintainability)
    - [ℹ️ Explanation](#ℹ️-explanation-16)
    - [📚 References:](#references)
  - [Prefer Using Object Destructuring for readability and clarity](#prefer-using-object-destructuring-for-readability-and-clarity)
    - [❌ Avoid Complex Interpolation Without Destructuring](#-avoid-complex-interpolation-without-destructuring)
    - [✅ Prefer Using Object Destructuring for Clarity](#-prefer-using-object-destructuring-for-clarity)
    - [ℹ️ Explanation](#ℹ️-explanation-17)
  - [Prefer Extracting and Exporting Types over Inline Typing](#prefer-extracting-and-exporting-types-over-inline-typing)
    - [❌ Avoid Using Inline Typing for Function Parameters](#-avoid-using-inline-typing-for-function-parameters)
    - [✅ Prefer Extracting and Exporting Types for Reusability and Maintainability](#-prefer-extracting-and-exporting-types-for-reusability-and-maintainability)
    - [ℹ️ Explanation](#ℹ️-explanation-18)
  - [Prefer Using TypeScript `Record` Utility Type over Custom Index Signatures](#prefer-using-typescript-record-utility-type-over-custom-index-signatures)
    - [❌ Avoid Custom Index Signatures for Object Types](#-avoid-custom-index-signatures-for-object-types)
    - [✅ Prefer Using TypeScript `Record` Utility Type for Simplicity and Clarity](#-prefer-using-typescript-record-utility-type-for-simplicity-and-clarity)
    - [ℹ️ Explanation](#ℹ️-explanation-19)
  - [Prefer Adding a Task Ticket ID to `TODO` Comments for Better Tracking](#prefer-adding-a-task-ticket-id-to-todo-comments-for-better-tracking)
    - [❌ Avoid Using `TODO` Comments Without a Ticket Reference](#-avoid-using-todo-comments-without-a-ticket-reference)
    - [✅ Prefer Adding a Task Management Ticket ID to `TODO` Comments for Better Traceability](#-prefer-adding-a-task-management-ticket-id-to-todo-comments-for-better-traceability)
    - [ℹ️ Explanation](#ℹ️-explanation-20)
  - [Prefer Arrow Functions Over Function Declarations](#prefer-arrow-functions-over-function-declarations)
    - [❌ Avoid Using `function` Declarations for Top-Level or Module-Scoped Logic](#-avoid-using-function-declarations-for-top-level-or-module-scoped-logic)
    - [✅ Prefer Arrow Functions Assigned to `const` for Consistency and Lexical `this`](#-prefer-arrow-functions-assigned-to-const-for-consistency-and-lexical-this)
    - [ℹ️ Explanation](#ℹ️-explanation-21)
  - [Prefer Interfaces Over Types for Object Shapes](#prefer-interfaces-over-types-for-object-shapes)
    - [❌ Avoid Using `type` for Object Shapes When `interface` Fits](#-avoid-using-type-for-object-shapes-when-interface-fits)
    - [✅ Prefer `interface`; Use `type` Only When It Simplifies Syntax](#-prefer-interface-use-type-only-when-it-simplifies-syntax)
    - [ℹ️ Explanation](#ℹ️-explanation-22)
  - [Prefer Named Exports Over Default Exports](#prefer-named-exports-over-default-exports)
    - [❌ Avoid `export default` Unless Required](#-avoid-export-default-unless-required)
    - [✅ Prefer Explicit Named Exports](#-prefer-explicit-named-exports)
    - [ℹ️ Explanation](#ℹ️-explanation-23)

# Typescript coding guidelines

This section list coding patterns promoted in the project. `React` and pure `Typescript` patterns like:

- apply the do not repeat yourself rule (DRY)
- divide to conquer rule a.k.a. promote small responsibility functions
- promote reusability
- encourage long term maintainable code

## Prefer Type and Interface over usage of `any`

Using `any` in TypeScript can be problematic for several reasons. Here are some insights and recommendations:

### ❌ Avoid Using `any` for Type Definitions

```ts
// This code uses `any` for type definitions, which defeats the purpose of TypeScript
const fetchUser = async (): Promise<any> => {
  return await fetch("https://api.users.com/1122").then((response) => response.json());
};

const processData = (data: any) => {
  console.log(data.name); // No type checking
  console.log(data.age); // No type checking
  // No intellisense support, high chance of runtime errors
};

const result: any = await fetchUser();
processData(result);

// Unclear structure of objects and functions
const user: any = { name: "Alice", age: 30 };
console.log(user.address); // No type checking, may cause runtime error
```

### ✅ Prefer Using Type or Interface for Type Definitions

```ts
// This code uses Type and Interface for type definitions, making it more readable and maintainable

// Prefer interface for object shapes
interface User {
  name: string;
  age: number;
  address?: string; // Optional property
}

// Use type for generic wrappers or complex aliases (e.g. Record, unions, literal types)
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string; // Optional property
}

const fetchUser = async (): Promise<ApiResponse<User>> => {
  const response = await fetch("https://api.example.com/data");
  const data: User = await response.json();
  return { data, status: response.status };
};

const processData = (response: ApiResponse<User>) => {
  if (response.error) {
    console.error(response.error);
    return;
  }

  const data = response.data;
  console.log(data.name); // Type checking
  console.log(data.age); // Type checking
  // Intellisense support, reducing the chance of runtime errors
};

const result: ApiResponse<User> = await fetchUser();
processData(result);

// Clear structure of objects and functions
const user: User = { name: "Alice", age: 30 };
console.log(user.address); // Type checking, avoids runtime errors
```

### ℹ️ Explanation

- **Avoid Using `any`:** Using `any` bypasses TypeScript's type-checking features, which can lead to several issues:
  - **Lack of Type Safety:** Without type-checking, errors related to incorrect types can go unnoticed until runtime, making debugging more difficult.
  - **Reduced Readability:** `any` makes it hard to understand what kind of data a variable is supposed to hold, reducing code clarity.
  - **Poor Maintainability:** As projects grow, the use of `any` can lead to more bugs and make the code harder to maintain.
  - **No Intellisense Support:** Development tools provide better support (like autocomplete and suggestions) when specific types are used.

- **Prefer interface for object shapes:** Use `interface` for object definitions in good examples; use `type` for unions, literal types, enums, or complex aliases (e.g. `Record<K, V>`).
- **Type Safety, Readability, Maintainability:** Clear type definitions ensure type safety, improve readability, and make the code easier to refactor, with better IDE support.

### Additional Resources

For more detailed information on why you should avoid using `any` in TypeScript and how to use more specific types instead, you can refer to these resources:

- [The Problem with Using 'Any' in TypeScript and What to Use Instead](https://upmostly.com/typescript/the-problem-with-using-any-in-typescript-and-what-to-use-instead)
- [Why You Should Avoid Using 'any' in TypeScript and How to Do It](https://dev.to/yatinchoudhary/why-you-should-avoid-using-any-in-typescript-and-how-to-do-it-3b5)
- [TypeScript: Avoid the Type Any](https://www.codiga.io/blog/typescript-avoid-type-any/)

## Avoid Overusing the Ternary Operator

### ❌ Avoid Overusing the Ternary Operator in a Single Expression

```tsx
// This function uses multiple ternary operators in a single expression, making it hard to read
enum Status {
  Loading,
  Error,
  NoData,
  DataLoaded,
}

const getStatusMessage = (status: Status): string => {
  return status === Status.Loading
    ? "Loading"
    : status === Status.Error
      ? "Error"
      : status === Status.NoData
        ? "No Data"
        : "Data Loaded";
};

// Usage
const statusMessage = getStatusMessage(Status.Loading);
console.log(statusMessage); // Output: Loading
```

### ✅ Prefer Using Early Returns for Multiple Conditions

```tsx
// This function uses early returns for better readability
enum Status {
  Loading,
  Error,
  NoData,
  DataLoaded,
}

const getStatusMessage = (status: Status): string => {
  if (status === Status.Loading) {
    return "Loading";
  }
  if (status === Status.Error) {
    return "Error";
  }
  if (status === Status.NoData) {
    return "No Data";
  }
  if (status === Status.DataLoaded) {
    return "Data Loaded";
  }
  return "Unknown Status";
};

// Usage
const statusMessage = getStatusMessage(Status.Loading);
console.log(statusMessage); // Output: Loading
```

### ℹ️ Explanation

- **Avoid Overcomplicating with Ternary Operators:** Using multiple ternary operators in a single expression can make the code hard to read and understand.
- **Improved Readability:** Using early returns makes the logic clearer and easier to follow, especially when dealing with more than two conditions.
- **Maintainability:** Clear and readable code is easier to maintain and debug.

## Prefer `const` Over `let` for Variable Declarations

### ❌ Avoid Using `let` When `const` Can Be Used

```tsx
// This code uses `let` even though the variable is never reassigned
let total = 0;
const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}

const isAuthenticated = true;
let greeting;

if (isAuthenticated) {
  greeting = "Welcome back!";
} else {
  greeting = "Hello, guest!";
}

console.log(greeting); // Output: Welcome back!
console.log(total); // Output: 15
```

### ✅ Prefer Using `const` To Promote Values That Do Not Change

```tsx
// This code correctly uses `const` and the reduce() method for immutability and readability
const numbers = [1, 2, 3, 4, 5];
const total = numbers.reduce((acc, num) => acc + num, 0);

// This code uses a pure function to avoid the use of `let`
const getGreeting = (isAuthenticated: boolean): string => {
  return isAuthenticated ? "Welcome back!" : "Hello, guest!";
};

const isAuthenticated = true;
const greeting = getGreeting(isAuthenticated);

console.log(greeting); // Output: Welcome back!
console.log(total); // Output: 15
```

### ℹ️ Explanation

- **Avoid Using `let` Unnecessarily:** Using `let` for variables that are not reassigned can be misleading. It implies that the value might change, which can cause confusion for other developers reading the code.
- **Use `const` for Immutable Values:** `const` should be used for variables that are not going to be reassigned. This makes it clear that the variable is intended to remain constant throughout its scope.
- **Use `reduce()` for Aggregation:** The `reduce()` method is a concise way to aggregate values in an array, enhancing readability and reducing the likelihood of errors.
- **Readability and Maintainability:** Using `const` and array methods like `reduce()` makes the code more readable and maintainable by signaling to developers that the variable's value will not change and providing a clear, functional approach to computation.

## Prefer `Array.includes()` Over Multiple Comparisons

### ❌ Avoid Using Multiple Comparisons in Conditional Statements

```tsx
// This code uses multiple comparisons in a single if statement
const value = "b";

if (value === "a" || value === "b" || value === "c") {
  console.log("Value is a, b, or c");
} else {
  console.log("Value is something else");
}
```

### ✅ Prefer Using `Array.includes()` for Multiple Comparisons

```tsx
// This code uses Array.includes() for a cleaner conditional statement
const value = "b";
const VALID_VALUES = ["a", "b", "c"];

if (VALID_VALUES.includes(value)) {
  console.log("Value is a, b, or c");
} else {
  console.log("Value is something else");
}
```

### ℹ️ Explanation

- **Avoid Multiple Comparisons:** Using multiple comparisons (e.g., `if (x === 'a' || x === 'b' || x === 'c')`) can make the code harder to read and maintain.
- **Use `Array.includes()`:** The `Array.includes()` method provides a cleaner and more readable way to check if a value is present in an array.
- **Readability and Maintainability:** Using `Array.includes()` enhances code readability and makes it easier to add or remove values from the condition, improving maintainability.

## Prefer Object Destructuring Over Positional Parameters

**When to apply:** For **any function or method that has more than one parameter** (i.e. 2 or more arguments), use the pattern below: a single parameter object, an interface defining it placed **immediately above** the function, and destructuring in the signature. During normalization or code review, treat every such function as a violation until refactored.

### ❌ Avoid Using Positional Parameters in Function Arguments

Avoid **any** function or method that takes **more than one parameter** as positional arguments. This includes two-parameter functions (e.g. `fn(a, b)`) as well as longer lists.

```tsx
// This code uses multiple positional parameters, including an optional one, making it less readable
const createUser = (firstName: string, middleName: string, lastName: string, age: number, email: string) => {
  // do something here to create the user...
};

// Usage
const user = createUser("John", undefined, "Doe", 30, "john.doe@example.com");
console.log(user); // Output: { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com' }
```

```tsx
// Also avoid: even two positional parameters are a violation
const formatRange = (start: number, end: number) => `${start}-${end}`;
```

### ✅ Prefer Object Destructuring for Function Arguments

```tsx
// This code uses object destructuring for better readability and flexibility
interface CreateUserArgs {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  middleName?: string; // Optional parameter
}

const createUser = ({ firstName, middleName, lastName, age, email }: CreateUserArgs) => {
  // do something here to create the user...
};

// Usage
const user = createUser({ firstName: "John", lastName: "Doe", age: 30, email: "john.doe@example.com" });
console.log(user); // Output: { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com' }
```

For a function with only two parameters, use the same pattern — interface above, single param, destructuring:

```tsx
interface FormatRangeArgs {
  start: number;
  end: number;
}
const formatRange = ({ start, end }: FormatRangeArgs) => `${start}-${end}`;
```

### ℹ️ Explanation

- **When to apply this rule:** Apply the Prefer pattern for **every** function or method that has **more than one parameter** (2+ arguments). One positional parameter is acceptable; two or more must use the single-argument object with an interface above and destructuring in the signature.
- **Avoid Multiple Positional Parameters:** Using multiple positional parameters, especially with optional ones, can make the function call less readable and more error-prone. You may need to pass `undefined` explicitly to skip the optional parameter, which is not intuitive.
- **Use Object Destructuring:** Using object destructuring for function parameters improves readability by clearly naming each parameter. This makes the function call more intuitive and less prone to errors.
- **Readability and Flexibility:** Destructuring enhances readability and allows for more flexibility in function calls, especially when dealing with optional parameters. It also makes the code easier to maintain and extend.
- **Colocate the parameter interface:** When an interface is defined only for a single method’s signature, place it **immediately above that method** so the signature is self-documented and the type stays next to its only consumer.

## Prefer `Array.some()` Over Checking `Array.find()` for Undefined

### ❌ Avoid Checking `Array.find()` for Undefined

```tsx
const items = [
  { id: 1, name: "Alice", isActive: false },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: true },
];

const activeItems = items.find((item) => item.isActive) !== undefined;
```

### ✅ Prefer Using `Array.some()` for Better Readability

```tsx
// Usage
const items = [
  { id: 1, name: "Alice", isActive: false },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: true },
];
// This code uses Array.some() for a more readable and concise solution
export const hasActiveItems = (items) => items.some((item) => item.isActive);
```

### ℹ️ Explanation

- **Avoid Using `Array.find()` for Existence Checks:** Using `Array.find()` to check for the presence of an item and then comparing the result to `undefined` can be verbose and less readable.
- **Use `Array.some()` for Existence Checks:** `Array.some()` is specifically designed to check if at least one element in the array meets the condition, making the code more concise and readable.
- **Readability and Efficiency:** `Array.some()` directly returns a boolean value, which makes the code cleaner and easier to understand. It also avoids the need for an explicit comparison with `undefined`, improving both readability and efficiency.

## Prefer Logging Errors Over Silencing Them in `try-catch` Blocks

### ❌ Avoid Silencing Errors in `try-catch` Blocks

```tsx
// This code catches errors but does nothing with them, making debugging difficult
const storeDataSync = (data: string) => {
  try {
    mySuperLocalApi(data);
  } catch (error: unknown) {
    // Error is silently caught
  }
};
```

### ✅ Prefer Logging Errors in `try-catch` Blocks

```tsx
// This code logs errors to the console and can be easily extended to log to external services like Sentry
const storeDataSync = (data: string) => {
  try {
    mySuperLocalApi(data);
  } catch (error: unknown) {
    console.error("Error storing data", error);
    // Optionally, log the error to an external service like Sentry
    // Sentry.captureException(error)
  }
};
```

### ℹ️ Explanation

- **Avoid Silencing Errors:** Silencing errors by catching them without any logging makes debugging and error tracking extremely difficult. Developers won't be aware that an error occurred.
- **Log Errors:** Always log errors to the console or, preferably, to an external monitoring service like Sentry. This helps in diagnosing issues and understanding the context of failures.
- **Readability and Maintainability:** Logging errors improves code readability and maintainability by making it clear where and why failures occur. This is especially important in production environments where silent failures can lead to critical issues being unnoticed.

## Prefer Flattening `try-catch` Blocks Over Using Nested `try-catch`

### ❌ Avoid Using Nested `try-catch` Blocks

```ts
// This code uses nested try-catch blocks, making it hard to read and maintain
const processData = (data: string) => {
  try {
    try {
      if (!data) {
        throw new Error("Data is required");
      }
      // Process data...
    } catch (innerError) {
      console.error("Inner error:", innerError);
      // Handle inner error...
    }
  } catch (outerError) {
    console.error("Outer error:", outerError);
    // Handle outer error...
  }
};

// Usage
processData("");
```

### ✅ Prefer Flattening `try-catch` Blocks

```ts
// This code flattens the try-catch blocks for better readability and maintainability
const processData = (data: string) => {
  try {
    if (!data) {
      throw new Error("Data is required");
    }
    // Process data...
  } catch (error) {
    console.error("Error:", error);
    // Handle error...
  }
};

// Usage
processData("");
```

### ℹ️ Explanation

- **Avoid Nested `try-catch` Blocks:** Using nested `try-catch` blocks can make the code difficult to read and maintain. It can also lead to confusion about which catch block handles which error.
- **Flatten `try-catch` Blocks:** Flattening the `try-catch` structure improves readability by reducing the nesting level and making the error handling logic clearer.
- **Readability and Maintainability:** A flatter structure is easier to understand and maintain. It ensures that errors are handled in a straightforward manner, reducing the complexity of the code.

## Avoid Re-throwing the Same Exception in `try-catch`

### ❌ Avoid Using `try-catch` to Simply Re-throw the Same Exception

```ts
const internalDataProcessing = (data?: string) => {
  if (!data) {
    throw new Error("Data is required");
  }
};

// This code catches an exception only to re-throw it, which is redundant
const processData = (data?: string) => {
  try {
    internalDataProcessing(data);
  } catch (error) {
    throw error; // Re-throwing the same exception
  }
};

// Usage
try {
  processData("");
} catch (error) {
  console.error("Caught error:", error);
}
```

### ✅ Prefer Handling or Logging the Exception Instead of Re-throwing

```ts
const internalDataProcessing = (data?: string) => {
  if (!data) {
    throw new Error("Data is required");
  }
};

// This code handles the exception by logging it
const processData = (data: string) => {
  try {
    internalDataProcessing(data);
  } catch (error) {
    console.error("Error processing data:", error);
    // Handle the error appropriately, e.g., return a default value, clean up resources or call external system like Sentry
  }
};

// Usage
processData("");
```

### ✅ Prefer Letting the Exception Propagate Naturally

```ts
const internalDataProcessing = (data?: string) => {
  if (!data) {
    throw new Error("Data is required");
  }
};

// This code lets the exception propagate naturally without catching it
const processData = (data: string) => {
  internalDataProcessing(data);
};

// Usage
try {
  processData("");
} catch (error) {
  console.error("Caught error:", error);
}
```

### ℹ️ Explanation

- **Avoid Redundant Re-throwing:** Catching an exception only to re-throw it without any additional handling or logging is redundant and adds unnecessary complexity to the code.
- **Handle or Log Exceptions:** Instead of re-throwing, handle the exception by logging it or taking appropriate action (e.g., returning a default value, cleaning up resources). This ensures that the error is properly managed and provides useful information for debugging.
- **Let Exceptions Propagate:** In some cases, it is better to let exceptions propagate naturally. This approach simplifies the code and allows higher-level functions to handle the exceptions, possibly with more context or additional error handling logic.
- **Readability and Maintainability:** Proper error handling improves readability by making it clear how errors are managed. It also enhances maintainability by ensuring that exceptions are logged or handled in a consistent manner, making the codebase more robust and easier to debug.

## Prefer Using `??` Over `||` for Handling `null` and `undefined`

### ❌ Avoid Using `||` to Handle `null` and `undefined` Exclusively

```ts
// This code uses || which can incorrectly handle falsy values like 0 or ''
const getDefault = (value?: number | string | null) => {
  return value || "default";
};

// Usage
console.log(getDefault(null)); // Output: 'default'
console.log(getDefault(undefined)); // Output: 'default'
console.log(getDefault(0)); // Output: 'default' (unintended)
console.log(getDefault("")); // Output: 'default' (unintended)
```

### ✅ Prefer Using `??` to Handle `null` and `undefined`

```ts
// This code uses ?? which correctly handles only null or undefined
const getDefault = (value?: number | string | null) => {
  return value ?? "default";
};

// Usage
console.log(getDefault(null)); // Output: 'default'
console.log(getDefault(undefined)); // Output: 'default'
console.log(getDefault(0)); // Output: 0 (intended)
console.log(getDefault("")); // Output: '' (intended)
```

### ℹ️ Explanation

- **Avoid Using `||` for Default Values:** Using the `||` operator to handle `null` and `undefined` can lead to incorrect handling of other falsy values like `0`, `''`, and `false`.
- **Use `??` for Nullish Coalescing:** The `??` operator (nullish coalescing) is designed to handle only `null` and `undefined` values, providing a more precise and intended behavior.
- **Correctness:** `??` ensures that only `null` and `undefined` are treated as needing a default value, whereas `||` would incorrectly replace valid falsy values.
- **Readability and Intent:** Using `??` makes the code more readable and clearly conveys the intent to handle only `null` and `undefined`, leading to fewer bugs and more maintainable code.

## Prefer Type Guards isNullish, isBlank from @lichens-innovation/ts-common

Use the type guards from `@lichens-innovation/ts-common` for null, undefined, and empty-string checks so conditions read naturally.

### ❌ Avoid Verbose null/undefined/Empty-String Checks

```ts
// Verbose and repetitive; intent is less obvious
if (value !== null && value !== undefined) {
  process(value);
}
if (input === null || input === undefined || input === "") {
  return fallback;
}
const label = name != null && name.trim() !== "" ? name : "Unknown";
```

### ✅ Prefer isNullish, isBlank and Their Negations for Readable Conditions

```ts
import { isNullish, isBlank, isNotBlank } from "@lichens-innovation/ts-common";

// Natural reading: "if value is not nullish"
if (!isNullish(value)) {
  process(value);
}
// Natural reading: "if input is blank (null, undefined, or empty/whitespace string)"
if (isBlank(input)) {
  return fallback;
}
const label = isNotBlank(name) ? name : "Unknown";
```

Use `isNullish(value)` for `value === null || value === undefined`; use `!isNullish(value)` for the opposite. Use `isBlank(value)` for null, undefined, or empty/whitespace-only string; use `isNotBlank(value)` when the value is present and has non-whitespace content (or `!isBlank(value)` if the package does not export `isNotBlank`).

### ℹ️ Explanation

- **Readability:** Type guards like `isNullish`, `isBlank`, and `isNotBlank` make conditions self-explanatory and reduce repetition.
- **Consistency:** Using them for these checks keeps the codebase consistent and easier to maintain.

## Prefer Explicit Time Periods (PeriodsInMS) from @lichens-innovation/ts-common

Use `PeriodsInMS` from `@lichens-innovation/ts-common` for durations in milliseconds instead of raw magic numbers (e.g. `5 * 60 * 1000`). This makes the intent (e.g. "5 minutes", "30 minutes") obvious at a glance.

### ❌ Avoid Magic Numbers for Durations in Milliseconds

```ts
staleTime: 5 * 60 * 1000,   // 5 minutes
gcTime: 30 * 60 * 1000,     // 30 minutes
```

### ✅ Prefer PeriodsInMS for Readable Time Periods

```ts
import { PeriodsInMS } from "@lichens-innovation/ts-common";

staleTime: 5 * PeriodsInMS.oneMinute,
gcTime: 30 * PeriodsInMS.oneMinute,
```

### ℹ️ Explanation

- **Readability:** `5 * PeriodsInMS.oneMinute` reads as "5 minutes" without decoding `60 * 1000`. Same for hours, seconds, etc.
- **Consistency:** Using the shared constant avoids typos and keeps duration definitions aligned across the codebase.

## Prefer Strict Inequality `!==` Over Loose Inequality `!=`

### ❌ Avoid Using `!=` for Inequality Comparisons

```ts
// This code uses != (loose inequality), which applies type coercion and can lead to surprising results
const value = 0;

if (value != null) {
  console.log("Value is not null or undefined");
}

// Loose inequality can treat different types as equal (e.g. 0 != '' is false, 0 !== '' is true)
const count = 0;
if (count != "") {
  console.log("Count is set");
}
```

### ✅ Prefer Using `!==` for Strict Inequality

```ts
// This code uses !== (strict inequality), which compares both value and type without coercion
const value = 0;

if (value !== null && value !== undefined) {
  console.log("Value is not null or undefined");
}

// Strict inequality compares type and value: 0 !== '' is true, so intent is clear
const count = 0;
if (count !== "" && count !== undefined) {
  console.log("Count is set");
}
```

### ℹ️ Explanation

- **Avoid Using `!=` (Loose Inequality):** The `!=` operator applies type coercion before comparing. Values of different types can be considered equal (e.g. `0 != ''`, `null != undefined`), which can hide bugs and make behavior harder to predict.
- **Prefer Using `!==` (Strict Inequality):** The `!==` operator compares both value and type without coercion. It matches TypeScript’s type system and makes the intended comparison explicit.
- **Consistency and Safety:** Using `!==` (and `===` for equality) throughout the codebase avoids coercion pitfalls, improves readability, and aligns with common lint rules (e.g. `eqeqeq`).

## Prefer Using Optional Parameters Over `Type | undefined`

### ❌ Avoid Using `param: Type | undefined` for Optional Parameters

```ts
// This code uses param: Type | undefined, making it less readable and more verbose
const greet = (name: string | undefined) => {
  const greeting = name !== undefined ? `Hello, ${name}!` : "Hello!";
  return greeting;
};

// Usage
console.log(greet(undefined)); // Output: 'Hello!'
console.log(greet("Alice")); // Output: 'Hello, Alice!'
```

### ✅ Prefer Using Optional Parameters with `param?: Type`

```ts
// This code uses param?: Type for a more concise and readable approach
const greet = (name?: string) => {
  const greeting = name ? `Hello, ${name}!` : "Hello!";
  return greeting;
};

// Usage
console.log(greet()); // Output: 'Hello!'
console.log(greet("Alice")); // Output: 'Hello, Alice!'
```

### ℹ️ Explanation

- **Avoid Using `param: Type | undefined` for Optional Parameters:** Declaring parameters as `Type | undefined` is verbose and less readable. It also makes the function signature more complex than necessary.
- **Use Optional Parameters with `param?: Type`:** Using the `param?: Type` syntax is more concise and directly indicates that the parameter is optional.
- **Readability and Simplicity:** The optional parameter syntax (`param?: Type`) is more readable and simpler, making the function signature clear and easy to understand.
- **Default Handling:** Optional parameters implicitly handle the `undefined` case, which reduces boilerplate code and potential errors.

## Prefer Using Explicit Numeric Values for TypeScript Enums

### ❌ Avoid Using Implicit Ordinal Values for Enums

```ts
// This code uses enums with implicit ordinal values
enum UserRole {
  Admin, // 0
  User, // 1
  Guest, // 2
}

const getUserRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return "Admin";
    case UserRole.User:
      return "User";
    case UserRole.Guest:
      return "Guest";
    default:
      return "Unknown";
  }
};

// Usage
console.log(getUserRole(UserRole.Admin)); // Output: 'Admin'
```

### ✅ Prefer Using Explicit Numeric Values for Enums

```ts
// This code uses enums with explicit numeric values for better clarity and stability
enum UserRole {
  Admin = 1,
  User = 2,
  Guest = 3,
}

const getUserRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return "Admin";
    case UserRole.User:
      return "User";
    case UserRole.Guest:
      return "Guest";
    default:
      return "Unknown";
  }
};

// Usage
console.log(getUserRole(UserRole.Admin)); // Output: 'Admin'
```

### ℹ️ Explanation

- **Avoid Using Implicit Ordinal Values:** Implicit ordinal values can lead to problems, especially when the enum is serialized and deserialized. If the enum definition changes (e.g., new values are added), the ordinal values can shift, causing inconsistencies and bugs.
- **Use Explicit Numeric Values:** Using explicit numeric values for enums ensures stability and clarity. Each enum member has a fixed value, which doesn't change when new members are added.
- **Serialization and Deserialization:** Explicit numeric values are more robust for serialization and deserialization. They remain consistent even if the enum is extended or modified over time, preventing potential data corruption or misinterpretation.
- **Readability and Maintainability:** Explicit values make the code more readable and maintainable by clearly indicating the intended value of each enum member. This reduces confusion and enhances code clarity.

## Prefer Using `useWindowDimensions` Hook Over `Dimensions.get` in React Native

### ❌ Avoid Using `Dimensions.get` for Getting Window Dimensions

```tsx
// this code uses Dimensions.get to get window dimensions, which can lead to issues with updates and readability
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export const DimensionInfoPanel = () => {
  const { width } = Dimensions.get("window"); // width retrieved using Dimensions.get

  return (
    <View style={[styles.container, { width }]}>
      <Text>Width: {width}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width, // width set using Dimensions.get
  },
});
```

### ✅ Prefer Using `useWindowDimensions` Hook for Getting Window Dimensions

```tsx
// this code uses the useWindowDimensions hook for getting window dimensions, making it more responsive and readable
import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export const DimensionInfoPanel = () => {
  const styles = useStyles();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text>Width: {width}</Text>
    </View>
  );
};

const useStyles = () => {
  const { width } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width, // width set using dynamic values from useWindowDimensions
    },
  });
};
```

### ℹ️ Explanation

- **Avoid Using `Dimensions.get`:**
  - **Static Values:** `Dimensions.get` provides static values that are not updated automatically when the screen orientation changes or when the window is resized. This can lead to issues where the component does not re-render with the correct dimensions.
  - **Readability:** Using `Dimensions.get` can make the code less readable and maintainable, as the dimensions are obtained outside of the component's render method and used globally.

- **Use `useWindowDimensions` Hook:**
  - **Dynamic Updates:** The `useWindowDimensions` hook provides updated dimensions dynamically. This means that whenever the window dimensions change (e.g., due to screen rotation), the component will re-render with the correct dimensions.
  - **Readability and Maintainability:** Using the hook makes the code cleaner and more maintainable. The dimensions are directly obtained within the component's render method, making it clear where they are being used.
  - **Recommended by React Native:** React Native recommends using the `useWindowDimensions` hook for handling responsive layouts, as it provides a more seamless and reactive way to manage dimension changes.

By following these best practices and using the `useWindowDimensions` hook, you can create components that are more responsive, readable, and maintainable.

## Prefer Using Early Returns Over Multiple Nested If-Then-Else

### ❌ Avoid Multiple Nested If-Then-Else Statements

```ts
// This code uses multiple nested if-then-else statements, making it harder to read and maintain
const updateUser = async (userId: string) => {
  if (userId) {
    const user = await getUserById(userId);
    if (user) {
      if (user.isActive) {
        if (user.hasPermissions) {
          user.lastUpdated = new Date();
          await saveUser(user);
        } else {
          console.log("User does not have permissions");
        }
      } else {
        console.log("User is not active");
      }
    } else {
      console.log("User not found");
    }
  } else {
    console.log("Invalid user ID");
  }
};
```

### ✅ Prefer Using Early Returns for Improved Readability and Maintainability

```ts
// This code uses early returns, making it more readable and easier to maintain
const updateUser = async (userId: string) => {
  if (!userId) {
    console.log("Invalid user ID");
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    console.log("User not found");
    return;
  }

  if (!user.isActive) {
    console.log("User is not active");
    return;
  }

  if (!user.hasPermissions) {
    console.log("User does not have permissions");
    return;
  }

  user.lastUpdated = new Date();
  await saveUser(user);
};
```

### ℹ️ Explanation

- **Avoid Multiple Nested If-Then-Else Statements:**
  - **Complexity:** Deeply nested if-else blocks make the code harder to read, understand, and maintain.
  - **Indentation Levels:** More levels of indentation can make the code visually cluttered and harder to follow.

- **Use Early Returns:**
  - **Readability:** Early returns simplify the logic by handling edge cases and exiting early, making the main flow of the function more straightforward.
  - **Maintainability:** By reducing the nesting level, the code becomes easier to understand and modify. It’s clear at a glance what conditions cause the function to exit early.
  - **Less Cluttered:** Early returns keep the main logic of the function at the same indentation level, making it easier to follow.

By following these best practices and using early returns, you can create code that is more readable, maintainable, and easier to understand.

### 📚 References:

- [The Return Early Pattern](https://www.linkedin.com/pulse/return-early-pattern-marny-lopez-eq6je/)
- [The Early Return Pattern in JavaScript](https://gomakethings.com/the-early-return-pattern-in-javascript/)

## Prefer Using Object Destructuring for readability and clarity

### ❌ Avoid Complex Interpolation Without Destructuring

```ts
// this code uses complex interpolation without destructuring, making it harder to read
interface AddArgs {
  a: number;
  b: number;
}
const add = ({ a, b }: AddArgs) => a + b;
const double = (n: number) => n * 2;

const obj = {
  level1: {
    level2: {
      level3: {
        value: null,
      },
    },
  },
};

const a = 5;
const b = 10;

const badInterpolationExample = `The sum of ${a} and ${b} is ${add({ a, b })}, the double of the sum is ${double(add({ a, b }))}, and the deep object value is ${obj?.level1?.level2?.level3?.value ?? "NA"}.`;
```

### ✅ Prefer Using Object Destructuring for Clarity

```ts
interface AddArgs {
  a: number;
  b: number;
}
const add = ({ a, b }: AddArgs) => a + b;
const double = (n: number) => n * 2;

const obj = {
  level1: {
    level2: {
      level3: {
        value: null,
      },
    },
  },
};

const a = 5;
const b = 10;

const sum = add({ a, b });
const doubledSum = double(sum);
const deepObjectValue = obj?.level1?.level2?.level3?.value ?? "NA";

const goodInterpolationExample = `The sum of ${a} and ${b} is ${sum}, the double of the sum is ${doubledSum}, and the deep object value is ${deepObjectValue}.`;
```

### ℹ️ Explanation

- **Avoid Complex Interpolation Without Destructuring:**
  - **Readability:** Directly accessing nested properties within a string interpolation can make the code difficult to read and understand, especially when the nested structure is complex.
  - **Maintainability:** If the structure of the object changes, updating all references within the string interpolation can be error-prone and time-consuming.

- **Use Object Destructuring:**
  - **Readability:** Destructuring simplifies the code by extracting nested properties into individual variables, making the string interpolation cleaner and more readable.
  - **Maintainability:** With destructuring, you only need to update the destructuring assignment if the object structure changes, which is easier to manage and reduces the risk of errors.

By following these best practices and using object destructuring, you can create code that is more readable, maintainable, and easier to understand.

## Prefer Extracting and Exporting Types over Inline Typing

### ❌ Avoid Using Inline Typing for Function Parameters

```tsx
// This code uses inline typing within the function parameters, making it less reusable and harder to maintain.

export const logBookViewItem = ({
  viewedItem,
  isOnline,
  origin,
  lastViewDate,
}: {
  viewedItem: StateBook | null;
  isOnline: boolean;
  origin?: BooksOrigin | null;
  lastViewDate?: Date;
}) => {
  // ...
};
```

### ✅ Prefer Extracting and Exporting Types for Reusability and Maintainability

```tsx
// This code extracts types into reusable and exportable interfaces (or types for unions/literals), improving readability, reusability, and maintainability.

export interface BookViewItemInfos {
  viewedItem: StateBook | null;
  isOnline: boolean;
  origin?: BooksOrigin | null;
  lastViewDate?: Date;
}

export const logBookViewItem = ({ viewedItem, isOnline, origin, lastViewDate }: BookViewItemInfos) => {
  // ...
};
```

### ℹ️ Explanation

- **Avoid Inline Typing:**
  - **Readability:** Inline typing within function parameters can clutter the function definition, making it harder to read and understand at a glance.
  - **Maintainability:** Inline types are less reusable and can lead to duplication across your codebase. If the type changes, you’ll need to update every instance of that inline type, increasing the risk of errors.

- **Prefer Extracted and Exported Types:**
  - **Prefer interface for object shapes** in good examples; use `type` for unions, literal types, enums, or complex aliases (e.g. `Record<K, V>`).
  - **Readability:** By extracting types into separate, named definitions (interface or type), you make the code cleaner and more readable. The function signature is easier to understand without the distraction of detailed type definitions.
  - **Reusability:** Extracted types can be reused across your application, reducing redundancy and making your codebase more DRY (Don’t Repeat Yourself).
  - **Maintainability:** When types are defined separately, updates can be made in one place, ensuring consistency and reducing the risk of introducing bugs.

By following these practices, you ensure that your TypeScript code is more maintainable, readable, and less prone to errors, leading to a more scalable and efficient codebase.

## Prefer Using TypeScript `Record` Utility Type over Custom Index Signatures

### ❌ Avoid Custom Index Signatures for Object Types

```tsx
// This code defines an object type with a custom index signature, making it less concise and clear.

export type ViewedItems = {
  [key: string]: Date;
};
```

### ✅ Prefer Using TypeScript `Record` Utility Type for Simplicity and Clarity

```tsx
// This code uses TypeScript's `Record` utility type, improving conciseness and clarity.

export type ViewedItems = Record<string, Date>;
```

### ℹ️ Explanation

When you use TypeScript's `Record` utility type, you gain several additional advantages over custom index signatures like `[key: string]: T`:

- **Strongly Typed Keys:**
  - **Record:** The `Record` utility type allows you to define keys with a specific type, not just `string`. For example, you can specify an `enum`, a union of string literals, or any other custom type as the keys.

    ```typescript
    type Status = "pending" | "completed" | "failed";
    export type TaskStatuses = Record<Status, Date>;
    ```

    In this example, `TaskStatuses` ensures that only `'pending'`, `'completed'`, or `'failed'` can be used as keys, providing stronger type safety.

  - **Custom Index Signature:** When using a custom index signature like `[key: string]: Date`, you are limited to using `string` or `number` as the key type. You can't easily enforce a specific set of keys.

- **Type Inference and Autocompletion:**
  - **Record:** When using `Record`, TypeScript provides better type inference and autocompletion in your IDE, which makes development faster and reduces the likelihood of errors. For instance, with `Record<Status, Date>`, your IDE will automatically suggest the valid keys (`'pending'`, `'completed'`, `'failed'`) as you type.
  - **Custom Index Signature:** With a custom index signature, you lose the ability to leverage TypeScript’s powerful autocompletion and inference for specific keys because the key is only typed as `string`.

- **Type Safety for Value Types:**
  - **Record:** The `Record` utility type ensures that all keys map to the same type of value. If you need to change the value type later, you only need to update it in one place, and TypeScript will enforce this type across all occurrences.
    ```typescript
    export type ViewedItems = Record<string, Date>;
    // Later, if you need to change Date to another type, like Date | null:
    export type ViewedItems = Record<string, Date | null>;
    ```
  - **Custom Index Signature:** While you can achieve similar results with a custom index signature, it's not as straightforward or expressive as using `Record`.

- **Reusability and Composition:**
  - **Record:** The `Record` type can be easily composed with other utility types, such as `Partial`, `Pick`, or `Omit`, to create more complex types that are still type-safe and easy to manage.
    ```typescript
    export type PartialViewedItems = Partial<Record<string, Date>>;
    ```
  - **Custom Index Signature:** Custom index signatures are more limited in this regard and may require more manual work to compose types.

Using `Record` over a custom index signature provides you with stronger type safety, better IDE support, and more flexibility in defining key-value pairs in your TypeScript code. This makes `Record` not only a more concise but also a more powerful and expressive way to handle object types in TypeScript.
By following these practices, you ensure that your TypeScript code is more maintainable, readable, and less prone to errors, leading to a more scalable and efficient codebase.

## Prefer Adding a Task Ticket ID to `TODO` Comments for Better Tracking

### ❌ Avoid Using `TODO` Comments Without a Ticket Reference

```tsx
// This code uses a TODO comment without referencing a ticket, making it harder to track the task's progress and follow up.

export const logBookViewItem = ({ viewedItem, isOnline, origin }: LogBookViewItemParams) => {
  if (!origin || !viewedItem || !viewedItem.id) {
    return;
  }

  const contentType = ""; // TODO

  logViewItem<BooksViewItemAnalytics>({
    item_id: viewedItem.id,
    item_name: viewedItem.title,
    content_type: contentType,
    origin,
  });
};
```

### ✅ Prefer Adding a Task Management Ticket ID to `TODO` Comments for Better Traceability

```tsx
// This code adds a project management software ticket number to the TODO comment, improving traceability and making it easier to track the task's progress.

export const logBookViewItem = ({ viewedItem, isOnline, origin }: LogBookViewItemParams) => {
  if (!origin || !viewedItem || !viewedItem.id) {
    return;
  }

  const contentType = ""; // TODO: JIRA-1234 - Determine the appropriate content type

  logViewItem<BooksViewItemAnalytics>({
    item_id: viewedItem.id,
    item_name: viewedItem.title,
    content_type: contentType,
    origin,
  });
};
```

### ℹ️ Explanation

- **Avoid TODO Comments Without References:**
  - **Traceability:** `TODO` comments without a ticket number are harder to track, making it easy for tasks to be forgotten or overlooked. This can lead to incomplete features or hidden technical debt in your codebase.
  - **Accountability:** Without a clear reference to a ticket, it’s difficult to assign responsibility for addressing the TODO or follow up on its progress.

- **Prefer Adding Ticket ID:**
  - **Traceability:** By adding a ticket number to your `TODO` comments, you ensure that every incomplete task is linked to a specific, trackable item in your project management system. This makes it easier to manage and prioritize tasks.
  - **Accountability:** With a ticket number, it’s clear who is responsible for completing the task, and it’s easier to follow up during code reviews or project status meetings.
  - **Documentation:** Adding a ticket number also serves as documentation for why the `TODO` exists, making it clear to others (or your future self) what needs to be done and why.

By following these practices, you ensure that your codebase remains organized and that tasks don't fall through the cracks, leading to better project management and smoother development workflows.

## Prefer Arrow Functions Over Function Declarations

Using arrow functions assigned to `const` keeps the codebase consistent, avoids `this` binding issues, and aligns with the rest of the reference (all examples use arrow functions). Use function declarations only when hoisting is required (e.g. recursive helpers before definition) or when the style guide explicitly allows it.

### ❌ Avoid Using `function` Declarations for Top-Level or Module-Scoped Logic

```ts
// Top-level or module-scoped logic using function declarations; less consistent with the rest of the codebase and can introduce this-binding surprises when passed as callbacks.

function formatUserName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

export function getDisplayStatus(status: Status): string {
  switch (status) {
    case Status.Active:
      return "Active";
    case Status.Pending:
      return "Pending";
    default:
      return "Unknown";
  }
}

const handleClick = () => {
  const label = formatUserName("Jane", "Doe"); // mixing styles
  console.log(getDisplayStatus(Status.Active));
};
```

### ✅ Prefer Arrow Functions Assigned to `const` for Consistency and Lexical `this`

```ts
// Arrow functions assigned to const; consistent style and no this-binding issues when passed as callbacks.

const formatUserName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const getDisplayStatus = (status: Status): string => {
  switch (status) {
    case Status.Active:
      return "Active";
    case Status.Pending:
      return "Pending";
    default:
      return "Unknown";
  }
};

const handleClick = () => {
  const label = formatUserName("Jane", "Doe");
  console.log(getDisplayStatus(Status.Active));
};
```

### ℹ️ Explanation

- **Avoid Function Declarations for General Logic:**
  - **Consistency:** The codebase and this reference use arrow functions throughout. Mixing `function` declarations with arrow functions reduces consistency and makes style decisions ambiguous.
  - **`this` binding:** When a `function` is passed as a callback (e.g. to event handlers or promises), its `this` depends on how it is called, which can lead to bugs. Arrow functions inherit `this` from the enclosing scope, which is usually what you want in React and modern TypeScript.

- **Prefer Arrow Functions Assigned to `const`:**
  - **Consistency:** Using `const fn = () => {}` everywhere (including exports) keeps one clear pattern and matches the examples in this document.
  - **Lexical `this`:** Arrow functions do not have their own `this`, so they are safe to pass as callbacks without binding.
  - **Scoping:** Assigning to `const` makes it clear the reference is not reassigned and keeps the temporal dead zone predictable.

- **Exceptions:** Use a `function` declaration when you need the function to be hoisted (e.g. a recursive helper that calls itself before its definition in the same block), or when a tool or style guide explicitly requires it. In React components, prefer arrow function components or `function` only when hoisting is necessary.

## Prefer Interfaces Over Types for Object Shapes

Prefer `interface` for object shapes (props, API responses, state). Use `type` only when it simplifies syntax or reduces complexity (unions, literal types, mapped types, `Record<K, V>`, etc.).

### ❌ Avoid Using `type` for Object Shapes When `interface` Fits

```ts
type UserProps = {
  id: string;
  name: string;
  onSave: (user: User) => void;
};

type ApiResponse = {
  data: User;
  status: number;
  error?: string;
};
```

### ✅ Prefer `interface`; Use `type` Only When It Simplifies Syntax

```ts
interface UserProps {
  id: string;
  name: string;
  onSave: (user: User) => void;
}

interface ApiResponse {
  data: User;
  status: number;
  error?: string;
}

// Use type for unions, literals, or aliases that are clearer as type
type Status = "pending" | "success" | "error";
type UserMap = Record<string, User>;
```

### ℹ️ Explanation

- **Interfaces for object shapes:** `interface` is the conventional and often more ergonomic choice for describing object shapes; it supports declaration merging and is widely used in React props and API contracts.
- **Types when they help:** Use `type` for unions, string/number literal unions, mapped types, `Record<K, V>`, or when the alias makes the code simpler. Do not force an object shape into a `type` when an `interface` is equally clear.

## Prefer Named Exports Over Default Exports

Prefer explicit named exports so that imports are consistent and refactoring is easier. Use `export default` only when required (e.g. framework entry points like Next.js pages, or when a library or tool expects a default export).

### ❌ Avoid `export default` Unless Required

```ts
// Component file
const MyComponent = () => <div>Hello</div>;
export default MyComponent;

// Another file — default import can be renamed arbitrarily, harder to search/grep
import MyComponent from "./MyComponent";
import SomethingElse from "./MyComponent"; // same export, different name
```

### ✅ Prefer Explicit Named Exports

```ts
// Component file
export const MyComponent = () => <div>Hello</div>;

// Another file — explicit name, consistent across the codebase
import { MyComponent } from "./MyComponent";
```

Use `export default` only when necessary (e.g. React lazy + default, or a framework convention). For components, hooks, utils, and types, prefer `export const` / `export interface` / `export type`.

### ℹ️ Explanation

- **Consistency and refactoring:** Named exports keep import names aligned with export names, making search and renames more predictable.
- **Explicit intent:** Named exports make it clear what a module exposes and avoid arbitrary default import names.
- **Exceptions:** Keep `export default` where the ecosystem requires it (e.g. some router or bundler entry points).
