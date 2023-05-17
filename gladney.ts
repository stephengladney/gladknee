import type { Router } from "express"

/** Returns a number limited to a specific number of decimal places. 
This is different from the native `toFixed()` method because it returns a number not a string. 
*
* _Example:_
* ```typescript
* float(4.24398, 3) //=> 4.244
* ```
 **/
export function float(n: number, decimalPlaces?: number) {
  return decimalPlaces ? Number(n.toFixed(decimalPlaces)) : n
}

/** Returns the sum of the provided numbers.
 *
 * Example:
 * ```typescript
 * sum(1, 4, 6) //=> 11
 * ```
 **/
export function sum(...arr: number[]) {
  return arr.reduce((acc, i) => acc + i, 0)
}

/** Enforces a minimum and/or maximum limit on a number and returns the number or the enforced limit.
 You can pass **false** or **0** for a limit parameter to bypass that limit.
*
* _Example:_
* ```typescript
* clamp(15, 3, 12) //=> 12
* clamp(15, 16, 20) //=> 16
* ```
 **/
export function clampNumber(
  n: number,
  min: number | false,
  max?: number | false
) {
  let result = n
  if (min) result = n > min ? n : min
  if (max) result = result < max ? result : max
  return result
}

/** Returns a provided single digit number with a leading zero as a string.
 *
 * _Example:_
 * ```typescript
 * doubleDigit(9) //=> "09"
 * ```
 **/
export function doubleDigit(n: number) {
  if (String(n).length > 2) return String(n)
  else return String(`0${n}`).slice(-2)
}

/** Returns an array of numbers, starting from the provided start number and ending with provided end number.
 * You can optionally pass in a step number to increment by a number other than 1. You can also increment negatively.
 *
 * _Example:_
 * ```typescript
 * getRange(5, 10)
 * //=> [5, 6, 7, 8, 9, 10]
 *
 * getRange(0, 10, 2)
 * //=> [0, 2, 4, 6, 8, 10]
 *
 * getRange(10, 0, -2)
 * //=> [10, 8, 6, 4, 2, 0]
 * ```
 **/
export function getRange(start: number, end: number, step = 1) {
  const result: number[] = []
  if (start < end) {
    if (step <= 0) return
    for (let i = start; i <= end; i += step) {
      result.push(i)
    }
  } else {
    if (step >= 0) return
    for (let i = start; i >= end; i += step) {
      result.push(i)
    }
  }
  return result
}

/** Returns a string of the provided number with the ordinal suffix added.
 *
 * _Example:_
 * ```typescript
 * ordinal(4) //=> "4th"
 * ```
 **/
export function ordinal(n: number) {
  if (n >= 11 && n <= 13) return `${String(n)}th`
  switch (String(n).slice(-1)) {
    case "1":
      return `${String(n)}st`
    case "2":
      return `${String(n)}nd`
    case "3":
      return `${String(n)}rd`
    default:
      return `${String(n)}th`
  }
}

export interface TimeObject {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  inYears: () => number
  inMonths: () => number
  inWeeks: () => number
  inDays: () => number
  inHours: () => number
  inMinutes: () => number
  inSeconds: () => number
}

const secondsInAMinute = 60
const secondsInAnHour = 3600
const secondsInADay = 86400
const secondsInAWeek = 604800
const secondsInAMonth = 2592000 // Assumes 30 day month
const secondsInAYear = 31557600

/** Returns a `TimeObject` with calculated years, months, weeks, days, hours, minutes and seconds from seconds provided. 
 * A `TimeObject` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
 *
 * _Example:_
 * ```typescript
 * getAmountOfTimeFromSeconds(2000000)
//=> { years: 0, months: 0, weeks: 3, days: 2, hours: 3, minutes: 33, seconds: 20 }

* getAmountOfTimeFromSeconds(2000000).inMinutes()
//=> 33333.333333333336

interface TimeObject {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  inYears: () => number
  inMonths: () => number
  inWeeks: () => number
  inDays: () => number
  inHours: () => number
  inMinutes: () => number
  inSeconds: () => number
}
 * ```
 **/
