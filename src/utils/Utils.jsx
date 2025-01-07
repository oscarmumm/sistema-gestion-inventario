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
    const hours = dateObj.getHours() > 10 ? dateObj.getHours() : `0${dateObj.getHours()}`
    const minutes = dateObj.getMinutes() > 10 ? dateObj.getMinutes() : `0${dateObj.getMinutes()}`
    const date = dateObj.getDate() > 10 ? dateObj.getDate() : `0${dateObj.getDate()}`
    const month = dateObj.getMonth() > 10 ? (dateObj.getMonth() + 1) : `0${(dateObj.getMonth() + 1)}`
    const dateInfo = {
        fullDate: `${date}/${month}/${dateObj.getFullYear()}`,
        time: `${hours}:${minutes}`,
        //time: `${dateObj.getHours()}:${dateObj.getMinutes()}`,
        timestamp: `${dateObj.getTime()}`
    }
    return dateInfo
}

export const toRounded = (num) => {
    return Math.round(num * 100) / 100
}