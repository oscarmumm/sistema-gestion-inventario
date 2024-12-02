// SORTER FUNCTIONS

export const stringAscSort = (arr, key) =>
    arr.toSorted((a, b) => a[key].localeCompare(b[key]))

export const stringDesSort = (arr, key) =>
    arr.toSorted((a, b) => b[key].localeCompare(a[key]))

export const numericAscSort = (arr, key) =>
    arr.toSorted((a, b) => a[key] - b[key])

export const numericDesSort = (arr, key) =>
    arr.toSorted((a, b) => b[key] - a[key])