export function getAmountOfTimeFromSeconds(seconds: number): TimeObject {
  return {
    years: Math.floor(seconds / secondsInAYear),
    months: Math.floor((seconds % secondsInAYear) / secondsInAMonth),
    weeks: Math.floor((seconds % secondsInAMonth) / secondsInAWeek),
    days: Math.floor((seconds % secondsInAWeek) / secondsInADay),
    hours: Math.floor((seconds % secondsInADay) / secondsInAnHour),
    minutes: Math.floor((seconds % secondsInAnHour) / secondsInAMinute),
    seconds: seconds % secondsInAMinute,
    inYears: () => seconds / secondsInAYear,
    inMonths: () => seconds / secondsInAMonth,
    inWeeks: () => seconds / secondsInAWeek,
    inDays: () => seconds / secondsInADay,
    inHours: () => seconds / secondsInAnHour,
    inMinutes: () => seconds / secondsInAMinute,
    inSeconds: () => seconds,
  }
}

/** Returns a `TimeObject` with the number of years, months, weeks, days, hours, minutes and seconds until the date provided.
 * A `TimeObject` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
 * ```typescript
interface TimeObject {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  inYears: () => number
  inMonths: () => number
  inWeeks: () => number
  inDays: () => number
  inHours: () => number
  inMinutes: () => number
  inSeconds: () => number
}
 * ```
 **/
export function timeUntil(date: Date): TimeObject {
  const diffInSeconds = Math.floor(
    (new Date(date).getTime() - Date.now()) / 1000
  )
  return getAmountOfTimeFromSeconds(diffInSeconds)
}

/** Returns a `TimeObject` with the number of years, months, weeks, days, hours, minutes and seconds since the date provided.
 * A `TimeObject` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
 * ```typescript
interface TimeObject {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  inYears: () => number
  inMonths: () => number
  inWeeks: () => number
  inDays: () => number
  inHours: () => number
  inMinutes: () => number
  inSeconds: () => number
}
 * ```
 **/
export function timeSince(date: Date): TimeObject {
  const diffInSeconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  )
  return getAmountOfTimeFromSeconds(diffInSeconds)
}

/** Returns the corresponding human readable day name of the integer (0-6) provided.
 *
 * Example:
 * ```typescript
 * getDayName(3) //=> "Wednesday"
 * ```
 **/
export function getDayName(day: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  return dayNames[day]
}

/** Returns a Date of the current date with a time of 0:00:00.
 **/
export function beginningOfToday() {
  return new Date(new Date().toDateString())
}

/** Returns a Date of the current date with a time of 23:59:59.
 **/
export function endOfToday() {
  const date = new Date()
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date
}

// STRINGS

/** Returns the provided string in lowercase form with spaces removed.
 * *
 * Example:
 * ```typescript
 * lowerCaseNoSpaces("Hello World") //=> "helloworld"
 * ```
 **/
export function lowerCaseNoSpaces(str: string) {
  return String(str).toLowerCase().replace(/ /g, "")
}

/** Returns a string limited to a max length with "..." or custom ending.
 *
 * Example:
 * ```typescript
 * truncate("Hello World!", 4) //=> "Hell..."

truncate("Hello World!", 4, "/") //=> "Hell/"
 * ```
 **/
export function truncate(
  str: string,
  lengthlevels: number,
  ending: string = "..."
) {
  return str.length > lengthlevels
    ? `${str.substring(0, lengthlevels)}${ending}`
    : str
}

/** Returns a random string of specified length. Can include letters and/or numbers.
 *
 * NOTE: `includeLetters` and `includeNumbers` both default to true.
 * 
 * Example:
 * ```typescript
 getRandomString(10) //=> "N3xO1pDs2f"

getRandomString(5, true, false) //=> "GjOxa"

getRandomString(5, false, true) //=> "39281"
 * ```
 **/
export function getRandomString(
  length: number,
  includeLetters = true,
  includeNumbers = true
): string {
  const chars = includeLetters
    ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : "" + includeNumbers
    ? "0123456789"
    : ""
  let randomString = ""
  for (let i = 1; i <= length; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)]
  }
  return randomString
}

// ARRAYS

/** Returns a boolean that reflects whether or not every item in an array meets a condition.
 * 
 * Example:
 * ```typescript
 const isEven = (n: number) => n % 2 === 0

isEvery([2, 4, 6, 8], (n) => isEven(n)) //=> true

isEvery([2, 4, 7, 8], (n) => isEven(n)) //=> false
 * ```
 **/
