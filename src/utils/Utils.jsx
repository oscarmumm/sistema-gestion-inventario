// SORTER FUNCTIONS

export const stringAscSort = (arr, key) =>
    arr.toSorted((a, b) => a[key].localeCompare(b[key]))

export const stringDesSort = (arr, key) =>
    arr.toSorted((a, b) => b[key].localeCompare(a[key]))

export const numericAscSort = (arr, key) =>
    arr.toSorted((a, b) => a[key] - b[key])

export const numericDesSort = (arr, key) =>
    arr.toSorted((a, b) => b[key] - a[key])

export const roundTwoDecimals = (num) => {
    return Math.round(num * 100) / 100
}

export const timeGetter = () => {
    const dateObj = new Date()
    const dateInfo = {
        date: `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`,
        time: `${dateObj.getHours()}:${dateObj.getMinutes()}`,
        timestamp: `${dateObj.getTime()}`
    }
    return dateInfo
}