import type { Router } from "express"
/** Returns a number limited to a specific number of decimal places.
This is different from the native `toFixed()` method because it returns a number not a string.
*
* _Example:_
* ```typescript
* float(4.24398, 3) //=> 4.244
* ```
 **/
export declare function float(n: number, decimalPlaces?: number): number
/** Returns the sum of the provided numbers.
 *
 * Example:
 * ```typescript
 * sum(1, 4, 6) //=> 11
 * ```
 **/
export declare function sum(...arr: number[]): number
/** Enforces a minimum and/or maximum limit on a number and returns the number or the enforced limit.
 You can pass **false** or **0** for a limit parameter to bypass that limit.
*
* _Example:_
* ```typescript
* clamp(15, 3, 12) //=> 12
* clamp(15, 16, 20) //=> 16
* ```
 **/
export declare function clampNumber(
  n: number,
  min: number | false,
  max?: number | false
): number
/** Returns a provided single digit number with a leading zero as a string.
 *
 * _Example:_
 * ```typescript
 * doubleDigit(9) //=> "09"
 * ```
 **/
export declare function doubleDigit(n: number): string
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
export declare function getRange(
  start: number,
  end: number,
  step?: number
): number[] | undefined
/** Returns a string of the provided number with the ordinal suffix added.
 *
 * _Example:_
 * ```typescript
 * ordinal(4) //=> "4th"
 * ```
 **/
export declare function ordinal(n: number): string
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
export declare function getAmountOfTimeFromSeconds(seconds: number): TimeObject
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
export declare function timeUntil(date: Date): TimeObject
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
export declare function timeSince(date: Date): TimeObject
/** Returns the corresponding human readable day name of the integer (0-6) provided.
 *
 * Example:
 * ```typescript
 * getDayName(3) //=> "Wednesday"
 * ```
 **/
export declare function getDayName(day: 0 | 1 | 2 | 3 | 4 | 5 | 6): string
/** Returns a Date of the current date with a time of 0:00:00.
 **/
export declare function beginningOfToday(): Date
/** Returns a Date of the current date with a time of 23:59:59.
 **/
export declare function endOfToday(): Date
/** Returns the provided string in lowercase form with spaces removed.
 * *
 * Example:
 * ```typescript
 * lowerCaseNoSpaces("Hello World") //=> "helloworld"
 * ```
 **/
export declare function lowerCaseNoSpaces(str: string): string
/** Returns a string limited to a max length with "..." or custom ending.
 *
 * Example:
 * ```typescript
 * truncate("Hello World!", 4) //=> "Hell..."

truncate("Hello World!", 4, "/") //=> "Hell/"
 * ```
 **/
export declare function truncate(
  str: string,
  lengthlevels: number,
  ending?: string
): string
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
export declare function getRandomString(
  length: number,
  includeLetters?: boolean,
  includeNumbers?: boolean
): string
/** Returns a boolean that reflects whether or not every item in an array meets a condition.
 *
 * Example:
 * ```typescript
 const isEven = (n: number) => n % 2 === 0

isEvery([2, 4, 6, 8], (n) => isEven(n)) //=> true

isEvery([2, 4, 7, 8], (n) => isEven(n)) //=> false
 * ```
 **/
export declare function isEvery<T>(
  arr: T[],
  func: (i: T, index?: number) => boolean
): boolean
/** Returns a boolean that reflects whether or not any item in an array meets a condition.
 *
 * Example:
 * ```typescript
 const isEven = (n: number) => n % 2 === 0

isAny([3, 5, 7, 9], (n) => isEven(n)) //=> false

isAny([2, 5, 7, 9], (n) => isEven(n)) //=> true
 * ```
 **/
export declare function isAny<T>(
  arr: T[],
  func: (i: T, index?: number) => boolean
): boolean
/** Returns the provided array with the items randomly ordered.
 *
 * Example:
 * ```typescript
 shuffle([1, 2, 3, 4, 5]) //=> [3, 5, 1, 4, 2]
 * ```
 **/