export function isEvery<T>(arr: T[], func: (i: T, index?: number) => boolean) {
  return arr.filter(func).length === arr.length
}

/** Returns a boolean that reflects whether or not any item in an array meets a condition.
 * 
 * Example:
 * ```typescript
 const isEven = (n: number) => n % 2 === 0

isAny([3, 5, 7, 9], (n) => isEven(n)) //=> false

isAny([2, 5, 7, 9], (n) => isEven(n)) //=> true
 * ```
 **/
export function isAny<T>(arr: T[], func: (i: T, index?: number) => boolean) {
  return arr.filter(func).length > 0
}

/** Returns the provided array with the items randomly ordered.
 * 
 * Example:
 * ```typescript
 shuffle([1, 2, 3, 4, 5]) //=> [3, 5, 1, 4, 2]
 * ```
 **/
export function shuffle<T>(array: T[]) {
  const _array = [...array]
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[_array[currentIndex], _array[randomIndex]] = [
      _array[randomIndex],
      _array[currentIndex],
    ]
  }
  return _array
}

/** Returns a random element from an array
 *
 * Example:
 * ```typescript
 * getRandomItem([1, 2, 3, 4, 5, 6]) //=> 3
 * ```
 **/
export function getRandomItem<T>(arr: T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

/** Returns the provided array with a minimum and/or maximum length limit enforced. If the minimum length
 *  is larger than the length of the array, the fill will be added to the array as many times as necessary
 * to reach the minimum limit. If a fill is provided, it must match the type of the array provided. If no
 * fill is provided, `undefined` will be added. For min and max limits, you can pass `false` or 0 for a
 * limit parameter to bypass.
 *
 * Example:
 * ```typescript
 * clampArray([1, 2, 3, 4, 5], 0, 3) //=> [1, 2, 3]

clampArray([1, 2, 3], 5, false, "x") //=> [1, 2, 3, "x", "x"]
 * ```
 **/
export function clampArray<T>(
  arr: T[],
  min: number | false,
  max: number | false,
  fill?: T
) {
  let result: (T | undefined)[] = []
  if (min && arr.length < min) {
    result = [...arr]
    const diff = min - arr.length
    for (let i = 1; i <= diff; i++) {
      result.push(fill)
    }
  }
  if (max && arr.length > max) result = arr.slice(0, max)
  return result
}

/** Divides the provided array into smaller arrays of a provided size. Returns an array of these smaller arrays.
 *
 * Example:
 * ```typescript
 *chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
//=> [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * ```
 **/
export function chunkArray<T>(arr: T[], chunkSize: number) {
  const items = Array.from(arr)
  const result: T[][] = []
  while (items.length > 0) {
    result.push(items.splice(0, chunkSize))
  }
  return result
}

/** Returns a single dimensional array by default. If you pass a number for levels, the function will only reduce
 * that many dimensions of arrays.
 *
 * NOTE: You should never pass in a value for `currentLevel`. This is a helper param used for recursion.
 *
 * Example:
 * ```typescript
 * flatten([1,[2,3,[4,5]],6]) //=> [1, 2, 3, 4, 5, 6]
 *
 * flatten([1,[2,3,[4,5]],6], 1) //=> [1, 2, 3, [4, 5], 6]
 * ```
 **/
export function flatten(arr: any[], levels = 0, currentLevel = 0): any[] {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && (!levels || currentLevel < levels)) {
      return [...acc, ...flatten(item, levels, currentLevel + 1)]
    } else return [...acc, item]
  }, [])
}

type SortableArray = (string | number)[]

/** Returns the provided array sorted (ascending) via bubble sort.
 **/
export function bubbleSort(arr: SortableArray) {
  let noSwaps
  for (var i = arr.length; i > 0; i--) {
    noSwaps = true
    for (var j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        noSwaps = false
      }
    }
    if (noSwaps) break
  }
  return arr
}

/** Returns the provided array sorted (ascending) via selection sort.
 **/
export function selectionSort(arr: SortableArray) {
  const swap = (arr: unknown[], idx1: number, idx2: number) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]])

  for (let i = 0; i < arr.length; i++) {
    let lowest = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[lowest] > arr[j]) {
        lowest = j
      }
    }
    if (i !== lowest) swap(arr, i, lowest)
  }

  return arr
}

