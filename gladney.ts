/* 
================================================================================================================================================
NUMBERS
================================================================================================================================================
toFixedNumber              | Returns a number limited to a specific numner of decimal places as a number (not a string)
clamp                      | Enforce a minimum and/or maximum limit on a number and returns the number or the enforced limit
toDoubleDigit              | Convert single digit numbers to double digit, i.e. 9 returns "09"
ordinal                    | Return the ordinal form of a number, i.e. 4 returns "4th"
getRange                   | Returns an array of numbers from a provided starting point to a provided ending point
================================================================================================================================================
DATES/TIMES
================================================================================================================================================
getAmountOfTimeFromSeconds | Returns years, months, weeks, days, hours, minutes, seconds
timeUntil                  | Returns the amount of time until a specific date
getDayName                 | Returns the human-readable weekday name from the numerical weekday provided
beginningOfToday           | Returns a Date object with date of today and time of 00:00:00
endOfToday                 | Returns a Date object with date of today and time of 11:59:59
================================================================================================================================================
STRINGS
================================================================================================================================================
lowerCaseNoSpaces          | Returns a string in lowercase form with spaces removed
truncate                   | Returns a string limited to a max length with ... or custom ending
getRandomString            | Returns a random string of specified length. Can include letters and/or numbers
================================================================================================================================================
ARRAYS
================================================================================================================================================
drop                       | Returns the provided array with n items removed from the end, where n is a provided integer
shuffle                    | Returns the provided array with the items randomly ordered
bubbleSort                 | Sorts an array via the bubble sort method
selectionSort              | Sorts an array via the selection sort method
insertionSort              | Sorts an array via the insertion sort method
removeDuplicates           | Removes duplicates from an array
sum                        | Returns the sum of an array of numbers
getRollingSum              | Returns an array of the rolling sum of an array, i.e. [1,3,5] returns [1,4,9]
================================================================================================================================================
OBJECTS
================================================================================================================================================
getSumOfKeyValues          | Returns the sum of the values of a specific shared key in an array of objects
sortObjectsByKeyValue      | Sort an array of objects by a specific shared key's value
getKeyValueCounts          | Returns an object with counts of a specific value of a specific shared key in an array of objects
groupObjectsByKeyValue     | Returns an object with arrays of objects that share a specific value of a specific shared key in an array of objects
================================================================================================================================================
MISC
================================================================================================================================================
addTimeoutToPromise        | Returns a promise that rejects if the original promise takes longer to resolve than a given amount of time (ms)
debounce                   | Returns a debounced version of the function passed. Acccepts custom delay and immediate boolean for leading/trailing
pause                      | Returns a promise that resolves after a given amount of time (ms)
pipe                       | Returns a function that calls multiple given functions in a specific order
saveTextToFileInBrowser    | Prompts a user in their browser to save provided text to a file on their machine
getCookie                  | Returns the value of a specific cookie
setCookie                  | Sets the vaue of a specific cookie
*/

export function toFixedNumber(n: number, decimalPlaces?: number) {
  return decimalPlaces ? Number(n.toFixed(decimalPlaces)) : n
}

export function clamp(n: number, min: number | null, max: number | null) {
  let result = n
  if (min) result = n > min ? n : min
  if (max) result = result < max ? result : max
  return result
}

export function toDoubleDigit(n: number) {
  if (String(n).length > 2) return n
  else return String(`0${n}`).slice(-2)
}

export function getRange(start: number, end: number) {
  const result = [start]
  for (let i = start + 1; i <= end; i++) {
    result.push(i)
  }
  return result
}

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