export declare function shuffle<T>(array: T[]): T[]
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
export declare function clampArray<T>(
  arr: T[],
  min: number | false,
  max: number | false,
  fill?: T
): (T | undefined)[]
/** Divides the provided array into smaller arrays of a provided size. Returns an array of these smaller arrays.
 *
 * Example:
 * ```typescript
 *chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
//=> [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * ```
 **/
export declare function chunkArray<T>(arr: T[], chunkSize: number): T[][]
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
export declare function flatten(
  arr: any[],
  levels?: number,
  currentLevel?: number
): any[]
type SortableArray = (string | number)[]
/** Returns the provided array sorted (ascending) via bubble sort.
 **/
export declare function bubbleSort(arr: SortableArray): SortableArray
/** Returns the provided array sorted (ascending) via selection sort.
 **/
export declare function selectionSort(arr: SortableArray): SortableArray
/** Returns the provided array sorted (ascending) via insertion sort.
 **/
export declare function insertionSort(arr: SortableArray): SortableArray
/** Returns the provided array with any duplicates removed.
 *
 * Example:
 * ```typescript
 * removeDuplicates([1, 2, 3, 3, 4, 4, 5]) //=> [1, 2, 3, 4, 5]
 * ```
 **/
export declare function removeDuplicates(arr: any[]): any[]
/** Returns an array of the rolling sum of the provided array of numbers.
 **/
export declare function getRollingSum(
  arr: number[],
  decimalPlaces?: number
): number[]
/** Returns an object with items from the provided array as keys and values of the number of
 * instances of these values in the array.
 **/
export declare function getCounts<T>(arr: T[]): {
  [key: string]: number
}
/** Returns the number of instances the target occurs in the provided array.
 *
 * Example:
 * ```typescript
 * const arr = [1, 2, 3, 3, 4, 4, 4, 5]
 * getCount(arr, 4) //=> 3
 * ```
 **/
export declare function getCountOf<T>(arr: T[], target: T): number
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
export declare function getUniqueItems<T>(...arrs: T[][]): T[]
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
export declare function getCommonItems<T>(...arrs: T[][]): T[]
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
export declare function getSharedItems<T>(...arrs: T[][]): T[]
/** Returns the item in the array N spots from the last item.
 *
 * Example:
 * ```typescript
 * nthFromEnd([1, 2, 3, 4, 5], 2) //=> 3
 * ```
 **/
export declare function nthFromEnd<T>(arr: T[], n: number): T
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
export declare function areArraysEqual<T>(
  array1: T[],
  array2: T[],
  orderMatters?: boolean
): boolean
/** Returns the object with any provided keys removed.
 *
 * Example:
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * omitKeys(obj, "b") //=> { a: 1, c: 3 }
 * ```
 **/