/** Returns the provided array sorted (ascending) via insertion sort.
 **/
export function insertionSort(arr: SortableArray) {
  var currentVal
  for (var i = 1; i < arr.length; i++) {
    currentVal = arr[i]
    for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = currentVal
  }
  return arr
}

/** Returns the provided array with any duplicates removed.
 *
 * Example:
 * ```typescript
 * removeDuplicates([1, 2, 3, 3, 4, 4, 5]) //=> [1, 2, 3, 4, 5]
 * ```
 **/
export function removeDuplicates(arr: any[]) {
  return Array.from(new Set(arr))
}

/** Returns an array of the rolling sum of the provided array of numbers.
 **/
export function getRollingSum(arr: number[], decimalPlaces?: number) {
  return arr.reduce(
    (acc, i, index) =>
      index > 0
        ? [...acc, float(acc[acc.length - 1] + Number(i), decimalPlaces)]
        : [i],
    [] as number[]
  )
}

/** Returns an object with items from the provided array as keys and values of the number of
 * instances of these values in the array.
 **/
export function getCounts<T>(arr: T[]): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  arr.forEach((item) => {
    if (result[item as string]) result[item as string]++
    else result[item as string] = 1
  })
  return result
}

/** Returns the number of instances the target occurs in the provided array.
 *
 * Example:
 * ```typescript
 * const arr = [1, 2, 3, 3, 4, 4, 4, 5]
 * getCount(arr, 4) //=> 3
 * ```
 **/
export function getCountOf<T>(arr: T[], target: T) {
  return getCounts(arr)[target as string] || 0
}

/** Returns an array of items that only appear in one of the provided arrays.
 *
 * Example:
 * ```typescript
 * const arr1 = [1, 2, 3, 4]
 * const arr2 = [3, 4, 5, 6]
 *
 * getUniqueItems(arr1, arr2) //=> [1, 2, 5, 6]
 * ```
 * See also: `getCommonItems()` and `getSharedItems()`
 **/
export function getUniqueItems<T>(...arrs: T[][]) {
  const seen: T[] = []
  let result: T[] = []
  const sets = arrs.map((arr) => new Set(arr))
  for (let i = 0; i < sets.length; i++) {
    sets[i].forEach((j) => {
      if (seen.includes(j)) {
        result = result.filter((x) => x !== j)
      } else {
        seen.push(j)
        result.push(j)
      }
    })
  }
  return result
}

/** Returns an array of items that appear in at least two of the provided arrays.
 *
 * Example:
 * ```typescript
 * const arr1 = [1, 2, 3, 4]
 * const arr2 = [3, 4, 5, 6]
 * const arr3 = [4, 5, 6, 7]
 *
 * getCommonItems(arr1, arr2, arr3) //=> [3, 4, 5, 6]
 * ```
 * See also: `getUniqueItems()` and `getSharedItems()`
 **/
export function getCommonItems<T>(...arrs: T[][]) {
  const seen: T[] = []
  let result: T[] = []
  for (let i = 0; i < arrs.length; i++) {
    arrs[i].forEach((j) => {
      if (seen.includes(j) && !result.includes(j)) {
        result.push(j)
      }
      seen.push(j)
    })
  }
  return result
}

/** Returns an array of items that appear in all of the provided arrays.
 *
 * Example:
 * ```typescript
 * const arr1 = [1, 2, 3, 4]
 * const arr2 = [3, 4, 5, 6]
 * const arr3 = [4, 5, 6, 7]
 *
 * getSharedItems(arr1, arr2, arr3) //=> [4]
 * ```
 * See also: `getUniqueItems()` and `getCommonItems()`
 **/
export function getSharedItems<T>(...arrs: T[][]) {
  let result: T[] = []
  arrs[0].forEach((item) => {
    let isItemInAllOtherArrays = true
    arrs.slice(1).forEach((compareArray) => {
      if (!compareArray.includes(item)) isItemInAllOtherArrays = false
    })
    if (isItemInAllOtherArrays) result.push(item)
  })
  return result
}

/** Returns the item in the array N spots from the last item.
 *
 * Example:
 * ```typescript
 * nthFromEnd([1, 2, 3, 4, 5], 2) //=> 3
 * ```
 **/
export function nthFromEnd<T>(arr: T[], n: number) {
  return arr[arr.length - 1 - n]
}

