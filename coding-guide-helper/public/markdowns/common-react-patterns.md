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

