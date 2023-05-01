import type { Router } from "express"

export function float(n: number, decimalPlaces?: number) {
  return decimalPlaces ? Number(n.toFixed(decimalPlaces)) : n
}

export function clampNumber(n: number, min: number | null, max: number | null) {
  let result = n
  if (min) result = n > min ? n : min
  if (max) result = result < max ? result : max
  return result
}

export function doubleDigit(n: number) {
  if (String(n).length > 2) return n
  else return String(`0${n}`).slice(-2)
}

export function getRange(start: number, end: number, step = 1) {
  const result: number[] = []
  if (start < end && step > 0) {
    for (let i = start; i <= end; i += step) {
      result.push(i)
    }
  } else if (step < 0) {
    for (let i = start; i >= end; i += step) {
      result.push(i)
    }
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

export interface TimeObject {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

const secondsInAMinute = 60
const secondsInAnHour = 3600
const secondsInADay = 86400
const secondsInAWeek = 604800
const secondsInAMonth = 2592000 // Assumes 30 day month
const secondsInAYear = 31557600

export function getAmountOfTimeFromSeconds(seconds: number): TimeObject {
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

export function getSecondsFromAmountOfTime(time: TimeObject) {
  return (
    time.years * secondsInAYear +
    time.months * secondsInAMonth +
    time.weeks * secondsInAWeek +
    time.days * secondsInADay +
    time.hours * secondsInAnHour +
    time.minutes * secondsInAMinute +
    time.seconds
  )
}

export function timeUntil(date: Date): TimeObject {
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

export function isEvery<T>(arr: T[], func: (i: T, index?: number) => boolean) {
  return arr.filter(func).length === arr.length
}

export function isAny<T>(arr: T[], func: (i: T, index?: number) => boolean) {
  return arr.filter(func).length > 0
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

export function clampArray(
  arr: any[],
  min: number | null,
  max: number | null,
  fill?: any
) {
  let result
  if (min && arr.length < min) {
    result = arr
    const diff = min - arr.length
    for (let i = 1; i <= diff; i++) {
      arr.push(fill)
    }
  }
  if (max && arr.length > max) result = arr.slice(0, max)
  return result
}

export function chunkArray(arr: any[], chunkSize: number) {
  const items = Array.from(arr)
  const result: any[][] = []
  while (items.length > 0) {
    result.push(items.splice(0, chunkSize))
  }
  return result
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
        ? [...acc, float(acc[acc.length - 1] + Number(i), decimalPlaces)]
        : [i],
    [] as number[]
  )
}

export function getUniqueItems<T>(...arrs: T[][]) {
  const seen: T[] = []
  let result: T[] = []
  for (let i = 0; i < arrs.length; i++) {
    arrs[i].forEach((j) => {
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

export function getCommonItems<T>(...arrs: T[][]) {
  const seen: T[] = []
  let result: T[] = []
  for (let i = 0; i < arrs.length; i++) {
    arrs[i].forEach((j) => {
      if (seen.includes(j)) {
        result.push(j)
      } else {
        result = result.filter((x) => x !== j)
      }
      seen.push(j)
    })
  }
  return result
}

export function nthFromEnd(arr: any[], n: number) {
  return arr[arr.length - 1 - n]
}

export function areArraysEqual<T>(
  array1: T[],
  array2: T[],
  orderMatters = true
) {
  const _array1 = orderMatters ? array1 : array1.sort()
  const _array2 = orderMatters ? array2 : array2.sort()
  for (let i = 0; i < array1.length; i++) {
    if (_array1[i] !== _array2[i]) return false
  }
  return true
}

// OBJECTS

export function sumOfKeyValues<T extends object, U extends keyof T>(
  arr: (T & { [K in U]: number })[],
  key: U
) {
  return arr.reduce((acc, i) => acc + i[key], 0)
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
  extendRouter?: (router: Router) => void
}

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

export function pauseAsync(milliseconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds)
  })
}

export function pauseSync(ms: number) {
  const start = Date.now()
  const end = start + ms
  while (Date.now() < end) {}
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

export type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: Function
}

export function createQueue(functionToExecute: Function): QueueObject {
  const queue: unknown[] = []
  const executeOne = () => {
    if (Array.isArray(queue[0])) functionToExecute(...queue[0])
    else functionToExecute(queue[0])
    queue.shift()
  }
  const executeAll = () => {
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
  }
}

export type AsyncQueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: (ignoreErrors?: boolean) => unknown
}

export function createAsyncQueue(
  functionToExecute: (...args: unknown[]) => Promise<unknown>
): AsyncQueueObject {
  const queue: unknown[] = []
  const executeOne = async () => {
    if (Array.isArray(queue[0])) await functionToExecute(...queue[0])
    else await functionToExecute(queue[0])
    queue.shift()
  }
  const executeAll = async (ignoreErrors = false) => {
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
    queue,
    enqueue: (...args: unknown[]) => queue.push(args),
    executeOne,
    executeAll,
  }
}