/** Returns a boolean of whether or not the two arrays have the same items.
 *
 * Example:
 * ```typescript
 * const arr1 = [1, 2, 3, 4]
 * const arr2 = [1, 2, 3, 4]
 * const arr3 = [4, 3, 2, 1]
 *
 * areArraysEqual(arr1, arr2) //=> true
 *
 * areArraysEqual(arr2, arr3) //=> false
 *
 * areArraysEqual(arr2, arr3, false) //=> true
 * ```
 * NOTE: `orderMatters` is true by default.
 **/
export function areArraysEqual<T>(
  array1: T[],
  array2: T[],
  orderMatters = true
) {
  const _array1 = orderMatters ? array1 : [...array1].sort()
  const _array2 = orderMatters ? array2 : [...array2].sort()
  for (let i = 0; i < array1.length; i++) {
    if (_array1[i] !== _array2[i]) return false
  }
  return true
}

// OBJECTS

/** Returns the object with any provided keys removed.
 *
 * Example:
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * omitKeys(obj, "b") //=> { a: 1, c: 3 }
 * ```
 **/
export function omitKeys(obj: { [key: string]: any }, ...keys: string[]) {
  const result: { [key: string]: any } = {}
  Object.keys(obj).forEach((key: string) => {
    if (!keys.includes(key)) {
      result[key as string] = obj[key]
    }
  })
  return result
}

/** Returns the object with only the provided keys included.
 *
 * Example:
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * pickKeys(obj, "a", "c") //=> { a: 1, c: 3 }
 * ```
 **/
export function pickKeys<T extends object, U extends keyof T>(
  obj: T,
  ...keys: U[]
) {
  const result: { [key: string]: any } = {}
  const keysAsStrings = keys.map((k) => k as string)
  Object.keys(obj).forEach((key: string) => {
    if (keysAsStrings.includes(key)) {
      result[key] = obj[key as U]
    }
  })
  return result
}

/** Returns a single object with all key value pairs from provided objects.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 1, b: 2, c: 3 }
 * const obj2 = { d: 4, e: 5, f: 6 }
 *
 * combineObjects(obj1, obj2)
 * //=>
 *     {
 *      a: 1,
 *      b: 2,
 *      c: 3,
 *      d: 4,
 *      e: 5,
 *      f: 6
 *     }
 * ```
 *
 * NOTE: If two objects have the same key, the latter object's value will result.
 **/
export function combineObjects(objs: { [key: string]: any }[]): object {
  const result: { [key: string]: any } = {}
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      result[key] = obj[key]
    })
  })
  return result
}

/** Returns the sum of the values of a specific shared key in an array of objects.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 1, b: 2, c: 3 }
 * const obj2 = { a: 2, b: 3, c: 4 }
 *
 * sumOfKeyValue([obj1, obj2], "c") //=> 7
 * ```
 **/
export function sumOfKeyValue<T extends object, U extends keyof T>(
  arr: (T & { [K in U]: number })[],
  key: U
) {
  return arr.reduce((acc, i) => acc + i[key], 0)
}

/** Sorts an array of objects by a specific shared key's value.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 3, b: 2 }
 * const obj2 = { a: 1, b: 2 }
 * const obj3 = { a: 2, b: 2 }
 *
 * sortObjectsByKeyValue([obj1, obj2, obj3], "a")
 * //=>
 *     [
 *       { a: 1, b: 2 },
 *       { a: 2, b: 2 },
 *       { a: 3, b: 2 },
 *     ]
 * ```
 **/
export function sortObjectsByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U
) {
  return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1))
}

/** Returns an array of objects with nested sorting based on the keys provided.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 1, b: 6, c: 3 }
 * const obj2 = { a: 3, b: 2, c: 4 }
 * const obj3 = { a: 3, b: 2, c: 3 }
 * const obj4 = { a: 2, b: 4, c: 3 }
 * const obj5 = { a: 2, b: 5, c: 3 }
 *
 * sortObjectsByKeyValues([obj1, obj2, obj3, obj4, obj5], "a","b", "c")
 * //=>
 *      [
 *       { a: 1, b: 6, c: 3 }
 *       { a: 2, b: 4, c: 3 }
 *       { a: 2, b: 5, c: 3 }
 *       { a: 3, b: 2, c: 3 }
 *       { a: 3, b: 2, c: 4 }
 *      ]
 * ```
 **/
