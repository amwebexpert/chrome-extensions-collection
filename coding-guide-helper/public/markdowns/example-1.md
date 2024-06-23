- [Project coding standards](#project-coding-standards)
  - [avoid `{renderAbc()}` pattern](#avoid-renderabc-pattern)
    - [❌ avoid](#-avoid)
    - [✅ prefer](#-prefer)
    - [ℹ️ :information\_source: Explanation](#ℹ️-information_source-explanation)
  - [single arrow function event handler](#single-arrow-function-event-handler)
    - [❌ avoid double arrows functions](#-avoid-double-arrows-functions)
    - [✅ prefer single arrow functions](#-prefer-single-arrow-functions)
    - [ℹ️ Explanation:](#ℹ️-explanation)

# Project coding standards

This section list coding patterns promoted in the project.

## avoid `{renderAbc()}` pattern

### ❌ avoid

```typescript
const renderToggleIcon = useCallback(() => {
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
    {renderToggleIcon()}
  </View>
)
```

### ✅ prefer

```typescript
// define small dumb components with props
return (
  <View>
    <ToggleIcon isPassword={isPassword} onPress={onIconPressed}
      isSensitiveTextVisible={isSecuredTextEntryEnabled} />
  </View>
)```
```

### ℹ️ :information_source: Explanation

the `useCallback` hook:

- should be used around _user interactions_ and not for rendering optimizations

:books: References

- [3 React Mistakes, 1 App Killer](https://youtube.com/watch?v=QuLfCUh-iwI&si=JofynxnU-J58sA53)

creating small dumb components:

- removes template complexity
- promotes potential re-usability
- promotes separation of concerns

## single arrow function event handler

### ❌ avoid double arrows functions

```tsx
// double arrow functions (a.k.a. function factories)
const onUpdatePress = (pm: PaymentMethod) => () => {
   ...
}
const onDeletePress = (id: string) => () => {
   ...
}

...

return (
  <View onPress={onUpdatePress(paymentMethod)}>
    <View onPress={onDeletePress(id)}>
      ...
    </View>
  </View>
)
```

### ✅ prefer single arrow functions

```tsx
// simple function
const onUpdatePress = (pm: PaymentMethod) => {
   ...
}
const onDeletePress = (id: string) => {
   ...
}

...

return (
  <View onPress={() => onUpdatePress(paymentMethod)}>
    <View onPress={() => onDeletePress(id)}>
      ...
    </View>
  </View>
)
```

### ℹ️ Explanation:

- `onNameOfEventPress` handler name makes sense when the event is triggered
- passing the factory reference to `onPress` adds confusion since we are passing a factory that generates the handler, not the handler itself
- factory pattern makes it more difficult to read and maintain because this adds confusion