export declare function omitKeys(
  obj: {
    [key: string]: any
  },
  ...keys: string[]
): {
  [key: string]: any
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
export declare function pickKeys<T extends object, U extends keyof T>(
  obj: T,
  ...keys: U[]
): {
  [key: string]: any
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
export declare function combineObjects(
  objs: {
    [key: string]: any
  }[]
): object
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
export declare function sumOfKeyValue<T extends object, U extends keyof T>(
  arr: (T & {
    [K in U]: number
  })[],
  key: U
): number
/** Sorts an array of objects by a specific shared key's value.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 3, b: 2 }
 * const obj2 = { a: 1, b: 2 }
 * const obj3 = { a: 2, b: 2 }
 *
 * sortByKeyValue([obj1, obj2, obj3], "a")
 * //=>
 *     [
 *       { a: 1, b: 2 },
 *       { a: 2, b: 2 },
 *       { a: 3, b: 2 },
 *     ]
 * ```
 **/
export declare function sortByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U
): T[]
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
 * sortByKeyValues([obj1, obj2, obj3, obj4, obj5], "a","b", "c")
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
export declare function sortByKeyValues<T extends object, U extends keyof T>(
  objs: T[],
  ...keys: U[]
): T[]
/** Returns an object with counts of specifics value of a specific shared key in an array of objects.
 *
 * Example:
 * ```typescript
 * const arr = [{ name: "John"}, { name: "Sarah"}, { name: "John"}, { name: "Beth"}]
 *
 * getKeyValueCounts(arr, "name") //=> { John: 2, Sarah: 1, Beth: 1 }
 * ```
 **/
export declare function getKeyValueCounts<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive?: boolean
): {
  [key: string]: number
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
 * groupByKeyValue(arr, "name")
 * //=>
 *      {
 *        John: [{ name: "John", age: 30 }, {name: "John", age: 28 }]
 *         Sarah: [{ name: "Sarah", age: 32 }]
 *        Beth: [{name: "Beth", age: 23 }]
 *      }
 * ```
 **/
export declare function groupByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U
): {
  [key: string]: T[]
}
/** Returns a string of an object's key and value pairs as a query parameter string. Supports one level of nesting.
 *
 * Example:
 * ```typescript
 * convertObjectToQueryParams({ age: 30, city: "Atlanta" }) //=> "age=38&city=Atlanta"
 * ```
 **/
export declare function convertObjectToQueryParams(obj: object): string
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
export declare function createExpressRoutes(handlers: Handlers): Router
export declare function convertQueryParamOperators(params: {}): {}
/** Returns a promise that rejects if the original promise takes longer to resolve than the provided amount of time
 * in milliseconds.
 **/
export declare function addTimeoutToPromise(
  asyncFunction: () => Promise<unknown>,
  timeout: number
): () => Promise<unknown>
/** Returns a promise that resolves after a given amount of time in milliseconds.
 **/
export declare function pauseAsync(milliseconds: number): Promise<unknown>
/** Delays future code from executing until the provided milliseconds have passed.
 **/
export declare function pauseSync(ms: number): void
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
export declare function pipe<T>(
  ...funcs: [
    firstFunc: GenericFunction<T>,
    secondFunc: GenericFunction<T>,
    ...otherFuncs: GenericFunction<T>[]
  ]
): (...args: T[]) => unknown
/** Returns a debounced version of the function passed. Acccepts custom delay in
 * milliseconds and immediate boolean for leading/trailing.
 *
 * * If `immediate` is `true`, the function will execute immediately on the first call. The function
 * will not execute if called again until the provided milliseconds have passed.
 * * If `immediate` is `false`, the function will not execute until the provided milliseconds have passed. If the
 * function is called again before the time has passed, the timer starts over.
 **/
export declare function debounce<T extends (...args: any[]) => any>(
  func: T,
  ms: number,
  immediate: boolean
): (...args: Parameters<T>) => {
  clear: () => void
  flush: () => void
}
/** Prompts a user in their browser to save provided text to a file on their machine.
 **/
export declare function saveTextToFileInBrowser(
  content: string,
  filename: string
): void
/** Returns the value of a specific cookie.
 **/
export declare function getCookie(cookieName: string): string
/** Sets the value of a specific cookie.
 **/
export declare function setCookie(
  cookieName: string,
  cookieValue: string,
  expirationInDays: number
): void
export type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: Function
  breakOut: Function
}
/** Returns a `QueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
export declare function createQueue(functionToExecute: Function): QueueObject
type AsyncQueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: (ignoreErrors?: boolean) => unknown
  breakOut: Function
}
/** Returns an `AsyncQueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
export declare function createQueueAsync(
  functionToExecute: (...args: any[]) => Promise<unknown>
): AsyncQueueObject
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
export declare function getBrowserGeolocation(
  timeoutInSeconds?: number
): Promise<GeoCoords>
/** Returns the window location's search params. Supports single-level nesting.
 **/
export declare function getBrowserLocationQueryParams(): {}
export {}