export function sortObjectsByKeyValues<T extends object, U extends keyof T>(
  objs: T[],
  ...keys: U[]
): T[] {
  if (keys.length === 1) return sortObjectsByKeyValue(objs, keys[0])

  const groupedByKey = groupObjectsByKeyValue(objs, keys[0])
  const sortedKeyValues = Object.keys(groupedByKey).sort()

  return sortedKeyValues.reduce(
    (acc: T[], keyVal) => [
      ...acc,
      ...sortObjectsByKeyValues(groupedByKey[keyVal], ...keys.slice(1)),
    ],
    []
  )
}

/** Returns an object with counts of specifics value of a specific shared key in an array of objects.
 *
 * Example:
 * ```typescript
 * const arr = [{ name: "John"}, { name: "Sarah"}, { name: "John"}, { name: "Beth"}]
 *
 * getKeyValueCounts(arr, "name") //=> { John: 2, Sarah: 1, Beth: 1 }
 * ```
 **/
export function getKeyValueCounts<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive?: boolean
) {
  return arr.reduce((result: { [key: string]: number }, obj) => {
    const value = isCaseSensitive
      ? (obj[key] as string)
      : (obj[key] as string).toLowerCase()
    if (result[value] > 0) {
      result[value] = result[value] + 1
      return result
    } else {
      result[value] = 1
      return result
    }
  }, {})
}

/** Returns an object with keys corresponding to the values of the shared key provided. The values are arrays of objects
 *  that share the same value of that key.
 *
 * Example:
 * ```typescript
 * const arr = [
 *    { name: "John", age: 30},
 *    { name: "Sarah", age: 32 },
 *    { name: "John", age: 28 },
 *    { name: "Beth", age: 23}
 * ]
 *
 * groupObjectsByKeyValue(arr, "name")
 * //=>
 *      {
 *        John: [{ name: "John", age: 30 }, {name: "John", age: 28 }]
 *         Sarah: [{ name: "Sarah", age: 32 }]
 *        Beth: [{name: "Beth", age: 23 }]
 *      }
 * ```
 **/
export function groupObjectsByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U
) {
  const result: { [key: string]: T[] } = {}
  arr.forEach((obj: T) => {
    const keyValue = obj[key] as string
    if (result[keyValue]) result[keyValue].push(obj)
    else result[keyValue] = [obj]
  })
  return result
}

/** Returns a string of an object's key and value pairs as a query parameter string. Supports one level of nesting.
 *
 * Example:
 * ```typescript
 * convertObjectToQueryParams({ age: 30, city: "Atlanta" }) //=> "age=38&city=Atlanta"
 * ```
 **/
export function convertObjectToQueryParams(obj: object): string {
  let result = ""
  const objectKeys = Object.keys(obj)
  objectKeys.forEach((key, i) => {
    const keyValue = obj[key as keyof typeof obj]
    if (typeof keyValue !== "object") {
      result += `${key}=${keyValue}` + (i < objectKeys.length - 1 ? "&" : "")
    } else {
      const objectKeys2 = Object.keys(keyValue)
      objectKeys2.forEach((key2, i2) => {
        const keyValue2 = keyValue[key2 as keyof typeof keyValue]
        result +=
          `${key}[${key2}]=${keyValue2}` +
          (i2 < objectKeys2.length - 1 || i < objectKeys.length - 1 ? "&" : "")
      })
    }
  })
  return result
}

/** Returns a boolean representing if a set of objects have the same key value pairs.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 1, b:2, c: 3 }
 * const obj2 = { a: 1, b:2, c: 3 }
 * const obj3 = { a: 4, b:5, c: 6 }
 *
 * areObjectsEqual(ob1, obj2) //=> true
 * areObjectsEqual(ob1, obj2, obj3) //=> false
 * ```
 */
export function areObjectsEqual(...objs: object[]) {
  const obj1 = objs[0]
  objs.slice(1).reduce((acc, obj) => {
    if (JSON.stringify(obj1) !== JSON.stringify(obj)) return false
    else return acc
  }, true)
}

// EXPRESS

export type Handler = (req: Request, res: Response) => void
type Handlers = {
  index?: Handler
  show?: Handler
  create?: Handler
  update?: Handler
  deleteFn?: Handler
  extendRouter?: (router: Router) => void
}