interface TimeOutput {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function getAmountOfTimeFromSeconds(seconds: number): TimeOutput {
  const secondsInAMinute = 60
  const secondsInAnHour = 3600
  const secondsInADay = 86400
  const secondsInAWeek = 604800
  const secondsInAMonth = 2592000 // Assumes 30 day month
  const secondsInAYear = 31557600
  return {
    years: Math.floor(seconds / secondsInAYear),
    months: Math.floor((seconds % secondsInAYear) / secondsInAMonth),
    weeks: Math.floor((seconds % secondsInAMonth) / secondsInAWeek),
    days: Math.floor((seconds % secondsInAWeek) / secondsInADay),
    hours: Math.floor((seconds % secondsInADay) / secondsInAnHour),
    minutes: Math.floor((seconds % secondsInAnHour) / secondsInAMinute),
    seconds: seconds % secondsInAMinute,
  }
}

export function timeUntil(date: Date): TimeOutput {
  const diffInSeconds = Math.floor(
    (new Date(date).getTime() - Date.now()) / 1000
  )
  return getAmountOfTimeFromSeconds(diffInSeconds)
}

export function getDayName(day: number) {
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

export function beginningOfToday() {
  return new Date(new Date().toDateString())
}

export function endOfToday() {
  const date = new Date()
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date
}

// STRINGS

export function lowerCaseNoSpaces(str: string) {
  return String(str).toLowerCase().replace(/ /g, "")
}

export function truncate(
  str: string,
  lengthLimit: number,
  ending: string = "..."
) {
  return str.length > lengthLimit
    ? `${str.substring(0, lengthLimit)}${ending}`
    : str
}

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

export function drop(arr: any[], n: number) {
  return arr.slice(0, arr.length - n)
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

type SortableArray = (string | number)[]

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

export function selectionSort(arr: SortableArray) {
  const swap = (arr, idx1, idx2) =>
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

export function removeDuplicates(arr: any[]) {
  return Array.from(new Set(arr))
}

export function sum(arr: number[]) {
  return arr.reduce((acc, i) => acc + i, 0)
}

export function getRollingSum(arr: number[], decimalPlaces: number) {
  return arr.reduce(
    (acc, i, index) =>
      index > 0
        ? [
            ...acc,
            toFixedNumber(acc[acc.length - 1] + Number(i), decimalPlaces),
          ]
        : [i],
    [] as number[]
  )
}

// OBJECTS

export function getSumOfKeyValues<T extends object, U extends keyof T>(
  arr: (T & { [K in U]: number })[],
  key: U
) {
  return arr.reduce((acc, i) => acc + i[key as string], 0)
}

export function sortObjectsByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U
) {
  return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1))
}

export function getKeyValueCounts<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive?: boolean
) {
  return arr.reduce((result: { [key: string]: number }, obj) => {
    const value = isCaseSensitive
      ? (obj[key] as string)
      : lowerCaseNoSpaces(obj[key] as string)
    if (result[value] > 0) {
      result[value] = result[value] + 1
      return result
    } else {
      result[value] = 1
      return result
    }
  }, {})
}

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

// EXPRESS

export type Handler = (req: Request, res: Response) => void
type Handlers = {
  index?: Handler
  show?: Handler
  create?: Handler
  update?: Handler
  deleteFn?: Handler
  // @ts-ignore Must be ignored for non-Express projects
  extendRouter?: (router: Router) => void
}

export function createRoutes(handlers: Handlers) {
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
        output[paramString] = params[param]
    }
  }
  return output
}

// MISC

export function addTimeoutToPromise(
  asyncFunction: () => Promise<unknown>,
  timeout: number
) {
  return () =>
    new Promise((resolve, reject) => {
      asyncFunction().then((result) => resolve(result))
      setTimeout(() => {
        reject("TIMED_OUT")
      }, timeout)
    }) as Promise<unknown>
}

export function pause(milliseconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds)
  })
}

type GenericFunction<T> = (...args: T[]) => unknown

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

export function debounce(func: Function, ms: number, immediate: boolean) {
  let wait: NodeJS.Timeout
  let isWaiting = false

  const getReturnObject = (...args: unknown[]) => ({
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
    return (...args: unknown[]) => {
      if (isWaiting) return
      else {
        isWaiting = true
        wait = setTimeout(() => (isWaiting = false), ms)
        func(...args)
      }
      return getReturnObject()
    }
  } else {
    return (...args: unknown[]) => {
      if (isWaiting) clearTimeout(wait)
      isWaiting = true
      wait = setTimeout(() => {
        isWaiting = false
        func(...args)
      }, ms)
      return getReturnObject()
    }
  }
}

// BROWSER STUFF

export function saveTextToFileInBrowser(content: string, filename: string) {
  const a = document.createElement("a")
  const file = new Blob([content], { type: "text/plain" })

  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()

  URL.revokeObjectURL(a.href)
}

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
