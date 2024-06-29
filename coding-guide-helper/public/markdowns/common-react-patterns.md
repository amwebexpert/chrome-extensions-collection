- [Project coding standards](#project-coding-standards)
  - [the `useMemo` overusage](#the-usememo-overusage)
    - [❌ avoid premature memoizations through `useMemo`](#-avoid-premature-memoizations-through-usememo)
    - [✅ prefer simple computations](#-prefer-simple-computations)
    - [ℹ️ Explanations:](#ℹ️-explanations)
    - [📚 References](#-references)
  - [avoid `{renderThisOrThat()}` pattern](#avoid-renderthisorthat-pattern)
    - [❌ avoid inline template private renderers](#-avoid-inline-template-private-renderers)
    - [✅ prefer divide to conquer rule through small sub-components](#-prefer-divide-to-conquer-rule-through-small-sub-components)
    - [ℹ️ :information\_source: Explanation](#ℹ️-information_source-explanation)
    - [📚 References](#-references-1)
  - [single arrow function event handler](#single-arrow-function-event-handler)
    - [❌ avoid double arrows functions](#-avoid-double-arrows-functions)
    - [✅ prefer single arrow functions](#-prefer-single-arrow-functions)
    - [ℹ️ Explanation](#ℹ️-explanation)
  - [Promote pure typescript functions](#promote-pure-typescript-functions)
    - [❌ avoid inline unsharable code](#-avoid-inline-unsharable-code)
    - [✅ prefer pure typescript extracted logic](#-prefer-pure-typescript-extracted-logic)
    - [ℹ️ Explanation](#ℹ️-explanation-1)
  - [Avoid Misusing the `use` Prefix](#avoid-misusing-the-use-prefix)
    - [❌ Avoid Misusing the `use` Prefix for Non-Hook Functions](#-avoid-misusing-the-use-prefix-for-non-hook-functions)
    - [✅ Prefer a More Descriptive Name for Pure Functions](#-prefer-a-more-descriptive-name-for-pure-functions)
    - [ℹ️ Explanation](#ℹ️-explanation-2)
  - [Avoid Overusing the Ternary Operator](#avoid-overusing-the-ternary-operator)
    - [❌ Avoid Overusing the Ternary Operator in a Single Expression](#-avoid-overusing-the-ternary-operator-in-a-single-expression)
    - [✅ Prefer Using Early Returns for Multiple Conditions](#-prefer-using-early-returns-for-multiple-conditions)
    - [ℹ️ Explanation](#ℹ️-explanation-3)
  - [Avoid Simple Assignment in State Update Functions](#avoid-simple-assignment-in-state-update-functions)
    - [❌ Avoid Simple Assignment for State Updates Dependent on Current State](#-avoid-simple-assignment-for-state-updates-dependent-on-current-state)
    - [✅ Prefer Using Setter Function for State Updates Dependent on Current State](#-prefer-using-setter-function-for-state-updates-dependent-on-current-state)
    - [ℹ️ Explanation](#ℹ️-explanation-4)
  - [Prefer `const` Over `let` for Variable Declarations](#prefer-const-over-let-for-variable-declarations)
    - [❌ Avoid Using `let` When `const` Can Be Used](#-avoid-using-let-when-const-can-be-used)
    - [✅ Prefer Using `const` To Promote Values That Do Not Change](#-prefer-using-const-to-promote-values-that-do-not-change)
    - [ℹ️ Explanation](#ℹ️-explanation-5)
  - [Prefer `Array.includes()` Over Multiple Comparisons](#prefer-arrayincludes-over-multiple-comparisons)
    - [❌ Avoid Using Multiple Comparisons in Conditional Statements](#-avoid-using-multiple-comparisons-in-conditional-statements)
    - [✅ Prefer Using `Array.includes()` for Multiple Comparisons](#-prefer-using-arrayincludes-for-multiple-comparisons)
    - [ℹ️ Explanation](#ℹ️-explanation-6)
  - [Prefer External Filters and Sorters Over Inline Logic in Rendering](#prefer-external-filters-and-sorters-over-inline-logic-in-rendering)
    - [❌ Avoid Using Inline Logic for Filtering and Sorting in the Rendering Template](#-avoid-using-inline-logic-for-filtering-and-sorting-in-the-rendering-template)
    - [✅ Prefer Using External Filters and Sorters for Better Readability](#-prefer-using-external-filters-and-sorters-for-better-readability)
    - [ℹ️ Explanation](#ℹ️-explanation-7)
  - [Prefer Object Destructuring Over Multiple Positional Parameters](#prefer-object-destructuring-over-multiple-positional-parameters)
    - [❌ Avoid Using Multiple Positional Parameters in Function Arguments](#-avoid-using-multiple-positional-parameters-in-function-arguments)
    - [✅ Prefer Object Destructuring for Function Arguments](#-prefer-object-destructuring-for-function-arguments)
    - [ℹ️ Explanation](#ℹ️-explanation-8)
  - [Prefer External Utility Functions Over Complex Logic in the Rendering Template](#prefer-external-utility-functions-over-complex-logic-in-the-rendering-template)
    - [❌ Avoid Complex Logic in the Rendering Template](#-avoid-complex-logic-in-the-rendering-template)
    - [✅ Prefer Using External Utility Functions for Better Readability](#-prefer-using-external-utility-functions-for-better-readability)
    - [ℹ️ Explanation](#ℹ️-explanation-9)
  - [Prefer `Array.some()` Over Checking `Array.find()` for Undefined](#prefer-arraysome-over-checking-arrayfind-for-undefined)
    - [❌ Avoid Checking `Array.find()` for Undefined](#-avoid-checking-arrayfind-for-undefined)
    - [✅ Prefer Using `Array.some()` for Better Readability](#-prefer-using-arraysome-for-better-readability)
    - [ℹ️ Explanation](#ℹ️-explanation-10)
  - [Prefer Logging Errors Over Silencing Them in `try-catch` Blocks](#prefer-logging-errors-over-silencing-them-in-try-catch-blocks)
    - [❌ Avoid Silencing Errors in `try-catch` Blocks](#-avoid-silencing-errors-in-try-catch-blocks)
    - [✅ Prefer Logging Errors in `try-catch` Blocks](#-prefer-logging-errors-in-try-catch-blocks)
      - [ℹ️ Explanation](#ℹ️-explanation-11)
  - [Prefer Flattening `try-catch` Blocks Over Using Nested `try-catch`](#prefer-flattening-try-catch-blocks-over-using-nested-try-catch)
    - [❌ Avoid Using Nested `try-catch` Blocks](#-avoid-using-nested-try-catch-blocks)
    - [✅ Prefer Flattening `try-catch` Blocks](#-prefer-flattening-try-catch-blocks)
      - [ℹ️ Explanation](#ℹ️-explanation-12)
  - [Avoid Re-throwing the Same Exception in `try-catch`](#avoid-re-throwing-the-same-exception-in-try-catch)
    - [❌ Avoid Using `try-catch` to Simply Re-throw the Same Exception](#-avoid-using-try-catch-to-simply-re-throw-the-same-exception)
    - [✅ Prefer Handling or Logging the Exception Instead of Re-throwing](#-prefer-handling-or-logging-the-exception-instead-of-re-throwing)
    - [✅ Prefer Letting the Exception Propagate Naturally](#-prefer-letting-the-exception-propagate-naturally)
      - [ℹ️ Explanation](#ℹ️-explanation-13)
  - [Prefer Using `??` Over `||` for Handling `null` and `undefined`](#prefer-using--over--for-handling-null-and-undefined)
    - [❌ Avoid Using `||` to Handle `null` and `undefined` Exclusively](#-avoid-using--to-handle-null-and-undefined-exclusively)
    - [✅ Prefer Using `??` to Handle `null` and `undefined`](#-prefer-using--to-handle-null-and-undefined)
      - [ℹ️ Explanation](#ℹ️-explanation-14)
  - [Prefer Using Optional Parameters Over `Type | undefined`](#prefer-using-optional-parameters-over-type--undefined)
    - [❌ Avoid Using `param: Type | undefined` for Optional Parameters](#-avoid-using-param-type--undefined-for-optional-parameters)
    - [✅ Prefer Using Optional Parameters with `param?: Type`](#-prefer-using-optional-parameters-with-param-type)
      - [ℹ️ Explanation](#ℹ️-explanation-15)
  - [Prefer Using Explicit Numeric Values for TypeScript Enums](#prefer-using-explicit-numeric-values-for-typescript-enums)
    - [❌ Avoid Using Implicit Ordinal Values for Enums](#-avoid-using-implicit-ordinal-values-for-enums)
    - [✅ Prefer Using Explicit Numeric Values for Enums](#-prefer-using-explicit-numeric-values-for-enums)
      - [ℹ️ Explanation](#ℹ️-explanation-16)
  - [Prefer Using Hooks for Business Logic Over Returning React Components](#prefer-using-hooks-for-business-logic-over-returning-react-components)
    - [❌ Avoid Using Hooks to Return React Components](#-avoid-using-hooks-to-return-react-components)
    - [✅ Prefer Using Hooks for Business Logic and Keep Rendering Separate](#-prefer-using-hooks-for-business-logic-and-keep-rendering-separate)
      - [ℹ️ Explanation](#ℹ️-explanation-17)

# Project coding standards

This section list coding patterns promoted in the project. `React` and pure `Typescript` patterns like:
  - apply the do not repeat yourself rule (DRY)
  - divide to conquer rule a.k.a. promote small responsibility functions
  - promote reusability
  - encourage long term maintainable code

## the `useMemo` overusage

Memoizing primitive values in `React` is redundant as they are cheap to compare and `React` efficiently handles their updates without additional optimization. Also, most computed and derived values are fast: unless you’re creating or looping over thousands of objects, it’s probably not expensive.

### ❌ avoid premature memoizations through `useMemo`

```tsx
const productName = useMemo(() => route.params?.productName, [route.params?.productName])

const fullName = useMemo(
  () => `${firstName} ${lastName} (${age} years old)`,
  [firstName, lastName, age]
)
```

### ✅ prefer simple computations

```tsx
const productName = route.params?.productName

const fullName = `${firstName} ${lastName} (${age} years old)`
```

### ℹ️ Explanations:

Re-renders will cause recomputations of the code above the final return but usually, this isn’t a problem because most calculations are very fast. You should only rely on `useMemo` as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first.

### 📚 References

- [Don’t worry about re-renders (too much)](https://www.youtube.com/watch?v=4FhJkX18fS8&t=722s)
- [How to tell if a calculation is expensive?](https://react.dev/reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive)


## avoid `{renderThisOrThat()}` pattern

### ❌ avoid inline template private renderers

```typescript
const renderTextInputIcon = useCallback(() => {
      if (isPassword) {
        return (
          <TouchableWithoutFeedback onPress={onIconPressed}>
            <View style={styles.containerIcon}>
              {isSecuredTextEntryEnabled ? <EyeSlash ... /> : <Eye ... />}
            </View>
          </TouchableWithoutFeedback>
        )
      }

      return null
    }, [isPassword, isSecuredTextEntryEnabled, onIconPressed])

...

return (
  <View>
    {/** ... */}
    {renderTextInputIcon()}
    {/** ... */}
  </View>
)
```

### ✅ prefer divide to conquer rule through small sub-components

```typescript
return (
  <View>
    {/** ... */}
    <PressableToggleIcon isPassword={isPassword} onPress={onIconPressed}
      isSensitiveTextVisible={isSecuredTextEntryEnabled} />
    {/** ... */}
  </View>
)```
```

### ℹ️ :information_source: Explanation

- `useCallback` hook is meant to be used around _user interactions_ and not as a _divide to conquer_ pattern
- creating small dumb components:
  - removes template complexity
  - promotes potential re-usability
  - promotes separation of concerns

### 📚 References

- [3 React Mistakes, 1 App Killer](https://youtube.com/watch?v=QuLfCUh-iwI&si=JofynxnU-J58sA53)

## single arrow function event handler

### ❌ avoid double arrows functions

```tsx
// Note the double arrow functions (a.k.a. function factories)
// those are "function returning a function"
const onEditPress = (id: string) => () => {
   // ...
}
const onSharePress = (id: string) => () => {
   //...
}

//...

return (
  <>
    <View onPress={onEditPress(id)}>
      {/** ... */}
    </View>
    <View onPress={onSharePress(id)}>
      {/** ... */}
    </View>
  </>
)
```

### ✅ prefer single arrow functions

```tsx
const onEditPress = (id: string) => {
   //...
}
const onSharePress = (id: string) => {
   //...
}

// ...

return (
  <>
    <View onPress={() => onEditPress(id)}>
      {/** ... */}
    </View>
    <View onPress={() => onSharePress(id)}>
      {/** ... */}
    </View>
  </>
)
```

### ℹ️ Explanation

- Naming the handler `onNameOfEventPress` clearly indicates when the event is triggered.
- Passing a function factory (a function that returns another function) to `onPress` can be confusing because it’s not immediately clear that a factory is being passed instead of the actual event handler.
- Using a factory pattern makes the code harder to read and maintain, adding unnecessary complexity.

## Promote pure typescript functions

The most we can reduce the responsibilities of a function the most it becomes maintainable and this is also promoting potential re-usability.

### ❌ avoid inline unsharable code

```tsx
// a lot of code written directly inside a component becomes invisible from the outside
const total = useMemo(() => {
  return numbers.reduce((acc, value) => acc + value, 0)
}, [numbers])

const onMultiplyBy = useCallback((by: number) => {
  setNumbers(numbers.map((value) => value * by))
}, [numbers])

const fullName = useMemo(
  () => ({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName} (${age} years old)`,
  }),
  [firstName, lastName, age]
)

return (...)
```

### ✅ prefer pure typescript extracted logic

- inside `my-component.utils.ts` helpers file:

```tsx
//...
export const computeTotal = (numbers: number[] = []) =>
  numbers.reduce((acc, value) => acc + value, 0)

export const multiplyBy = (numbers: number[] = [], by: number = 1) =>
  numbers.map((value) => value * by)

type BuildPersonArgs = { firstName: string, lastName: string, age: number }
export const buildPersonFullName = (person: BuildPersonArgs) =>
  `${firstName} ${lastName} (${age} years old)`
```

- inside `my-component.tsx` component file:

```tsx
import { computeTotal, multiplyBy, buildPersonFullName } from 'my-component.utils.ts'
//...

const total = useMemo(() => computeTotal(numbers), [numbers])

const fullName = buildPersonFullName({ firstName, lastName, age })

const onMultiplyBy = useCallback(
  (by: number) => setNumbers(multiplyBy(numbers, by)),
  [numbers]
)

return (...)
```

### ℹ️ Explanation

Creating small, pure typescript functions:

- **Reduces Complexity:** Breaking down code into smaller, reusable functions makes your components easier to understand and manage.
- **Increases Reusability:** The functions you create can be used in different parts of your project, not just in the component where they were originally written. For example, you can use them in:
  - Other components
  - Custom hooks
  - Classes
  - Other utility functions
- **Separation of Concerns:** By separating the logic from the component, each part of your code has a single responsibility, making it easier to maintain and test.

## Avoid Misusing the `use` Prefix

### ❌ Avoid Misusing the `use` Prefix for Non-Hook Functions

```tsx
// This function is named like a React hook but does not use any hooks internally
const useCalculateDiscount = (price: number, discount: number) => {
  return price - (price * discount)
}

// Usage in a component
const Component = () => {
  const price = 100
  const discount = 0.1
  const discountedPrice = useCalculateDiscount(price, discount)

  return <TextView>Discounted Price: {discountedPrice}</TextView>
}
```

### ✅ Prefer a More Descriptive Name for Pure Functions

- inside `my-component.utils.ts` helpers file:

```tsx
// This function is correctly named to reflect that it's a pure utility function
export const calculateDiscount = (price: number, discount: number) => {
  return price - (price * discount)
}
```

- inside `my-component.tsx` component file:

```tsx
import { calculateDiscount } from 'my-component.utils.ts'

// Usage in a component
const Component = () => {
  const price = 100
  const discount = 0.1
  const discountedPrice = calculateDiscount(price, discount)

  return <TextView>Discounted Price: {discountedPrice}</TextView>
}
```

### ℹ️ Explanation

- **Avoid Misleading Names:** The `use` prefix is reserved for React hooks, which are special functions that use React features like state or lifecycle methods. Using `use` for a regular function can be confusing.
- **Descriptive Names:** Name your functions clearly to indicate their purpose. This helps other developers understand what the function does at a glance.
- **Developer Expectations**: Seeing the use prefix, a developer might mistakenly think the function can only be used inside a `React` component or another `hook`, not in plain `TypeScript` code like a `service` or a `store`.

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
    ? 'Loading'
    : status === Status.Error
    ? 'Error'
    : status === Status.NoData
    ? 'No Data'
    : 'Data Loaded'
}

// Usage
const statusMessage = getStatusMessage(Status.Loading)
console.log(statusMessage) // Output: Loading
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
    return 'Loading'
  }
  if (status === Status.Error) {
    return 'Error'
  }
  if (status === Status.NoData) {
    return 'No Data'
  }
  if (status === Status.DataLoaded) {
    return 'Data Loaded'
  }
  return 'Unknown Status'
}

// Usage
const statusMessage = getStatusMessage(Status.Loading)
console.log(statusMessage) // Output: Loading
```

### ℹ️ Explanation

- **Avoid Overcomplicating with Ternary Operators:** Using multiple ternary operators in a single expression can make the code hard to read and understand.
- **Improved Readability:** Using early returns makes the logic clearer and easier to follow, especially when dealing with more than two conditions.
- **Maintainability:** Clear and readable code is easier to maintain and debug.

## Avoid Simple Assignment in State Update Functions

### ❌ Avoid Simple Assignment for State Updates Dependent on Current State

```tsx
// This code uses a simple assignment for state update which can lead to issues
const addNumber = () => {
  const newNumber = numbers.length + 1
  setNumbers([...numbers, newNumber])
}

// Usage in a component
const Component = () => {
  const [numbers, setNumbers] = useState<number[]>([])

  return (
    <div>
      <button onClick={addNumber}>Add Number</button>
      <div>{numbers.join(', ')}</div>
    </div>
  )
}
```

### ✅ Prefer Using Setter Function for State Updates Dependent on Current State

```tsx
// This code uses the setter function for state update which ensures correctness
const addNumber = () => {
  setNumbers((currentNumbers) => [...currentNumbers, currentNumbers.length + 1])
}

// Usage in a component
const Component = () => {
  const [numbers, setNumbers] = useState<number[]>([])

  return (
    <div>
      <button onClick={addNumber}>Add Number</button>
      <div>{numbers.join(', ')}</div>
    </div>
  )
}
```

### ℹ️ Explanation

- **Avoid Simple Assignment:** Using a simple assignment (`setNumbers([...numbers, newNumber])`) can lead to issues because it relies on the current value of `numbers`. If the state is updated concurrently, the result might be incorrect.
- **Use Setter Function:** Using the setter function (`setNumbers((currentNumbers) => [...currentNumbers, currentNumbers.length + 1])`) ensures that the update is based on the latest state. This approach prevents potential bugs related to state being updated concurrently.
- **Correctness:** Using the setter function makes sure that the new state is computed correctly, even when multiple updates occur at the same time.
- **Maintainability:** This pattern is more robust and easier to understand, making the codebase more maintainable.

## Prefer `const` Over `let` for Variable Declarations

### ❌ Avoid Using `let` When `const` Can Be Used

```tsx
// This code uses `let` even though the variable is never reassigned
let total = 0
const numbers = [1, 2, 3, 4, 5]

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i]
}

const isAuthenticated = true
let greeting

if (isAuthenticated) {
  greeting = 'Welcome back!'
} else {
  greeting = 'Hello, guest!'
}

console.log(greeting) // Output: Welcome back!
console.log(total) // Output: 15
```

### ✅ Prefer Using `const` To Promote Values That Do Not Change

```tsx
// This code correctly uses `const` and the reduce() method for immutability and readability
const numbers = [1, 2, 3, 4, 5]
const total = numbers.reduce((acc, num) => acc + num, 0)

// This code uses a pure function to avoid the use of `let`
const getGreeting = (isAuthenticated: boolean): string => {
  return isAuthenticated ? 'Welcome back!' : 'Hello, guest!'
}

const isAuthenticated = true
const greeting = getGreeting(isAuthenticated)

console.log(greeting) // Output: Welcome back!
console.log(total) // Output: 15
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
const value = 'b'

if (value === 'a' || value === 'b' || value === 'c') {
  console.log('Value is a, b, or c')
} else {
  console.log('Value is something else')
}
```

### ✅ Prefer Using `Array.includes()` for Multiple Comparisons

```tsx
// This code uses Array.includes() for a cleaner conditional statement
const value = 'b'
const VALID_VALUES = ['a', 'b', 'c']

if (VALID_VALUES.includes(value)) {
  console.log('Value is a, b, or c')
} else {
  console.log('Value is something else')
}
```

### ℹ️ Explanation

- **Avoid Multiple Comparisons:** Using multiple comparisons (e.g., `if (x === 'a' || x === 'b' || x === 'c')`) can make the code harder to read and maintain.
- **Use `Array.includes()`:** The `Array.includes()` method provides a cleaner and more readable way to check if a value is present in an array.
- **Readability and Maintainability:** Using `Array.includes()` enhances code readability and makes it easier to add or remove values from the condition, improving maintainability.

## Prefer External Filters and Sorters Over Inline Logic in Rendering

### ❌ Avoid Using Inline Logic for Filtering and Sorting in the Rendering Template

```tsx
// This code uses inline logic for filtering and sorting in the render method
const Component = ({ items }) => {
  return (
    <ul>
      {items
        .filter(item => item.isActive && item.isAvailable)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
    </ul>
  )
}

// Usage
const items = [
  { id: 1, name: 'Alice', isActive: true },
  { id: 2, name: 'Bob', isActive: false },
  { id: 3, name: 'Charlie', isActive: true }
]

<Component items={items} />
```

### ✅ Prefer Using External Filters and Sorters for Better Readability

```tsx
// This code uses external functions for filtering and sorting (inside external pure .ts file)
export const canDisplayFilter = (item: MyItemType) => item.isActive && item.isAvailable
export const itemComparator = (a: MyItemType, b: MyItemType) => a.name.localeCompare(b.name)

// import the helpers above inside the component then use it
const Component = ({ items }) => {
  const displayItems = items
    .filter(canDisplayFilter)
    .sort(itemComparator)
  
  return (
    <ul>
      {displayItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

// Usage
const items = [
  { id: 1, name: 'Alice', isActive: true },
  { id: 2, name: 'Bob', isActive: false },
  { id: 3, name: 'Charlie', isActive: true }
]

<Component items={items} />
```

### ℹ️ Explanation

- **Avoid Inline Logic:** Using inline logic for filtering and sorting in the rendering method can make the component difficult to read and understand.
- **Use External Functions:** Moving filtering and sorting logic to separate functions makes the component cleaner and easier to read.
- **Readability and Maintainability:** Externalizing logic improves readability by keeping the rendering method focused on rendering, and it enhances maintainability by making the filtering and sorting logic reusable and testable.


## Prefer Object Destructuring Over Multiple Positional Parameters

### ❌ Avoid Using Multiple Positional Parameters in Function Arguments

```tsx
// This code uses multiple positional parameters, including an optional one, making it less readable
const createUser = (firstName: string, middleNameÉ: string, lastName: string, age: number, email: string) => {
  return {
    firstName,
    middleName,
    lastName,
    age,
    email
  }
}

// Usage
const user = createUser('John', undefined, 'Doe', 30, 'john.doe@example.com')
console.log(user) // Output: { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com' }
```

### ✅ Prefer Object Destructuring for Function Arguments

```tsx
// This code uses object destructuring for better readability and flexibility
type CreateUserArgs = {
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  middleName?: string // Optional parameter
}

const createUser = ({ firstName, middleName, lastName, age, email }: CreateUserArgs) => ({
    firstName,
    middleName,
    lastName,
    age,
    email
  })

// Usage
const user = createUser({ firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com' })
console.log(user) // Output: { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com' }
```

### ℹ️ Explanation

- **Avoid Multiple Positional Parameters:** Using multiple positional parameters, especially with optional ones, can make the function call less readable and more error-prone. You may need to pass `undefined` explicitly to skip the optional parameter, which is not intuitive.
- **Use Object Destructuring:** Using object destructuring for function parameters improves readability by clearly naming each parameter. This makes the function call more intuitive and less prone to errors.
- **Readability and Flexibility:** Destructuring enhances readability and allows for more flexibility in function calls, especially when dealing with optional parameters. It also makes the code easier to maintain and extend.

## Prefer External Utility Functions Over Complex Logic in the Rendering Template

### ❌ Avoid Complex Logic in the Rendering Template

```tsx
// This code uses complex logic directly in the render method, making it hard to read and maintain
const Component = ({ items }) => {
  return (
    <>
      {items?.length > 0 ? (
        <ul>
          {items
            .filter(item => item.isActive && item.isAvailable && item.name.startsWith('A'))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(item => (
              <li key={item.id}>{`${item.name} (${item.age} years old)`}</li>
            ))}
        </ul>
      ) : (
        <p>No active items starting with "A"</p>
      )}
    </>
  )
}

// Usage
const items = [
  { id: 1, name: 'Alice', isActive: true, isAvailable: true, age: 25 },
  { id: 2, name: 'Bob', isActive: false, isAvailable: true, age: 30 },
  { id: 3, name: 'Alex', isActive: true, isAvailable: false, age: 22 }
]

<Component items={items} />
```

### ✅ Prefer Using External Utility Functions for Better Readability

```tsx
// This code uses external utility functions for better readability and maintainability
type MyItemType = {
  id: number,
  name: string,
  isActive: boolean,
  isAvailable: boolean,
  age: number
}

export const canDisplayFilter = (item: MyItemType) => item.isActive && item.isAvailable && item.name.startsWith('A')
export const itemComparator = (a: MyItemType, b: MyItemType) => a.name.localeCompare(b.name)
export const formatItem = (item: MyItemType) => `${item.name} (${item.age} years old)`

// then inside the component (once the above functions have been imported)
type Props = { items: MyItemType[] }
const Component: FunctionComponent<Props> = ({ items }) => {
  const filteredAndSortedItems = items.filter(canDisplayFilter).sort(itemComparator)
  const hasItems = filteredAndSortedItems.length > 0

  if (!hasItems) {
    return <p>No active and available items</p>
  }

  return (
    <ul>
      {filteredAndSortedItems.map(item => (
        <li key={item.id}>{formatItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage
const items = [
  { id: 1, name: 'Alice', isActive: true, isAvailable: true, age: 25 },
  { id: 2, name: 'Bob', isActive: false, isAvailable: true, age: 30 },
  { id: 3, name: 'Alex', isActive: true, isAvailable: false, age: 22 }
]

<Component items={items} />
```

### ℹ️ Explanation

- **Avoid Complex Logic in the Rendering Template:** Placing complex filtering, sorting, and formatting logic directly in the render method can make the component hard to read and maintain.
- **Use External Utility Functions:** Moving this logic to external utility functions makes the component cleaner and more focused on rendering.
- **Early Return for Conditional Rendering:** Using an early return for cases where there are no items to display simplifies the component structure and avoids nested conditions.
- **Readability and Maintainability:** Using external functions improves readability by breaking down the logic into manageable, reusable pieces. This also makes the code easier to test and maintain.

## Prefer `Array.some()` Over Checking `Array.find()` for Undefined

### ❌ Avoid Checking `Array.find()` for Undefined

```tsx
const Component = ({ items }) => {
  // This code uses Array.find() and checks for undefined, making it less readable
  const activeItems = items.find(item => item.isActive) !== undefined

  return (
    <div>
      {activeItems ? <p>There are active items</p> : <p>No active items</p>}
    </div>
  )
}

// Usage
const items = [
  { id: 1, name: 'Alice', isActive: false },
  { id: 2, name: 'Bob', isActive: false },
  { id: 3, name: 'Charlie', isActive: true }
]

<Component items={items} />
```

### ✅ Prefer Using `Array.some()` for Better Readability

```tsx
// This code uses Array.some() for a more readable and concise solution
export const hasActiveItems = (items) => items.some(item => item.isActive)

// Usage in a component (once imported)
const Component = ({ items }) => {
  const hasActiveItemsToShow = hasActiveItems(items)

  return (
    <div>
      {hasActiveItemsToShow ? <p>There are active items</p> : <p>No active items</p>}
    </div>
  )
}

// Usage
const items = [
  { id: 1, name: 'Alice', isActive: false },
  { id: 2, name: 'Bob', isActive: false },
  { id: 3, name: 'Charlie', isActive: true }
]

<Component items={items} />
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
      mySuperLocalApi(data)
    } catch (error: unknown) {
      // Error is silently caught
    }
}
```

### ✅ Prefer Logging Errors in `try-catch` Blocks

```tsx
// This code logs errors to the console and can be easily extended to log to external services like Sentry
const storeDataSync = (data: string) => {
    try {
      mySuperLocalApi(data)
    } catch (error: unknown) {
      console.error('Error storing data', error)
      // Optionally, log the error to an external service like Sentry
      // Sentry.captureException(error)
    }
}
```

#### ℹ️ Explanation

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
        throw new Error('Data is required')
      }
      // Process data...
    } catch (innerError) {
      console.error('Inner error:', innerError)
      // Handle inner error...
    }
  } catch (outerError) {
    console.error('Outer error:', outerError)
    // Handle outer error...
  }
}

// Usage
processData('')
```

### ✅ Prefer Flattening `try-catch` Blocks

```ts
// This code flattens the try-catch blocks for better readability and maintainability
const processData = (data: string) => {
  try {
    if (!data) {
      throw new Error('Data is required')
    }
    // Process data...
  } catch (error) {
    console.error('Error:', error)
    // Handle error...
  }
}

// Usage
processData('')
```

#### ℹ️ Explanation

- **Avoid Nested `try-catch` Blocks:** Using nested `try-catch` blocks can make the code difficult to read and maintain. It can also lead to confusion about which catch block handles which error.
- **Flatten `try-catch` Blocks:** Flattening the `try-catch` structure improves readability by reducing the nesting level and making the error handling logic clearer.
- **Readability and Maintainability:** A flatter structure is easier to understand and maintain. It ensures that errors are handled in a straightforward manner, reducing the complexity of the code.

## Avoid Re-throwing the Same Exception in `try-catch`

### ❌ Avoid Using `try-catch` to Simply Re-throw the Same Exception

```ts
const internalDataProcessing = (data?: string) => {
    if (!data) {
      throw new Error('Data is required')
    }
}

// This code catches an exception only to re-throw it, which is redundant
const processData = (data?: string) => {
  try {
    internalDataProcessing(data)
  } catch (error) {
    throw error // Re-throwing the same exception
  }
}

// Usage
try {
  processData('')
} catch (error) {
  console.error('Caught error:', error)
}
```

### ✅ Prefer Handling or Logging the Exception Instead of Re-throwing

```ts
const internalDataProcessing = (data?: string) => {
    if (!data) {
      throw new Error('Data is required')
    }
}

// This code handles the exception by logging it
const processData = (data: string) => {
  try {
    internalDataProcessing(data)
  } catch (error) {
    console.error('Error processing data:', error)
    // Handle the error appropriately, e.g., return a default value, clean up resources or call external system like Sentry
  }
}

// Usage
processData('')
```

### ✅ Prefer Letting the Exception Propagate Naturally

```ts
const internalDataProcessing = (data?: string) => {
    if (!data) {
      throw new Error('Data is required')
    }
}

// This code lets the exception propagate naturally without catching it
const processData = (data: string) => {
    internalDataProcessing(data)
}

// Usage
try {
  processData('')
} catch (error) {
  console.error('Caught error:', error)
}
```

#### ℹ️ Explanation

- **Avoid Redundant Re-throwing:** Catching an exception only to re-throw it without any additional handling or logging is redundant and adds unnecessary complexity to the code.
- **Handle or Log Exceptions:** Instead of re-throwing, handle the exception by logging it or taking appropriate action (e.g., returning a default value, cleaning up resources). This ensures that the error is properly managed and provides useful information for debugging.
- **Let Exceptions Propagate:** In some cases, it is better to let exceptions propagate naturally. This approach simplifies the code and allows higher-level functions to handle the exceptions, possibly with more context or additional error handling logic.
- **Readability and Maintainability:** Proper error handling improves readability by making it clear how errors are managed. It also enhances maintainability by ensuring that exceptions are logged or handled in a consistent manner, making the codebase more robust and easier to debug.

## Prefer Using `??` Over `||` for Handling `null` and `undefined`

### ❌ Avoid Using `||` to Handle `null` and `undefined` Exclusively

```ts
// This code uses || which can incorrectly handle falsy values like 0 or ''
const getDefault = (value?: number | string | null) => {
  return value || 'default'
}

// Usage
console.log(getDefault(null)) // Output: 'default'
console.log(getDefault(undefined)) // Output: 'default'
console.log(getDefault(0)) // Output: 'default' (unintended)
console.log(getDefault('')) // Output: 'default' (unintended)
```

### ✅ Prefer Using `??` to Handle `null` and `undefined`

```ts
// This code uses ?? which correctly handles only null or undefined
const getDefault = (value?: number | string | null) => {
  return value ?? 'default'
}

// Usage
console.log(getDefault(null)) // Output: 'default'
console.log(getDefault(undefined)) // Output: 'default'
console.log(getDefault(0)) // Output: 0 (intended)
console.log(getDefault('')) // Output: '' (intended)
```

#### ℹ️ Explanation

- **Avoid Using `||` for Default Values:** Using the `||` operator to handle `null` and `undefined` can lead to incorrect handling of other falsy values like `0`, `''`, and `false`.
- **Use `??` for Nullish Coalescing:** The `??` operator (nullish coalescing) is designed to handle only `null` and `undefined` values, providing a more precise and intended behavior.
- **Correctness:** `??` ensures that only `null` and `undefined` are treated as needing a default value, whereas `||` would incorrectly replace valid falsy values.
- **Readability and Intent:** Using `??` makes the code more readable and clearly conveys the intent to handle only `null` and `undefined`, leading to fewer bugs and more maintainable code.

## Prefer Using Optional Parameters Over `Type | undefined`

### ❌ Avoid Using `param: Type | undefined` for Optional Parameters

```ts
// This code uses param: Type | undefined, making it less readable and more verbose
const greet = (name: string | undefined) => {
  const greeting = name !== undefined ? `Hello, ${name}!` : 'Hello!'
  return greeting
}

// Usage
console.log(greet(undefined)) // Output: 'Hello!'
console.log(greet('Alice')) // Output: 'Hello, Alice!'
```

### ✅ Prefer Using Optional Parameters with `param?: Type`

```ts
// This code uses param?: Type for a more concise and readable approach
const greet = (name?: string) => {
  const greeting = name ? `Hello, ${name}!` : 'Hello!'
  return greeting
}

// Usage
console.log(greet()) // Output: 'Hello!'
console.log(greet('Alice')) // Output: 'Hello, Alice!'
```

#### ℹ️ Explanation

- **Avoid Using `param: Type | undefined` for Optional Parameters:** Declaring parameters as `Type | undefined` is verbose and less readable. It also makes the function signature more complex than necessary.
- **Use Optional Parameters with `param?: Type`:** Using the `param?: Type` syntax is more concise and directly indicates that the parameter is optional.
- **Readability and Simplicity:** The optional parameter syntax (`param?: Type`) is more readable and simpler, making the function signature clear and easy to understand.
- **Default Handling:** Optional parameters implicitly handle the `undefined` case, which reduces boilerplate code and potential errors.

## Prefer Using Explicit Numeric Values for TypeScript Enums

### ❌ Avoid Using Implicit Ordinal Values for Enums

```ts
// This code uses enums with implicit ordinal values
enum UserRole {
  Admin,  // 0
  User,   // 1
  Guest   // 2
}

const getUserRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return 'Admin'
    case UserRole.User:
      return 'User'
    case UserRole.Guest:
      return 'Guest'
    default:
      return 'Unknown'
  }
}

// Usage
console.log(getUserRole(UserRole.Admin)) // Output: 'Admin'
```

### ✅ Prefer Using Explicit Numeric Values for Enums

```ts
// This code uses enums with explicit numeric values for better clarity and stability
enum UserRole {
  Admin = 1,
  User = 2,
  Guest = 3
}

const getUserRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return 'Admin'
    case UserRole.User:
      return 'User'
    case UserRole.Guest:
      return 'Guest'
    default:
      return 'Unknown'
  }
}

// Usage
console.log(getUserRole(UserRole.Admin)) // Output: 'Admin'
```

#### ℹ️ Explanation

- **Avoid Using Implicit Ordinal Values:** Implicit ordinal values can lead to problems, especially when the enum is serialized and deserialized. If the enum definition changes (e.g., new values are added), the ordinal values can shift, causing inconsistencies and bugs.
- **Use Explicit Numeric Values:** Using explicit numeric values for enums ensures stability and clarity. Each enum member has a fixed value, which doesn't change when new members are added.
- **Serialization and Deserialization:** Explicit numeric values are more robust for serialization and deserialization. They remain consistent even if the enum is extended or modified over time, preventing potential data corruption or misinterpretation.
- **Readability and Maintainability:** Explicit values make the code more readable and maintainable by clearly indicating the intended value of each enum member. This reduces confusion and enhances code clarity.


## Prefer Using Hooks for Business Logic Over Returning React Components

### ❌ Avoid Using Hooks to Return React Components

```tsx
const useMySuperBoostedHook = () => {
  const [theValue, setTheValue] = useState('')

  const onUpdate = (data: DataStructure) => {
    // ...
  }

  //...

  const onMessage = (message: Message) => {
    // ...  
  }

  const MyReturnedComponentFromHook = (
    <HookGeneratedComponent
      value={theValue}
      onMessage={onMessage}
      onUpdate={onUpdate}
    />
  )

  return { MyReturnedComponentFromHook }
}
```

### ✅ Prefer Using Hooks for Business Logic and Keep Rendering Separate

```tsx
const useMySuperBoostedHook = () => {
  const [theValue, setTheValue] = useState('')

  const onUpdate = (data: DataStructure) => {
    // ...
  }

  //...

  const onMessage = (message: Message) => {
    // ...  
  }

  return { theValue, onUpdate, onMessage }
}

// then inside the component
const Component = () => {
  const { theValue, onUpdate, onMessage } = useMySuperBoostedHook();

  //...

  return (
    <HookGeneratedComponent
      value={theValue}
      onMessage={onMessage}
      onUpdate={onUpdate}
    />
  );
};

export default Component;
```

#### ℹ️ Explanation

- **Avoid Using Hooks to Return Components:** Mixing business logic with rendering inside a hook breaks the separation of concerns. Hooks should manage reusable logic, not return components.
- **Use Hooks for Business Logic:** Hooks should handle business logic, such as state management or side effects, and return data that can be used by components.
- **Keep Rendering Separate:** Define rendering logic in React components. This keeps the concerns of data handling and UI rendering separate, making the codebase more maintainable and easier to understand.
- **Simpler Unit Testing:** Keeping hooks focused on logic and components focused on rendering makes unit testing simpler. You can test the hook's logic independently from the UI, leading to clearer and more maintainable tests.