/** Returns an Express Router with CRUD routes
 **/
export function createExpressRoutes(handlers: Handlers): Router {
  // @ts-ignore Must be ignored for non-Express projects
  let router = express.Router()

  if (handlers.index) router.get("", handlers.index)
  if (handlers.show) router.get("/:id", handlers.show)
  if (handlers.create) router.post("", handlers.create)
  if (handlers.update) router.put("/:id", handlers.update)
  if (handlers.deleteFn) router.delete("/:id", handlers.deleteFn)

  if (handlers.extendRouter) handlers.extendRouter(router)

  return router
}

// SEQUELIZE

export function convertQueryParamOperators(params: {}) {
  const output = {}
  for (let param in params) {
    const paramString = String(param)
    const operator = paramString.substring(paramString.length - 1)
    const paramStringWithoutOperator = paramString.substring(
      0,
      paramString.length - 1
    )
    switch (operator) {
      case "!":
        // @ts-ignore Must be ignored for non-Sequelize projects
        output[paramStringWithoutOperator] = { [Op.ne]: params[param] }
        break
      default:
        // @ts-ignore
        output[paramString] = params[param]
    }
  }
  return output
}

// MISC

/** Returns a promise that rejects if the original promise takes longer to resolve than the provided amount of time
 * in milliseconds.
 **/
export function addTimeoutToPromise(
  asyncFunction: () => Promise<unknown>,
  timeout: number
) {
  return () =>
    new Promise((resolve, reject) => {
      let timer: NodeJS.Timeout
      asyncFunction().then((result) => {
        clearTimeout(timer)
        resolve(result)
      })
      timer = setTimeout(() => {
        reject("TIMED_OUT")
      }, timeout)
    }) as Promise<unknown>
}

/** Returns a promise that resolves after a given amount of time in milliseconds.
 **/
export function pauseAsync(milliseconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds)
  })
}

/** Delays future code from executing until the provided milliseconds have passed.
 **/
export function pauseSync(ms: number) {
  const start = Date.now()
  const end = start + ms
  while (Date.now() < end) {}
}

type GenericFunction<T> = (...args: T[]) => unknown

/** Returns a function that calls multiple given functions in a specific order.
 * 
 * Example:
 * ```typescript
const double = (n: number) => n * 2
const triple = (n: number) => n * 3
const doubleThenTriple = pipe(double, triple)

doubleThenTriple(6) //=> 36
* ```
 **/
export function pipe<T>(
  ...funcs: [
    firstFunc: GenericFunction<T>,
    secondFunc: GenericFunction<T>,
    ...otherFuncs: GenericFunction<T>[]
  ]
) {
  return (...args: T[]) => {
    return funcs.reduce((acc: any, current) => current(acc), args[0])
  }
}

/** Returns a debounced version of the function passed. Acccepts custom delay in
 * milliseconds and immediate boolean for leading/trailing.
 *
 * * If `immediate` is `true`, the function will execute immediately on the first call. The function
 * will not execute if called again until the provided milliseconds have passed.
 * * If `immediate` is `false`, the function will not execute until the provided milliseconds have passed. If the
 * function is called again before the time has passed, the timer starts over.
 **/
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  ms: number,
  immediate: boolean
) {
  let wait: NodeJS.Timeout
  let isWaiting = false

  const getReturnObject = (args: Parameters<T>) => ({
    clear: () => {
      clearTimeout(wait)
      isWaiting = false
    },
    flush: () => {
      clearTimeout(wait)
      isWaiting = false

      func(...args)
    },
  })
  if (immediate) {
    return (...args: Parameters<T>) => {
      if (isWaiting) return getReturnObject(args)
      else {
        isWaiting = true
        wait = setTimeout(() => (isWaiting = false), ms)

        func(...args)
      }

      return getReturnObject(args)
    }
  } else {
    return (...args: Parameters<T>) => {
      if (isWaiting) clearTimeout(wait)
      isWaiting = true
      wait = setTimeout(() => {
        isWaiting = false

        func(...args)
      }, ms)

      return getReturnObject(args)
    }
  }
}

export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const results: { [key: string]: ReturnType<T> } = {}
  return ((...args: Parameters<T>): ReturnType<T> => {
    const argsAsString = args.join(",")
    if (results[argsAsString]) return results[argsAsString]
    else {
      results[argsAsString] = func(...args)
      return results[argsAsString]
    }
  }) as T
}

