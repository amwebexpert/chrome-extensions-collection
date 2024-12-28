// This code uses multiple comparisons in a single if statement
export const antiPatternExample_01 = (value: string) => {
  if (value === 'a' || value === 'b' || value === 'c') {
    console.log('Value is a, b, or c')
  } else {
    console.log('Value is something else')
  }
}

// This code should use Array.some() for a more readable and concise solution
export const antiPatternExample_02 = (value: string) => {
  const items = [
    { id: 1, name: 'Alice', isActive: false },
    { id: 2, name: 'Bob', isActive: false },
    { id: 3, name: 'Charlie', isActive: true },
  ]

  const activeItems = items.find((item) => item.isActive) !== undefined
  console.info('====>>> info', activeItems)
}
