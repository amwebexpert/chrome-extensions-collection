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
- 