// BROWSER STUFF

/** Prompts a user in their browser to save provided text to a file on their machine.
 **/
export function saveTextToFileInBrowser(content: string, filename: string) {
  const a = document.createElement("a")
  const file = new Blob([content], { type: "text/plain" })

  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()

  URL.revokeObjectURL(a.href)
}

/** Returns the value of a specific cookie.
 **/
export function getCookie(cookieName: string) {
  const name = cookieName + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

/** Sets the value of a specific cookie.
 **/
export function setCookie(
  cookieName: string,
  cookieValue: string,
  expirationInDays: number
) {
  const d = new Date()
  d.setTime(d.getTime() + expirationInDays * 24 * 60 * 60 * 1000)
  const expires = "expires=" + d.toUTCString()
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";"
}

export type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: Function
  breakOut: Function
}

/** Returns a `QueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
export function createQueue(functionToExecute: Function): QueueObject {
  const queue: unknown[] = []
  let isBreakRequested = false
  const executeOne = () => {
    if (Array.isArray(queue[0])) functionToExecute(...queue[0])
    else functionToExecute(queue[0])
    queue.shift()
  }
  const executeAll = () => {
    if (isBreakRequested) return
    if (Array.isArray(queue[0])) functionToExecute(...queue[0])
    else functionToExecute(queue[0])
    queue.shift()
    if (queue.length > 0) executeAll()
  }
  return {
    queue,
    enqueue: (...args: unknown[]) => queue.push(args),
    executeOne,
    executeAll,
    breakOut: () => {
      isBreakRequested = true
    },
  }
}

type AsyncQueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: (ignoreErrors?: boolean) => unknown
  breakOut: Function
}

/** Returns an `AsyncQueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
export function createQueueAsync(
  functionToExecute: (...args: any[]) => Promise<unknown>
): AsyncQueueObject {
  const queue: unknown[] = []
  let isBreakRequested = false
  const executeOne = async () => {
    if (Array.isArray(queue[0])) await functionToExecute(...queue[0])
    else await functionToExecute(queue[0])
    queue.shift()
  }
  const executeAll = async (ignoreErrors = false) => {
    if (isBreakRequested) return
    try {
      if (Array.isArray(queue[0])) await functionToExecute(...queue[0])
      else await functionToExecute(queue[0])
      queue.shift()
      if (queue.length > 0) executeAll(ignoreErrors)
    } catch {
      if (ignoreErrors) {
        queue.shift()
        if (queue.length > 0) executeAll(true)
      }
    }
  }
  return {
    breakOut: () => {
      isBreakRequested = true
    },
    queue,
    enqueue: (...args: unknown[]) => queue.push(args),
    executeOne,
    executeAll,
  }
}

type GeoCoords = {
  latitude: number | null
  longitude: number | null
}

/** Returns the user's latitude and longitude or an error.
 *
 * Example:
 * ```typescript
 * getBrowserGeolocation() //=> { latitude: 35.7402404, longitude: -82.3420191 }
 * ```
 **/
export async function getBrowserGeolocation(timeoutInSeconds = 10) {
  let browserLocation: GeoCoords = { latitude: null, longitude: null }
  let err = null
  let pauseCount = 0
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      browserLocation.latitude = coords.latitude
      browserLocation.longitude = coords.longitude
    },
    () => {
      err = "Unable to get location"
    }
  )
  while (browserLocation.latitude === null && err === null) {
    await pauseAsync(500)
    pauseCount++
    if (pauseCount === timeoutInSeconds * 2) err = "TIMED_OUT"
  }
  if (err) throw err
  else return browserLocation
}

/** Returns the window location's search params as an object. Supports single-level nesting.
 **/
export function getURLQueryParams() {
  const params = new URLSearchParams(window.location.search).entries()
  return Array.from(params).reduce((acc, [key, value]: string[]) => {
    const objectRegEx = /(.+)\[(.+)\]/
    if (objectRegEx.test(key)) {
      const [_, parentKey, childKey] = objectRegEx.exec(key)!
      return {
        ...acc,
        [parentKey]: { [childKey]: value },
      }
    } else return { ...acc, [key]: value }
  }, {})
}
