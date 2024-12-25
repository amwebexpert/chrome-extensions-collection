- [Project React coding standards](#project-react-coding-standards)
  - [The `useMemo` overusage](#the-usememo-overusage)
    - [❌ avoid premature memoizations through `useMemo`](#-avoid-premature-memoizations-through-usememo)
    - [✅ prefer simple computations](#-prefer-simple-computations)
    - [ℹ️ Explanations:](#ℹ️-explanations)
    - [📚 References](#-references)
  - [Avoid `useCallback` missusage](#avoid-usecallback-missusage)
    - [❌ avoid inline template private renderers wrapped by useCallback](#-avoid-inline-template-private-renderers-wrapped-by-usecallback)
    - [✅ prefer divide to conquer rule through small sub-components](#-prefer-divide-to-conquer-rule-through-small-sub-components)
    - [ℹ️ Explanation](#ℹ️-explanation)
    - [📚 References](#-references-1)
  - [Avoid `{renderXyz()}` rendering template anti-pattern](#avoid-renderxyz-rendering-template-anti-pattern)
    - [❌ avoid inline template private renderers](#-avoid-inline-template-private-renderers)
    - [✅ prefer divide to conquer rule through small sub-components](#-prefer-divide-to-conquer-rule-through-small-sub-components-1)
    - [ℹ️ Explanation](#ℹ️-explanation-1)
    - [📚 References](#-references-2)
  - [Single arrow function event handler](#single-arrow-function-event-handler)
    - [❌ avoid double arrows functions](#-avoid-double-arrows-functions)
    - [✅ prefer single arrow functions](#-prefer-single-arrow-functions)
    - [ℹ️ Explanation](#ℹ️-explanation-2)
  - [Promote pure typescript functions](#promote-pure-typescript-functions)
    - [❌ avoid inline unsharable code](#-avoid-inline-unsharable-code)
    - [✅ prefer pure typescript extracted logic](#-prefer-pure-typescript-extracted-logic)
    - [ℹ️ Explanation](#ℹ️-explanation-3)
  - [Avoid Misusing the `use` Prefix](#avoid-misusing-the-use-prefix)
    - [❌ Avoid Misusing the `use` Prefix for Non-Hook Functions](#-avoid-misusing-the-use-prefix-for-non-hook-functions)
    - [✅ Prefer a More Descriptive Name for Pure Functions](#-prefer-a-more-descriptive-name-for-pure-functions)
    - [ℹ️ Explanation](#ℹ️-explanation-4)
  - [Avoid Simple Assignment in State Update Functions](#avoid-simple-assignment-in-state-update-functions)
    - [❌ Avoid Simple Assignment for State Updates Dependent on Current State](#-avoid-simple-assignment-for-state-updates-dependent-on-current-state)
    - [✅ Prefer Using Setter Function for State Updates Dependent on Current State](#-prefer-using-setter-function-for-state-updates-dependent-on-current-state)
    - [ℹ️ Explanation](#ℹ️-explanation-5)
  - [Prefer External Filters and Sorters Over Inline Logic in Rendering](#prefer-external-filters-and-sorters-over-inline-logic-in-rendering)
    - [❌ Avoid Using Inline Logic for Filtering and Sorting in the Rendering Template](#-avoid-using-inline-logic-for-filtering-and-sorting-in-the-rendering-template)
    - [✅ Prefer Using External Filters and Sorters for Better Readability](#-prefer-using-external-filters-and-sorters-for-better-readability)
    - [ℹ️ Explanation](#ℹ️-explanation-6)
  - [Prefer External Utility Functions Over Complex Logic in the Rendering Template](#prefer-external-utility-functions-over-complex-logic-in-the-rendering-template)
    - [❌ Avoid Complex Logic in the Rendering Template](#-avoid-complex-logic-in-the-rendering-template)
    - [✅ Prefer Using External Utility Functions for Better Readability](#-prefer-using-external-utility-functions-for-better-readability)
    - [ℹ️ Explanation](#ℹ️-explanation-7)
  - [Prefer Using Hooks for Business Logic Over Returning React Components](#prefer-using-hooks-for-business-logic-over-returning-react-components)
    - [❌ Avoid Using Hooks to Return React Components](#-avoid-using-hooks-to-return-react-components)
    - [✅ Prefer Using Hooks for Business Logic and Keep Rendering Separate](#-prefer-using-hooks-for-business-logic-and-keep-rendering-separate)
    - [ℹ️ Explanation](#ℹ️-explanation-8)
  - [Prefer Using `gap`, `rowGap`, and `columnGap` Over `margin` or `padding` in React Native](#prefer-using-gap-rowgap-and-columngap-over-margin-or-padding-in-react-native)
    - [❌ Avoid Using `margin` or `padding` for Spacing Between Elements](#-avoid-using-margin-or-padding-for-spacing-between-elements)
    - [✅ Prefer Using `gap`, `rowGap`, and `columnGap` for Spacing Between Elements](#-prefer-using-gap-rowgap-and-columngap-for-spacing-between-elements)
    - [ℹ️ Explanation](#ℹ️-explanation-9)
  - [Prefer Using Early Returns for Simplified Rendering in React Components](#prefer-using-early-returns-for-simplified-rendering-in-react-components)
    - [❌ Avoid Complex Conditional Rendering with Nested Ternaries](#-avoid-complex-conditional-rendering-with-nested-ternaries)
    - [✅ Prefer Using Early Returns for Improved Readability and Maintainability](#-prefer-using-early-returns-for-improved-readability-and-maintainability)
    - [ℹ️ Explanation](#ℹ️-explanation-10)
    - [📚 Additional Resources](#-additional-resources)
  - [Prefer Breaking Down `<GodComponents />` into Subcomponents](#prefer-breaking-down-godcomponents--into-subcomponents)
    - [❌ Avoid Complex Components with Excessive Responsibilities](#-avoid-complex-components-with-excessive-responsibilities)
    - [✅ Prefer Breaking Down God Components into Smaller Subcomponents](#-prefer-breaking-down-god-components-into-smaller-subcomponents)
    - [ℹ️ Explanation](#ℹ️-explanation-11)
    - [📚 Additional Resources](#-additional-resources-1)
  - [Avoid Numeric Index for the Key Value of a React Element](#avoid-numeric-index-for-the-key-value-of-a-react-element)
    - [❌ Avoid direct index usage as key](#-avoid-direct-index-usage-as-key)
    - [✅ Prefer a unique identifier](#-prefer-a-unique-identifier)
    - [ℹ️ Why is this better?](#ℹ️-why-is-this-better)
  - [Prefer react-native `Pressable` Over `TouchableOpacity`](#prefer-react-native-pressable-over-touchableopacity)
    - [❌ Avoid TouchableOpacity usage](#-avoid-touchableopacity-usage)
    - [✅ Prefer Pressable](#-prefer-pressable)
    - [ℹ️ Why is this better?](#ℹ️-why-is-this-better-1)
  - [Prefer Fragments Over DOM Nodes](#prefer-fragments-over-dom-nodes)
    - [❌ Avoid DOM Nodes for Grouping](#-avoid-dom-nodes-for-grouping)
    - [✅ Prefer Fragments](#-prefer-fragments)
    - [ℹ️ Explanations](#ℹ️-explanations-1)
  - [Use React Fragment Shorthand](#use-react-fragment-shorthand)
    - [❌ Avoid useless verbose Fragment tag](#-avoid-useless-verbose-fragment-tag)
    - [✅ Prefer Fragment shorthand syntax](#-prefer-fragment-shorthand-syntax)
    - [ℹ️ Explanations](#ℹ️-explanations-2)
  - [Prefer Props Destructuring Over Direct Props Access](#prefer-props-destructuring-over-direct-props-access)
    - [❌ Avoid Using Direct Props Access](#-avoid-using-direct-props-access)
    - [✅ Prefer Props Destructuring](#-prefer-props-destructuring)
    - [ℹ️ Explanations](#ℹ️-explanations-3)
  - [Set Default Values While Destructuring Props](#set-default-values-while-destructuring-props)
    - [❌ Avoid Setting Defaults After Destructuring](#-avoid-setting-defaults-after-destructuring)
    - [✅ Prefer Setting Defaults During Destructuring](#-prefer-setting-defaults-during-destructuring)
    - [ℹ️ Explanations](#ℹ️-explanations-4)
  - [Drop String Props Curly Braces](#drop-string-props-curly-braces)
    - [❌ Avoid useless curly braces for string props](#-avoid-useless-curly-braces-for-string-props)
    - [✅ Prefer direct string assignment for string props](#-prefer-direct-string-assignment-for-string-props)
    - [ℹ️ Explanations](#ℹ️-explanations-5)
  - [Use explicit boolean conditions for conditional rendering](#use-explicit-boolean-conditions-for-conditional-rendering)
    - [❌ Avoid implicit boolean conversion with non-boolean values](#-avoid-implicit-boolean-conversion-with-non-boolean-values)
    - [✅ Prefer explicit boolean conditions](#-prefer-explicit-boolean-conditions)
    - [ℹ️ Explanations](#ℹ️-explanations-6)
  - [Move data outside the component for cleaner code](#move-data-outside-the-component-for-cleaner-code)
    - [❌ Avoid keeping unnecessary data inside the component](#-avoid-keeping-unnecessary-data-inside-the-component)
    - [✅ Prefer moving static data and functions outside the component](#-prefer-moving-static-data-and-functions-outside-the-component)
    - [ℹ️ Explainations](#ℹ️-explainations)
  - [Store the Selected Item by ID](#store-the-selected-item-by-id)
    - [❌ Avoid storing the entire item](#-avoid-storing-the-entire-item)
    - [✅ Prefer storing the item ID](#-prefer-storing-the-item-id)
    - [ℹ️ Explanation](#ℹ️-explanation-12)
  - [Clarify the Distinction Between Initial State and Current State](#clarify-the-distinction-between-initial-state-and-current-state)
    - [❌ Avoid unclear naming for state variables](#-avoid-unclear-naming-for-state-variables)
    - [✅ Prefer clear naming to differentiate initial state and current state](#-prefer-clear-naming-to-differentiate-initial-state-and-current-state)
    - [ℹ️ Explaination](#ℹ️-explaination)
  - [Always Clean Up in Your `useEffect` Hooks](#always-clean-up-in-your-useeffect-hooks)
    - [❌ Avoid forgetting to clean up side effects](#-avoid-forgetting-to-clean-up-side-effects)
    - [✅ Prefer cleaning up side effects with a cleanup function](#-prefer-cleaning-up-side-effects-with-a-cleanup-function)
    - [ℹ️ Explaination](#ℹ️-explaination-1)
  - [Prefer Functions Over Custom Hooks](#prefer-functions-over-custom-hooks)
    - [❌ Avoid creating unnecessary custom hooks](#-avoid-creating-unnecessary-custom-hooks)
    - [✅ Prefer using plain functions instead](#-prefer-using-plain-functions-instead)
    - [ℹ️ Explanation](#ℹ️-explanation-13)
  - [Use `ReactNode` instead of `JSX.Element | null | undefined`](#use-reactnode-instead-of-jsxelement--null--undefined)
    - [❌ Avoid typing props with JSX.Element | null | undefined](#-avoid-typing-props-with-jsxelement--null--undefined)
    - [✅ Prefer using `ReactNode` for more compact code](#-prefer-using-reactnode-for-more-compact-code)
    - [ℹ️ Explanation](#ℹ️-explanation-14)
  - [Simplify Typing of Components Expecting Children Props](#simplify-typing-of-components-expecting-children-props)
    - [❌ Avoid manually typing the children prop](#-avoid-manually-typing-the-children-prop)
    - [✅ Prefer using PropsWithChildren for typing children props](#-prefer-using-propswithchildren-for-typing-children-props)
    - [ℹ️ Explanation](#ℹ️-explanation-15)
  - [Specify Types Explicitly in useState, useRef, etc.](#specify-types-explicitly-in-usestate-useref-etc)
    - [❌ Avoid omitting types when they can't be inferred](#-avoid-omitting-types-when-they-cant-be-inferred)
    - [✅ Prefer specifying types explicitly when they can't be inferred](#-prefer-specifying-types-explicitly-when-they-cant-be-inferred)
    - [ℹ️ Explanation](#ℹ️-explanation-16)
  - [Use ElementRef Type Helper for Typing Refs](#use-elementref-type-helper-for-typing-refs)
    - [❌ Avoid typing refs directly with element type names](#-avoid-typing-refs-directly-with-element-type-names)
    - [✅ Prefer using the ElementRef type helper for typing refs](#-prefer-using-the-elementref-type-helper-for-typing-refs)
    - [ℹ️ Explanation](#ℹ️-explanation-17)

# Project React coding standards

This section outlines the coding patterns recommended for the project, focusing on both `React` and pure `TypeScript` practices:

- **Apply the DRY Principle (Don't Repeat Yourself)**: Strive to reduce code duplication by creating reusable components and functions.  
- **Divide and Conquer**: Break down complex problems into smaller, more manageable functions, each with a single responsibility.
- **Promote Reusability**: Develop components and functions that can be reused across different parts of the application, enhancing consistency and reducing redundancy.
- **Encourage Maintainability**: Write code that is easy to understand, modify, and extend, ensuring long-term maintainability and reducing technical debt.

By adhering to these principles, the project will benefit from cleaner, more efficient, and more sustainable code.

## The `useMemo` overusage

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


## Avoid `useCallback` missusage

### ❌ avoid inline template private renderers wrapped by useCallback

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

### ℹ️ Explanation

- `useCallback` hook is meant to be used around _user interactions_ and not as a _divide to conquer_ pattern
- creating small dumb components:
  - removes template complexity
  - promotes potential re-usability
  - promotes separation of concerns

### 📚 References

- [3 React Mistakes, 1 App Killer](https://youtube.com/watch?v=QuLfCUh-iwI&si=JofynxnU-J58sA53)

## Avoid `{renderXyz()}` rendering template anti-pattern

### ❌ avoid inline template private renderers

```typescript
const renderTextInputIcon = () => {
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
}

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

### ℹ️ Explanation

Creating small dumb components:
- removes template complexity
- promotes potential re-usability
- promotes separation of concerns

### 📚 References

- [3 React Mistakes, 1 App Killer](https://youtube.com/watch?v=QuLfCUh-iwI&si=JofynxnU-J58sA53)

## Single arrow function event handler

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

type MultiplyByArgs = { numbers?: number[], by?: number }
export const multiplyBy = ({ numbers = [], by = 1 }: MultiplyByArgs) =>
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
  (by: number) => setNumbers(multiplyBy({numbers, by})),
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
type CalculateDiscountArgs = {
  price: number
  discount: number
}
export const calculateDiscount = ({ price, discount }: CalculateDiscountArgs) => {
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
  const discountedPrice = calculateDiscount({ price, discount })

  return <TextView>Discounted Price: {discountedPrice}</TextView>
}
```

### ℹ️ Explanation

- **Avoid Misleading Names:** The `use` prefix is reserved for React hooks, which are special functions that use React features like state or lifecycle methods. Using `use` for a regular function can be confusing.
- **Descriptive Names:** Name your functions clearly to indicate their purpose. This helps other developers understand what the function does at a glance.
- **Developer Expectations**: Seeing the use prefix, a developer might mistakenly think the function can only be used inside a `React` component or another `hook`, not in plain `TypeScript` code like a `service` or a `store`.

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
    <ClassicFonctionComponentHere
      value={theValue}
      onMessage={onMessage}
      onUpdate={onUpdate}
    />
  );
};

export default Component;
```

### ℹ️ Explanation

- **Avoid Using Hooks to Return Components:** Mixing business logic with rendering inside a hook breaks the separation of concerns. Hooks should manage reusable logic, not return components.
- **Use Hooks for Business Logic:** Hooks should handle business logic, such as state management or side effects, and return data that can be used by components.
- **Keep Rendering Separate:** Define rendering logic in React components. This keeps the concerns of data handling and UI rendering separate, making the codebase more maintainable and easier to understand.
- **Simpler Unit Testing:** Keeping hooks focused on logic and components focused on rendering makes unit testing simpler. You can test the hook's logic independently from the UI, leading to clearer and more maintainable tests.

## Prefer Using `gap`, `rowGap`, and `columnGap` Over `margin` or `padding` in React Native

### ❌ Avoid Using `margin` or `padding` for Spacing Between Elements

```tsx
// This code uses margin and padding for spacing, which can be less efficient and harder to maintain
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Component = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Item 1</Text>
      <Text style={styles.item}>Item 2</Text>
      <Text style={styles.item}>Item 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    margin: 10,
  },
});

export default Component;
```

### ✅ Prefer Using `gap`, `rowGap`, and `columnGap` for Spacing Between Elements

```tsx
// This code uses gap for spacing, which is more efficient and easier to maintain
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Component = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Item 1</Text>
      <Text style={styles.item}>Item 2</Text>
      <Text style={styles.item}>Item 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10, // Using gap for spacing between elements
  },
  item: {
    // No need for margin or padding for spacing
  },
});

export default Component;
```

### ℹ️ Explanation

- **Avoid Using `margin` or `padding` for Spacing:** Using `margin` or `padding` for spacing between elements can make the layout harder to maintain and adjust, especially when the spacing needs to be consistent across multiple elements.
- **Use `gap`, `rowGap`, and `columnGap`:** These properties are designed specifically for spacing between items in a flex container, making the code more efficient and easier to maintain.
- **Readability and Maintenance:** Using `gap`, `rowGap`, and `columnGap` improves readability by clearly indicating that the spacing is between items, not around them. This also simplifies the styles and makes the layout easier to adjust.
- **Consistent Spacing:** `gap`, `rowGap`, and `columnGap` ensure consistent spacing between elements without needing to adjust individual `margin` or `padding` values, leading to a more cohesive and maintainable layout.

## Prefer Using Early Returns for Simplified Rendering in React Components

### ❌ Avoid Complex Conditional Rendering with Nested Ternaries

```tsx
// This code uses nested ternary operators, making it harder to read and maintain
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export const MyComponent = ({ userId }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId)
        setUser(response)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        user && (
          <View>
            <Text>User Name: {user.name}</Text>
            <Text>User Email: {user.email}</Text>
          </View>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

### ✅ Prefer Using Early Returns for Improved Readability and Maintainability

```tsx
// This code uses early returns, making it more readable and easier to maintain

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export const MyComponent = ({ userId }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId)
        setUser(response)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) return (<Layout><ActivityIndicator /></Layout>)

  if (error) return (<Layout><Text>{error.message}</Text></Layout>)

  if (!user) return <Layout />

  return (
    <Layout>
      <Text>User Name: {user.name}</Text>
      <Text>User Email: {user.email}</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

### ℹ️ Explanation

- **Avoid Complex Conditional Rendering:**
  - **Readability:** Nesting multiple conditional renderings (ternary operators) can make the JSX hard to read and understand.
  - **Maintainability:** Deeply nested conditional logic can become difficult to maintain and debug, especially as the component grows in complexity.

- **Use Early Returns:**
  - **Readability:** Early returns simplify the component’s render method by handling different states (loading, error, no user) at the beginning, allowing the main rendering logic to focus on the primary use case.
  - **Maintainability:** By keeping the main rendering logic clean and straightforward, early returns make the component easier to maintain and extend.

By following these best practices and using early returns, you can create React components that are more readable, maintainable, and easier to understand.

### 📚 Additional Resources

For more detailed information on the benefits of using early returns in your code, you can refer to these resources:
- [The Early Return Pattern in JavaScript](https://gomakethings.com/the-early-return-pattern-in-javascript/)
- [The Return Early Pattern](https://www.linkedin.com/pulse/return-early-pattern-marny-lopez-eq6je/)

## Prefer Breaking Down `<GodComponents />` into Subcomponents

### ❌ Avoid Complex Components with Excessive Responsibilities

```tsx
// This code is an example of a God Component, making it challenging to read, maintain, and test.

export const Dashboard = () => {

  // Overloaded with state management hooks
  // Multiple hook calls and useEffects
  // Numerous event handlers
  // Complex, embedded expressions
  // Code that should be extracted into pure JS helper functions
  // ...

  return (
    <>
      {/** A complex rendering template spanning over 50 lines */}

      {/** Involves complicated computed expressions */}

      {/** Scrolling is required to view the entire template... */}

      {/** Developers are reluctant to modify anything for fear of breaking functionality */}

      {/** This code is increasingly difficult to manage due to its unreadability */}

      {/** This component has too many responsibilities */}

      {/** Performance can suffer as the component grows, with unnecessary re-renders and slowdowns */}

      {/** ... It’s time to stop feeding this uncontrollable beast :-/ */}
    </>
  )
}
```

### ✅ Prefer Breaking Down God Components into Smaller Subcomponents

```tsx
// This code refactors the God Component into smaller, focused subcomponents, enhancing readability and maintainability.

export const Dashboard = () => {
  // A few state management hooks and minimal hook calls
  // Simple computations, leveraging external pure JS utilities to avoid complexity
  // Use more custom hooks to avoid complexity

  return (
    <>
      {/** A clean, concise rendering template with fewer than 50 lines */}
      <SubComponent1 />
      <SubComponent2>
        <SubComponent3 attribute1={value1} />
        <SubComponent4 attribute2={value2} />
      </SubComponent2>
    </>
  )
}
```

### ℹ️ Explanation

- **Avoid God Components:**
  - **Readability:** Components with excessive responsibilities (often exceeding 50 lines) are hard to read, understand, and navigate. They attempt to handle too many tasks, making it difficult to discern the component’s primary purpose.
  - **Maintainability:** A God Component is prone to bugs and becomes harder to maintain as it grows in complexity. Any change could introduce new issues, affecting multiple aspects of the component.
  - **Performance:** Larger components tend to trigger unnecessary re-renders and can lead to performance bottlenecks. The more responsibilities a component has, the more likely it is to experience slowdowns and inefficiencies.

- **Break Down Components:**
  - **Readability:** By breaking down a large component into smaller, focused subcomponents, you make the code easier to read and follow. Each subcomponent is responsible for a specific task, which makes the overall logic clearer.
  - **Maintainability:** Smaller components are easier to test, debug, and extend. Changes can be made in isolation without affecting unrelated parts of the application, leading to more stable and maintainable code.
  - **Performance:** Smaller, focused components reduce the risk of unnecessary re-renders and improve overall performance. By isolating concerns, each component can be optimized individually, leading to a more efficient application.

By adhering to these principles, you can create React components that are not only more manageable but also optimized for performance, making them easier for other developers to understand, work with, and maintain.

### 📚 Additional Resources

For more detailed information on the benefits of small responsibilities components, you can refer to these resources:
- [Are Your React Components Too BIG?](https://www.youtube.com/watch?v=NsFmOttIW9Y)
- [Refactoring a messy react component](https://alexkondov.com/refactoring-a-messy-react-component/)

## Avoid Numeric Index for the Key Value of a React Element

### ❌ Avoid direct index usage as key
```tsx
const items = [
  { id: 'a1', name: 'Apple' },
  { id: 'b2', name: 'Banana' },
];

const ItemList = () => (
  <div>
    {items.map((item, index) => (
      <p key={index}>{item.name}</p>
    ))}
  </div>
);
```

### ✅ Prefer a unique identifier
```tsx
const items = [
  { id: 'a1', name: 'Apple' },
  { id: 'b2', name: 'Banana' },
];

const ItemList = () => (
  <div>
    {items.map((item) => (
      <p key={item.id}>{item.name}</p>
    ))}
  </div>
);

// if id is unavailable, try to find an attribute that is unique to each element, such as a `name`, `slug`, or any property that ensures uniqueness
const ItemList_WithUniqueIdentifier = () => (
  <div>
    {items.map((item) => (
      <p key={item.name}>{item.name}</p>
    ))}
  </div>
);

// As a last resort, if no single attribute is unique, generate a unique key for each element in the list and pass the list as props to the component.
// Note: A composite key (a combination of two or more attributes) can also be used, as the goal is to ensure that the final key is unique for each element.
const ItemList_GenerationApproach = () => (
  <div>
    {items.map((item, index) => (
      <p key={`${item.generatedUUID}`}>{item.name}</p>
    ))}
  </div>
);
```

### ℹ️ Why is this better?

- **Stability:** Unique keys allow React to properly identify elements between renders. Numeric indices alone are fragile when items are reordered or updated.
- **Flexibility:** Using meaningful attributes (or combinations) as keys ensures your code reflects the underlying data's structure.
- **Avoiding Bugs:** Combining fields with indices, while not ideal, is better than relying solely on indices, as it reduces the likelihood of mismatches during re-renders.

This approach ensures React efficiently handles rendering and avoids subtle bugs caused by key mismatches.

## Prefer react-native `Pressable` Over `TouchableOpacity`

### ❌ Avoid TouchableOpacity usage
```tsx
import { TouchableOpacity, Text } from 'react-native';

const MyButton = () => (
  <TouchableOpacity onPress={() => console.log('Button pressed!')}>
    <Text>Press Me</Text>
  </TouchableOpacity>
);
```

### ✅ Prefer Pressable
```tsx
import { Pressable, Text, StyleSheet } from 'react-native';

const MyButton = () => (
  <Pressable
    onPress={() => console.log('Button pressed!')}
    style={({ pressed }) => [
      styles.button,
      pressed ? styles.buttonPressed : null,
    ]}
  >
    <Text>Press Me</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
  },
  buttonPressed: {
    backgroundColor: 'darkblue',
  },
});
```

### ℹ️ Why is this better?

1. **Future-Proof API:** The official [React Native documentation](https://reactnative.dev/docs/pressable) recommends using the `Pressable` API for touch-based interactions. It is more extensive and designed to be future-proof.
2. **Rich Features:** `Pressable` provides additional features like:
   - Handling different interaction states (e.g., `onPressIn`, `onPressOut`, `onHoverIn`, `onHoverOut`).
   - Easily customizing styles for various states using `style` as a function.
3. **Better Customization:** `Pressable` simplifies managing complex touch gestures and states, making it ideal for modern React Native applications.

By adopting `Pressable`, you ensure your app uses modern APIs, improves interaction handling, and remains aligned with React Native's evolving best practices.

## Prefer Fragments Over DOM Nodes

### ❌ Avoid DOM Nodes for Grouping

Using `div` or `span` elements to group components adds unnecessary DOM nodes:

```tsx
const Dashboard = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};
```

### ✅ Prefer Fragments

Use React `Fragment` to group elements without affecting the DOM structure:

```tsx
const Dashboard = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};
```

### ℹ️ Explanations

- Fragments provide a cleaner way to group multiple elements without adding extra nodes to the DOM
- Using unnecessary DOM nodes like `div` can:
  - Make the DOM structure more complex and harder to maintain
  - Require additional CSS to handle unwanted styling side effects
  - Impact performance by increasing the DOM size
- Fragments are particularly useful in:
  - Component returns that require multiple elements
  - List rendering where wrapper elements would break the layout
  - Complex layouts where DOM hierarchy matters

Je vais reformatter cette règle de développement selon vos critères.

## Use React Fragment Shorthand

### ❌ Avoid useless verbose Fragment tag
```tsx
<Fragment>
   <FirstChild />
   <SecondChild />
</Fragment>
```

### ✅ Prefer Fragment shorthand syntax
```tsx
<>
   <FirstChild />
   <SecondChild />
</>
```

### ℹ️ Explanations
- The shorthand syntax `<></>` is more concise and readable
- Use the full `Fragment` syntax only when you need to set a key
- Example with key requirement:

```tsx
interface User {
  id: string;
  name: string;
  occupation: string;
}

const List = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map((user) => (
        <Fragment key={user.id}>
          <span>{user.name}</span>
          <span>{user.occupation}</span>
        </Fragment>
      ))}
    </div>
  );
};
```

## Prefer Props Destructuring Over Direct Props Access

### ❌ Avoid Using Direct Props Access

```tsx
// Accessing props directly throughout the code creates clutter
type TodoListProps = {
  todos: string[];
  selectedTodo: string;
  onSelectTodo: (todo: string) => void;
};

const TodoList = (props: TodoListProps) => {
  return (
    <>
      {props.todos.map((todo) => (
        <div key={todo}>
          <button
            onClick={() => props.onSelectTodo(todo)}
            style={{
              backgroundColor: todo === props.selectedTodo ? "gold" : undefined,
            }}
          >
            <span>{todo}</span>
          </button>
        </div>
      ))}
    </>
  );
};
```

### ✅ Prefer Props Destructuring

```tsx
type TodoListProps = {
  todos: string[];
  selectedTodo: string;
  onSelectTodo: (todo: string) => void;
};

const TodoList = ({ todos, selectedTodo, onSelectTodo }: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <div key={todo}>
          <button
            onClick={() => onSelectTodo(todo)}
            style={{
              backgroundColor: todo === selectedTodo ? "gold" : undefined,
            }}
          >
            <span>{todo}</span>
          </button>
        </div>
      ))}
    </>
  );
};
```

### ℹ️ Explanations

Props destructuring in the function parameters offers several benefits:

- Improves code readability by making it immediately clear which props the component uses
- Reduces repetition of the `props.` prefix throughout the component
- Provides better IDE support with immediate prop suggestions
- Makes the code more concise and maintainable, especially in larger components
- Destructuring at the component level clearly communicates the component's dependencies

Additionally, when using TypeScript, destructuring props with proper typing provides better type safety and autocompletion support.

## Set Default Values While Destructuring Props

### ❌ Avoid Setting Defaults After Destructuring

```tsx
interface ButtonProps {
  onClick: () => void;
  text?: string;
  small?: boolean;
  colorScheme?: 'light' | 'dark';
}

const Button = ({ onClick, text, small, colorScheme }: ButtonProps) => {
  let scheme = colorScheme || "light";
  let isSmall = small || false;
  return (
    <button
      onClick={onClick}
      style={{
        color: scheme === "dark" ? "white" : "black",
        fontSize: isSmall ? "12px" : "16px",
      }}
    >
      {text ?? "Click here"}
    </button>
  );
};
```

### ✅ Prefer Setting Defaults During Destructuring

```tsx
interface ButtonProps {
  onClick: () => void;
  text?: string;
  small?: boolean;
  colorScheme?: 'light' | 'dark';
}

const Button = ({
  onClick,
  text = "",
  small = false,
  colorScheme = "light",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: colorScheme === "dark" ? "white" : "black",
        fontSize: small ? "12px" : "16px",
      }}
    >
      {text}
    </button>
  );
};
```

### ℹ️ Explanations

- **Maintainability**: Setting defaults during destructuring centralizes all default values in one location, making the code easier to maintain and update.
- **Readability**: Having all defaults defined at the component's entry point makes it immediately clear what the default behavior will be.
- **Type Safety**: Using TypeScript interfaces ensures proper typing of props and their potential default values, catching type-related errors at compile time.
- **DRY Principle**: Avoids the need to declare additional variables just to handle default values, reducing code duplication and potential inconsistencies.


## Drop String Props Curly Braces

### ❌ Avoid useless curly braces for string props

```tsx
interface ButtonProps {
  text: string;
  colorScheme: string;
}

const ExampleButton = ({ text, colorScheme }: ButtonProps) => {
  return <Button text={"Click me"} colorScheme={"dark"} />;
};
```

### ✅ Prefer direct string assignment for string props

```tsx
interface ButtonProps {
  text: string;
  colorScheme: string;
}

const ExampleButton = ({ text, colorScheme }: ButtonProps) => {
  return <Button text="Click me" colorScheme="dark" />;
};
```

### ℹ️ Explanations

When passing string literals as props to React components, there's no need to wrap them in curly braces. Curly braces in JSX are used for embedding JavaScript expressions, but string literals can be passed directly using quotes. This leads to cleaner and more readable code. The curly braces are only necessary when passing dynamic values or expressions.

## Use explicit boolean conditions for conditional rendering

### ❌ Avoid implicit boolean conversion with non-boolean values

```tsx
interface ListWrapperProps {
  items: any[];
  selectedItem: any;
  setSelectedItem: (item: any) => void;
}

const ListWrapper = ({ items, selectedItem, setSelectedItem }: ListWrapperProps) => {
  return (
    <div className="list">
      {items.length && ( // Will print `0` if the list is empty
        <List
          items={items}
          onSelectItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};
```

### ✅ Prefer explicit boolean conditions

```tsx
interface ListWrapperProps {
  items: any[];
  selectedItem: any;
  setSelectedItem: (item: any) => void;
}

const ListWrapper = ({ items, selectedItem, setSelectedItem }: ListWrapperProps) => {
  const shouldDisplayItems = items.length > 0;

  return (
    <div className="list">
      {shouldDisplayItems && (
        <List
          items={items}
          onSelectItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};
```

### ℹ️ Explanations

When using conditional rendering with the `&&` operator in React, ensure the condition evaluates to a strict boolean value. Using non-boolean values like numbers can lead to unexpected rendering:

- When using `items.length && <Component />`, if the length is 0, React will render the number `0` on the screen
- Using `items.length > 0 && <Component />` ensures the condition is a proper `boolean`
- This pattern applies to any conditional rendering where the left side of `&&` could evaluate to a non-boolean value

## Move data outside the component for cleaner code

### ❌ Avoid keeping unnecessary data inside the component

Keeping data like constants or functions that don't rely on props or state inside a component can clutter the component and create new object references on every render. This can break optimizations like memoization.

```tsx
const CoursesSelector = () => {
  const OPTIONS = ["Maths", "Literature", "History"];

  const renderOption = (option: string) => {
    return <option>{option}</option>;
  };

  return (
    <select>
      {OPTIONS.map((opt) => (
        <Fragment key={opt}>{renderOption(opt)}</Fragment>
      ))}
    </select>
  );
}
```

### ✅ Prefer moving static data and functions outside the component

Placing static data and functions outside the component keeps the component clean and ensures stable references, which helps with performance optimizations.

```tsx
const OPTIONS = ["Maths", "Literature", "History"];

interface CoursesSelectorProps {}

const CoursesSelector: React.FC<CoursesSelectorProps> = () => {
  return (
    <select>
      {OPTIONS.map((opt) => (<option key={opt}>{opt}</option>))}
    </select>
  );
};
```

### ℹ️ Explainations

Moving static data and functions outside the component:
- Reduces the size and complexity of the component.
- Ensures that references remain stable across renders, which is crucial for optimizations like `React.memo`.
- Improves readability and reusability of the code by separating concerns.

## Store the Selected Item by ID

### ❌ Avoid storing the entire item
When storing the selected item from a list, avoid storing the entire item object. This can lead to issues if the item changes or is removed from the list.

```tsx
interface Item = { id: number; name: string };

interface ListWrapperProps {
  items: Item[];
}

const ListWrapper: React.FC<ListWrapperProps> = ({ items }) => {
  // We are referencing the entire item
  const [selectedItem, setSelectedItem] = React.useState<Item>();

  return (
    <>
      {selectedItem && <div>{selectedItem.name}</div>}

      <List
        items={items}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
      />
    </>
  );
};
```

### ✅ Prefer storing the item ID
Store the selected item by its ID (which should be stable). This ensures the UI remains correct even if the item is removed from the list or one of its properties changes.

```tsx
interface Item = { id: number; name: string };
interface ListWrapperProps {
  items: Item[];
}

const ListWrapper: React.FC<ListWrapperProps> = ({ items }) => {
  const [selectedItemId, setSelectedItemId] = React.useState<number | undefined>();
  // We derive the selected item from the list
  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <>
      {selectedItem && <div>{selectedItem.name}</div>}

      <List
        items={items}
        selectedItemId={selectedItemId}
        onSelectItem={setSelectedItemId}
      />
    </>
  );
};
```

### ℹ️ Explanation
By storing only the ID of the selected item, we ensure that the selection logic is resilient to changes in the list or its items. This approach avoids retaining stale references and keeps the UI consistent and predictable. Furthermore, deriving the selected item from the list ensures that the UI is always in sync with the current state of the list.

## Clarify the Distinction Between Initial State and Current State

### ❌ Avoid unclear naming for state variables
Avoid naming state variables in a way that makes it ambiguous whether they represent the initial state or the current state. This can lead to confusion and errors in state management.

```tsx
interface MainProps {
  sortOrder: string;
}

const Main: React.FC<MainProps> = ({ sortOrder }) => {
  const [internalSortOrder, setInternalSortOrder] = React.useState(sortOrder);

  return (
    <div>
      <button
        onClick={() => setInternalSortOrder("popular")}
        className={internalSortOrder === "popular" ? "active" : ""}
      >
        Popular
      </button>
      <button
        onClick={() => setInternalSortOrder("latest")}
        className={internalSortOrder === "latest" ? "active" : ""}
      >
        Latest
      </button>
    </div>
  );
};
```

### ✅ Prefer clear naming to differentiate initial state and current state
Prefer explicitly naming props and state variables to indicate their role, such as using `initial` as a prefix for initial state variables.

```tsx
interface MainProps {
  initialSortOrder: string;
}

const Main: React.FC<MainProps> = ({ initialSortOrder }) => {
  const [sortOrder, setSortOrder] = React.useState(initialSortOrder);

  return (
    <div>
      <button
        onClick={() => setSortOrder("popular")}
        className={sortOrder === "popular" ? "active" : ""}
      >
        Popular
      </button>
      <button
        onClick={() => setSortOrder("latest")}
        className={sortOrder === "latest" ? "active" : ""}
      >
        Latest
      </button>
    </div>
  );
};
```

### ℹ️ Explaination
Clear naming improves code readability and helps developers quickly understand the purpose of each variable. When working with state, distinguishing between initial values (e.g., `initialSortOrder`) and current values (e.g., `sortOrder`) ensures that the code is self-explanatory and reduces potential for errors during state updates. This is particularly important in collaborative environments or when revisiting code after a long time.

## Always Clean Up in Your `useEffect` Hooks

### ❌ Avoid forgetting to clean up side effects
Avoid setting up side effects like intervals, subscriptions, or event listeners in `useEffect` without properly cleaning them up. Neglecting this step can lead to resource waste and memory leaks.

```tsx
import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return <div>Current time: {time.toLocaleTimeString()}</div>;
};
```

### ✅ Prefer cleaning up side effects with a cleanup function
Always return a cleanup function in `useEffect` to ensure side effects like intervals, subscriptions, or event listeners are removed when the component unmounts.

```tsx
import { useState, useEffect } from 'react';

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return <div>Current time: {time.toLocaleTimeString()}</div>;
};
```

### ℹ️ Explaination
In React, `useEffect` is used to handle side effects such as setting up intervals, subscribing to events, or interacting with external resources. When these side effects are no longer needed (e.g., the component unmounts), they must be cleaned up to prevent issues such as memory leaks or excessive resource usage. 

By returning a cleanup function in `useEffect`, you ensure that any resources allocated during the effect are properly released. This approach leads to better performance and more reliable applications.


## Prefer Functions Over Custom Hooks

### ❌ Avoid creating unnecessary custom hooks
Hooks should not be used when a simple function can achieve the same purpose. For example:

```tsx
interface AppProps {
  post: BlogPost;
}

const App: React.FC<AppProps> = ({ post }) => {
  const locale = useLocale();

  return (
    <div className="App">
      <IntlProvider locale={locale}>
        <BlogPost post={post} />
      </IntlProvider>
    </div>
  );
};

const useLocale = () => {
  return window.navigator.languages?.[0] ?? window.navigator.language;
};
```

In this case, `useLocale` doesn't leverage any hook features (e.g., `useState`, `useEffect`).

### ✅ Prefer using plain functions instead
Functions are simpler, easier to test, and more versatile than hooks. Here's the refactored example:

```tsx
interface AppProps {
  post: BlogPost;
}

const App: React.FC<AppProps> = ({ post }) => {
  const locale = getLocale();

  return (
    <div className="App">
      <IntlProvider locale={locale}>
        <BlogPost post={post} />
      </IntlProvider>
    </div>
  );
};

const getLocale = () => window.navigator.languages?.[0] ?? window.navigator.language;
```

### ℹ️ Explanation
- **Hooks are restrictive**: They can only be used inside React components or other hooks. Functions, however, can be used anywhere.
- **Functions are simpler**: They don’t require adhering to the rules of hooks and are easier to understand and debug.
- **Functions are more testable**: Pure functions are straightforward to unit test without needing the React environment.

By preferring functions over unnecessary hooks, your code remains lean, maintainable, and easy to reason about.

## Use `ReactNode` instead of `JSX.Element | null | undefined`

### ❌ Avoid typing props with JSX.Element | null | undefined

```tsx
interface PanelProps {
  leftElement: JSX.Element | null | undefined;
  rightElement: JSX.Element | null | undefined;
}

const Panel: React.FC<PanelProps> = ({ leftElement, rightElement }) => {
  // ...
};
```

### ✅ Prefer using `ReactNode` for more compact code

You can use `ReactNode` to keep the code more compact.

```tsx
import { ReactNode } from 'react';

interface MyComponentProps {
  leftElement: ReactNode;
  rightElement: ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ leftElement, rightElement }) => {
  // ...
};
```

### ℹ️ Explanation
- **ReactNode is more inclusive**: It covers all possible return types for a component, including strings, numbers, and fragments.
- **Simplifies prop types**: Using ReactNode makes the prop types more concise and easier to read.
- **Improves maintainability**: By using a single type, you reduce the complexity and potential for errors in your code.

## Simplify Typing of Components Expecting Children Props

### ❌ Avoid manually typing the children prop
```tsx
interface PageProps {
  // ...page props definition...
}

const HeaderPage: React.FC<{ children: ReactNode } & PageProps> = ({ children, ...pageProps }) => {
  // ...
};
```

### ✅ Prefer using PropsWithChildren for typing children props
```tsx
import { PropsWithChildren } from 'react';

interface PageProps {
  // ...page props definition...
}

const HeaderPage: React.FC<PropsWithChildren<PageProps>> = ({ children, ...pageProps }) => {
  // ...
};
```

### ℹ️ Explanation
You don't have to type the children prop manually. Instead, you can use PropsWithChildren to simplify the typings. This makes your code cleaner and reduces the chance of errors.

## Specify Types Explicitly in useState, useRef, etc.

### ❌ Avoid omitting types when they can't be inferred
```tsx
const [selectedItemId, setSelectedItemId] = useState();
```

### ✅ Prefer specifying types explicitly when they can't be inferred
```tsx
const [selectedItemId, setSelectedItemId] = useState<string>();
```

### ℹ️ Explanation
When using hooks like `useState` or `useRef`, always specify the type explicitly if it can't be inferred from the initial value. This ensures that TypeScript correctly understands the type of the state or ref, preventing potential type-related bugs. For example, if you have a state variable `selectedItemId` that should be an optional `string`, explicitly typing it as `useState<string>()` ensures that TypeScript will enforce this type.

## Use ElementRef Type Helper for Typing Refs

### ❌ Avoid typing refs directly with element type names
```tsx
const ref = useRef<HTMLDivElement>(null);
```

### ✅ Prefer using the ElementRef type helper for typing refs
```tsx
const ref = useRef<ElementRef<"div">>(null);
```

### ℹ️ Explanation
Typing refs directly with element type names can be cumbersome and error-prone, as it requires remembering the exact type name of the element. Instead, use the `ElementRef` type helper, which simplifies the process by allowing you to use the element's name directly. This approach is more straightforward and reduces the likelihood of mistakes.