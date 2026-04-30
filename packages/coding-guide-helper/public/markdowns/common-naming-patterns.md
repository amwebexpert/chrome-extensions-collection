Table of Content:

- [Prefer Using Descriptive Prefixes for Boolean Variables in TypeScript](#prefer-using-descriptive-prefixes-for-boolean-variables-in-typescript)
  - [❌ Avoid Using Generic or Non-Descriptive Names for Boolean Variables](#-avoid-using-generic-or-non-descriptive-names-for-boolean-variables)
  - [✅ Prefer Using Descriptive Prefixes for Boolean Variables](#-prefer-using-descriptive-prefixes-for-boolean-variables)
  - [ℹ️ Explanation](#ℹ️-explanation)
  - [📚 References](#-references)
- [Avoid one-letter variable names](#avoid-one-letter-variable-names)
  - [❌ Avoid single-letter and opaque ultra-short names](#-avoid-single-letter-and-opaque-ultra-short-names)
  - [✅ Prefer descriptive names for locals and parameters](#-prefer-descriptive-names-for-locals-and-parameters)
  - [ℹ️ Explanation](#ℹ️-explanation-1)
  - [📚 References](#-references-1)

Consistent naming of variables, functions, and types improves readability, maintainability, and collaboration. This document covers **in-code** naming only. For file and folder naming, see [react-files-structure-standards](../../react-files-structure-standards/references/file-and-folder-naming-patterns.md).

---

## Prefer Using Descriptive Prefixes for Boolean Variables in TypeScript

Using prefixes when naming variables can make the code much easier to read and understand. Here are some tips for using prefixes when naming variables.

### ❌ Avoid Using Generic or Non-Descriptive Names for Boolean Variables

```ts
// This code uses non-descriptive names for boolean variables, making the code harder to understand
const active = true;
const enabled = false;
const valid = true;

if (active) {
  // Do something
}

if (enabled) {
  // Do something else
}

if (valid) {
  // Validate something
}
```

### ✅ Prefer Using Descriptive Prefixes for Boolean Variables

```ts
// This code uses descriptive prefixes for boolean variables, making the code more readable and maintainable
const isActive = true;
const isEnabled = false;
const isValid = true;
const hasPermissions = true;
const shouldSave = false;
const canProceed = true;
const willRetry = false;

if (isActive) {
  // Do something
}

if (isEnabled) {
  // Do something else
}

if (isValid) {
  // Validate something
}

if (hasPermissions) {
  // Check permissions
}

if (shouldSave) {
  // Save data
}

if (canProceed) {
  // Proceed to next step
}

if (willRetry) {
  // Retry operation
}
```

### ℹ️ Explanation

- **Avoid Using Generic or Non-Descriptive Names:** Using generic names like `active`, `enabled`, or `valid` for boolean variables can make the code harder to understand. It is not immediately clear what these variables represent or when they should be true or false.
- **Use Descriptive Prefixes:** Prefer using prefixes like `is`, `has`, `should`, `can`, and `will` to make the purpose of boolean variables clear:
  - `is`: Indicates a state or condition (e.g., `isActive`, `isEnabled`, `isValid`).
  - `has`: Indicates possession or presence of a property (e.g., `hasPermissions`).
  - `should`: Indicates a recommended action or condition (e.g., `shouldSave`).
  - `can`: Indicates ability or possibility (e.g., `canProceed`).
  - `will`: Indicates future action or intention (e.g., `willRetry`).
- **Readability and Maintainability:** Using descriptive prefixes improves the readability of the code by making the purpose of each boolean variable immediately clear. This also enhances maintainability by making the code easier to understand and modify.
- **Consistency:** Consistently using these prefixes helps establish a clear and understandable naming convention throughout the codebase, making it easier for all team members to follow and comprehend the code.

By following these best practices and using descriptive prefixes for boolean variables, you can create code that is more readable, maintainable, and easier to understand.

### 📚 References

- [Variable naming patterns](https://www.linkedin.com/posts/muhamadzolfaghari_variable-javascript-naming-activity-7179568278841737216-zFrX/)

---

## Avoid one-letter variable names

Names with a single letter (`n`, `e`, `t`, `x`) or opaque two-letter abbreviations (`fn`, `cb`, `el` when the domain is not “callback”/“element”) hide intent and slow down reviews and refactors. Prefer words that describe the value’s role in the surrounding code.

### ❌ Avoid single-letter and opaque ultra-short names

```ts
// Hard to scan: what is `n`? what is `d`?
const visit = (n: Node) => {
  for (const c of n.children) {
    visit(c);
  }
};

const d = await fetchUserProfile();
if (d.role === "admin") {
  // ...
}
```

### ✅ Prefer descriptive names for locals and parameters

```ts
const visit = (node: Node) => {
  for (const child of node.children) {
    visit(child);
  }
};

const userProfile = await fetchUserProfile();
if (userProfile.role === "admin") {
  // ...
}
```

### ℹ️ Explanation

- **Readability:** A name should answer what the value _means_ in context, not only what type it has.
- **Parameters and locals:** Apply the same bar as for exported symbols; short names in inner scopes still add cognitive load when the block grows or is nested.
- **Loops:** For non-trivial bodies, prefer `rowIndex`, `partIndex`, `candidate`, `syntaxNode`, etc., over `i`, `p`, `d`, `n`.
- **Callbacks:** In `sort`, `map`, and similar APIs, prefer `left`/`right` or domain-specific pair names over `a`/`b` when it clarifies ordering or comparison intent.
- **Rare exceptions:** Conventional math symbols (`x`/`y` for coordinates) or extremely tight numeric loops with empty/minimal bodies may stay short—still upgrade the name when the loop body gains branches or side effects.

### 📚 References

- [Airbnb JavaScript Style Guide — Naming Conventions](https://github.com/airbnb/javascript#naming-conventions)
