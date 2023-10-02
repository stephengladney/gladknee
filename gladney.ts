import type { Router } from "express"

/** Returns a number rounded to a specific level of precision. 
*
* _Example:_
* ```typescript
* round(4.24398, .001) //=> 4.244

* round(528, 10) //=> 530
* ```
 **/
export function round(n: number, precision: number) {
  return Math.round(n / precision) * precision
}

/** Returns the sum of given numbers.
 *
 * Example:
 * ```typescript
 * sum(1, 4, 6) //=> 11
 *
 * sum([1, 4, 6]) //=> 11
 *
 * sum([1, 4, 6], [1, 4, 6]) //=> 22
 * ```
 **/
export function sum(...arr: (number | number[])[]): number {
  return arr.reduce((acc, i) => {
    if (Array.isArray(i)) return (acc as number) + sum(...i)
    else return (acc as number) + i
  }, 0) as number
}

/** Returns a random number within a given range
 *
 * Example:
 * ```typescript
 * randomNumber(1, 100) //=> 39
 * randomNumber(1, 10) //=> 6
 * ```
 **/
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * max + min)
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

/** Returns a single digit number with a leading zero as a string.
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

/** Returns an array of numbers, starting from a start number and ending with an end number.
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
    if (step === 1) step = -1
    else if (step >= 0) return
    else {
      for (let i = start; i >= end; i += step) {
        result.push(i)
      }
    }
  }
  return result
}

/** Returns a string of a number with the ordinal suffix added.
 *
 * _Example:_
 * ```typescript
 * ordinal(4) //=> "4th"
 * ```
 **/
export function ordinal(n: number) {
  const lastTwoDigits = Number(String(n).slice(-2))
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${String(n)}th`
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

/** Returns the mean of a set of numbers.
 *
 * _Example:_
 * ```typescript
 * mean(1, 2, 3, 4, 5) //=> 3
 *
 * mean([1, 2, 3, 4, 5]) //=> 3
 * ```
 **/
export function mean(...numbers: (number | number[])[]) {
  return sum(...numbers) / numbers.length
}

/** Returns the median of a set of numbers.
 *
 * _Example:_
 * ```typescript
 * mean(1, 2, 3, 4, 5) //=> 3
 *
 * mean([1, 2, 3, 4, 5]) //=> 3
 * ```
 **/
export function median(...numbers: (number | number[])[]) {
  const sorted = safeSort(flatten(numbers)) as number[]
  if (sorted.length % 2 === 0) {
    return mean(sorted[sorted.length / 2], sorted[sorted.length / 2 - 1])
  } else {
    return sorted[Math.floor(sorted.length / 2)]
  }
}

/** Returns the mode of a set of numbers.
 *
 * _Example:_
 * ```typescript
x * mode(1, 2, 3, 4, 5) //=> 2
 *
 * mode([1, 2, 3, 4, 5]) //=> 2
 *
 * mode(1, 2, 2, 3, 4, 4, 5) //=> [2, 4]
 * ```
 **/
export function mode(...numbers: (number | number[])[]) {
  const counts = getCounts(flatten(numbers))
  const mostCommon = getKeyWithLargestValue(counts)
  if (Array.isArray(mostCommon)) return mostCommon.map((key) => Number(key))
  else return Number(mostCommon)
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

/** Returns a `TimeObject` with calculated years, months, weeks, days, hours, minutes and seconds from an amount of 
 * seconds. A `TimeObject` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
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

/** Returns a `TimeObject` with the number of years, months, weeks, days, hours, minutes and seconds until 
 * a specific date. A `TimeObject` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
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

/** Returns a `TimeObject` with the number of years, months, weeks, days, hours, minutes and seconds since a
 * specific date. A `TimeObject` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
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

/** Returns the corresponding human readable day name of an integer (0-6).
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
export function todayStart() {
  return new Date(new Date().toDateString())
}

/** Returns a Date of the current date with a time of 23:59:59.
 **/
export function todayEnd() {
  const date = new Date()
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date
}

/** Returns a boolean of whether or not a certain date/time has passed.
 **/
export function isPast(date: Date) {
  return new Date(date).getTime() < Date.now()
}

// STRINGS

/** Returns a string in lowercase form with spaces removed.
 * *
 * Example:
 * ```typescript
 * lowerCaseNoSpaces("Hello World") //=> "helloworld"
 * ```
 **/
export function lowerCaseNoSpaces(str: string) {
  return String(str).toLowerCase().replace(/ /g, "")
}

/** Returns a string limited to a max length with "..." or custom filler. You can also choose between a leading, trailing,
 * or middle filler. (trailing by default)
 *
 * Example:
 * ```typescript
 * truncate("Hello World!", 4) //=> "Hell..."
 *
 * truncate("Hello World!", 4, "/") //=> "Hell/"
 *
 * truncate("Hello World!", 4, "...", "leading") //=> "...rld!"
 *
 * truncate("Hello World!", 4, "...", "middle") //=> "He...d!"
 * ```
 **/
export function truncate(
  str: string,
  maxLength: number,
  fill: string = "...",
  style: "leading" | "trailing" | "middle" = "trailing"
) {
  if (str.length > maxLength) {
    switch (style) {
      case "leading":
        return `${fill}${str.substring(str.length - maxLength)}`
      case "trailing":
        return `${str.substring(0, maxLength)}${fill}`
      case "middle":
        const length1 =
          maxLength % 2 === 0 ? maxLength / 2 : Math.floor(maxLength / 2)
        const length2 =
          maxLength % 2 === 0 ? maxLength / 2 : Math.ceil(maxLength / 2)
        return (
          str.substring(0, length1) + fill + str.substring(str.length - length2)
        )
    }
  } else {
    return str
  }
}

/** Returns a string with a specific number of characters masked by * or custom character. You can also choose
 * between a leading, trailing, or middle filler (default: trailing) and can choose to ignore certain characters
 * when masking.
 *
 * Example:
 * ```typescript
 * mask("Password") //=> "********"
 *
 * mask("Password", { maskWith: "." }) //=> "........"
 *
 * mask("Password", { maskWith: "@", style: "trailing", maskLength: 4 }) //=> "Pass@@@@"
 *
 * mask("Password", { maskWith: "@", style: "leading", maskLength: 4 }) //=> "@@@@word"
 *
 * mask("Password", { style: "middle", maskLength: 4 }) //=> "Pa****rd"
 *
 * const secretPhrase = "This is a secret phrase."
 *
 * mask(secretPhrase) //=> "************************"
 *
 * mask(secretPhrase, { ignore: [" "] }) //=> "**** ** * ****** *******"
 * ```
 **/
export function mask(
  str: string,
  config: {
    maskWith?: string
    style?: "leading" | "trailing" | "middle"
    maskLength?: number
    ignore?: string[]
  } = {
    maskWith: "*",
    style: "trailing",
    maskLength: str.length,
    ignore: [],
  }
) {
  if (config?.style !== "middle" || !config?.style) {
    const _str =
      config.style === "leading" ? str : str.split("").reverse().join("")

    let maskedCount = 0
    const masked = _str.split("").reduce((acc, char) => {
      if (config?.ignore && config.ignore.includes(char)) {
        return acc + char
      } else if (
        !config?.maskLength ||
        (config.maskLength && maskedCount < config.maskLength)
      ) {
        maskedCount++
        return acc + (config?.maskWith || "*")
      } else return acc + char
    }, "")
    return config?.style === "leading"
      ? masked
      : masked.split("").reverse().join("")
  } else {
    const length1 =
      (str.length - (config.maskLength || str.length)) % 2 === 0
        ? (str.length - (config.maskLength || str.length)) / 2
        : Math.floor((str.length - (config.maskLength || str.length)) / 2)
    let maskedCount = 0
    return str.split("").reduce((acc, char, i) => {
      const shouldIgnoreCharacter =
        !!config?.ignore && config.ignore.includes(char)
      if (shouldIgnoreCharacter) return acc + char
      else if (i + 1 <= length1) return acc + char
      else if (config?.maskLength && maskedCount < config?.maskLength) {
        maskedCount++
        return acc + (config?.maskWith || "*")
      } else return acc + char
    }, "")
  }
}

/** Adds a number of a specific character to a string to achieve a minimum length.
 *
 * Example:
 * ```typescript
 * pad("Hello", 10, ".") //=> "Hello....."
 *
 * pad("Hello", 10, ".", "leading") //=> ".....Hello"
 * ```
 */
export function pad(
  str: string,
  length: number,
  char: string,
  style: "leading" | "trailing"
) {
  if (str.length >= length) return str

  const filler = char.repeat(length - str.length)
  return style === "leading" ? filler + str : str + filler
}

/** Returns an escaped string that can be inserted into HTML
 *
 * Example:
 * ```typescript
 * escapeString("Hello <there>, my 'friend'") //=> "Hello &lt;there&gt;, my &#x27;friend&#x27;"
 * ```
 */
export function escapeString(str: string) {
  let result: string
  result = str.replace(/&/g, "&amp;")
  result = result.replace(/</g, "&lt;")
  result = result.replace(/>/g, "&gt;")
  result = result.replace(/"/g, "&quot;")
  result = result.replace(/'/g, "&#x27;")
  result = result.replace(/`/g, "&#x60;")
  return result
}

/** Takes an escaped string and returns an unescaped string
 *
 * Example:
 * ```typescript
 * unEscapeString(""Hello &lt;there&gt;, my &#x27;friend&#x27;"") //=> "Hello <there>, my 'friend'"
 * ```
 */
export function unEscapeString(str: string) {
  let result: string
  result = str.replace(/&amp;/g, "&")
  result = result.replace(/&lt;/g, "<")
  result = result.replace(/&gt;/g, ">")
  result = result.replace(/&quot;/g, '"')
  result = result.replace(/&#x27;/g, "'")
  result = result.replace(/&#x60;/g, "`")
  return result
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
  const chars =
    (includeLetters
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      : "") + (includeNumbers ? "0123456789" : "")
  let randomString = ""
  for (let i = 1; i <= length; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)]
  }
  return randomString
}

/**
 * Returns a string with the first letter capitalized. Optionally pass in boolean to convert following characters to lower case.
 *
 * Example:
 * ```typescript
 * capitalize("stephen") //=> "Stephen"
 *
 * capitalize("hELLO", true) //=> "Hello"
 *
 * capitalize("hELLO", false) //=> "HELLO"
 * ```
 */
export function capitalize(str: string, lowercaseOthers = false) {
  return (
    str[0].toUpperCase() +
    (lowercaseOthers ? str.slice(1).toLowerCase() : str.slice(1))
  )
}

/**
 * Returns a string lowercased with non letter characters removed and spaces and underscores replaced with a separator (- by default)
 *
 * Example:
 * ```typescript
 * slugify("This is the blog post title!") //=> "this-is-the-blog-post-title"
 *
 * slugify("This is the blog post title!", "_") //=> "this_is_the_blog_post_title"
 * ```
 */
export function slugify(str: string, separator = "-") {
  const _str = str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^\w\-]+/g, separator)
    .replace(/\_/g, separator)
    .replace(/\-\-+/g, separator)
  return _str[_str.length - 1] === separator ? shave(_str, 1) : _str
}

/**
 * Returns a boolean of whether or not the input is directly convertible to a number.
 *
 * Example:
 * ```typescript
 * isNumericString(33) //=> true
 *
 * isNumericString("4.12") //=> true
 *
 * isNumericString("hello") //=> false
 * ```
 */
export function isNumeric(n: string | number) {
  return !isNaN(Number(n))
}

/**
 * Returns a string or array with a certain number of characters removed. By default elements are removed from the end. You can pass in
 * a negative number to remove them from the front.
 *
 * Example:
 *
 * ```typescript
 * shave("Hello", 2) //=> "Hel"
 *
 * shave("Hello", -2) //=> "llo"
 * ```
 */
export function shave(iterable: string | unknown[], n: number) {
  return n > 0 ? iterable.slice(0, iterable.length - n) : iterable.slice(n * -1)
}

/** Returns an array with the items randomly ordered.
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

/** Returns an array of every Nth item in an array
 *
 * Example:
 * ```typescript
 * everyNth([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) //=> [3, 6, 9]
 * ```
 **/
export function everyNth<T>(arr: T[], n: number) {
  return arr.reduce((acc: T[], item: T, index: number) => {
    if ((index + 1) % n === 0) return [...acc, item]
    else return acc
  }, [])
}

/** Returns the provided array with a minimum and/or maximum length limit enforced. If the minimum length
 is larger than the length of the array, the fill will be added to the array as many times as necessary
 to reach the minimum limit. If a fill is provided, it must match the type of the array provided. If no
 fill is provided, `undefined` will be added. For min and max limits, you can pass `false` or 0 for a
 limit parameter to bypass.
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

/** Divides an array into smaller arrays of a certain size. Returns an array of these smaller arrays.
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

type StringOrNumberArray = (string | number)[]

/** Returns an array of numbers (or strings of numbers) sorted. This is safer than the default sort() method because it converts
 strings of numbers to actual numbers and it compares each value for greater than less than, which helps
 when sorting negative numbers.
 *
 * Example:
 * ```typescript
 * [-1, -2, -3, -4].sort() //=> [-1, -2, -3, -4]
 *
 * safeSort([-1, -2, -3, -4]) //=> [-4, -3, -2, -1]
 *
 * ["45", "167", "23", "1000"].sort() //=> ["1000", "167", "23", "45"]
 *
 * safeSort(["45", "167", "23", "1000"]) //=> ["23", "45", "167", "1000"]
 * ```
 *
 */
export function safeSort(arr: StringOrNumberArray) {
  const isNumberish = (str: string | number) => !isNaN(Number(str))
  return [...arr].sort((a, b) => {
    if (isNumberish(a)) return Number(a) - Number(b)
    else return a < b ? -1 : 1
  })
}

/** Returns an array sorted (ascending) via bubble sort.
 **/
export function bubbleSort(arr: StringOrNumberArray) {
  let noSwaps
  const _arr = [...arr]
  for (var i = _arr.length; i > 0; i--) {
    noSwaps = true
    for (var j = 0; j < i - 1; j++) {
      if (_arr[j] > _arr[j + 1]) {
        const temp = _arr[j]
        _arr[j] = _arr[j + 1]
        _arr[j + 1] = temp
        noSwaps = false
      }
    }
    if (noSwaps) break
  }
  return _arr
}

/** Returns an array sorted (ascending) via selection sort.
 **/
export function selectionSort(arr: StringOrNumberArray) {
  const _arr = [...arr]
  const swap = (arr: unknown[], idx1: number, idx2: number) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]])

  for (let i = 0; i < _arr.length; i++) {
    let lowest = i
    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[lowest] > _arr[j]) {
        lowest = j
      }
    }
    if (i !== lowest) swap(_arr, i, lowest)
  }

  return _arr
}

/** Returns an array sorted (ascending) via insertion sort.
 **/
export function insertionSort(arr: StringOrNumberArray) {
  var currentVal
  const _arr = [...arr]
  for (var i = 1; i < _arr.length; i++) {
    currentVal = _arr[i]
    for (var j = i - 1; j >= 0 && _arr[j] > currentVal; j--) {
      _arr[j + 1] = _arr[j]
    }
    _arr[j + 1] = currentVal
  }
  return _arr
}

/** Returns an array with any duplicates removed.
 *
 * Example:
 * ```typescript
 * removeDuplicates([1, 2, 3, 3, 4, 4, 5]) //=> [1, 2, 3, 4, 5]
 * ```
 **/
export function removeDuplicates<T>(arr: T[]): T[] {
  if (typeof arr[0] === "object") {
    const strings = arr.map((obj) => JSON.stringify(obj))
    const uniques = new Set(strings)
    return Array.from(uniques).map((str) => JSON.parse(str))
  } else return Array.from(new Set(arr))
}

/** Returns an array of the rolling sum of an array of numbers.
 **/
export function getRollingSum(arr: number[], precision?: number) {
  return arr.reduce(
    (acc, i, index) =>
      index > 0
        ? [...acc, round(acc[acc.length - 1] + Number(i), precision ?? 1)]
        : [i],
    [] as number[]
  )
}

/** Returns an object with items from an array as keys and values of the number of
 instances of these values in the array.
 **/
export function getCounts<T>(arr: T[]): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  arr.forEach((item) => {
    if (result[item as string]) result[item as string]++
    else result[item as string] = 1
  })
  return result
}

/** Returns the number of instances the target occurs in an array.
 *
 * Example:
 * ```typescript
 const arr = [1, 2, 3, 3, 4, 4, 4, 5]
 getCount(arr, 4) //=> 3
 * ```
 **/
export function getCountOf<T>(arr: T[], target: T) {
  return getCounts(arr)[target as string] || 0
}

/** Returns an array of items that only appear in one of the given arrays.
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [3, 4, 5, 6]
 
 getUniqueItems(arr1, arr2) //=> [1, 2, 5, 6]
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

/** Returns an array of items that appear in at least two of the given arrays.
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [3, 4, 5, 6]
 const arr3 = [4, 5, 6, 7]
 
 getCommonItems(arr1, arr2, arr3) //=> [3, 4, 5, 6]
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

/** Returns an array of items that appear in all of the given arrays.
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [3, 4, 5, 6]
 const arr3 = [4, 5, 6, 7]
 
 getSharedItems(arr1, arr2, arr3) //=> [4]
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

/** Returns a boolean of whether or not two arrays or two objects have the same items or key value pairs respectively. You can 
 optionally pass in a boolean to require that the order of the items matches for arrays (default: false) and a boolean to 
 apply case sensitivity (default: false).
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [4, 3, 2, 1]
 
 isEqual(arr1, arr2) //=> true

 isEqual(arr1, arr2, true) //=> false
 * 
 * const obj1 = { a: 1, b: 2, c: 3 }
 * const obj2 = { c: 3, b: 2, a: 1 }

 *
 * isEqual(ob1, obj2) //=> true
 * 
 * isEqual(ob1, obj2, false) //=> false
 * ```
 * 
 * NOTE: `orderMatters` is false by default.
 **/

/** Returns the provided array with two items' positions swapped
 *
 * Example:
 * ```typescript
 * swapItems([0, 1, 2, 3, 4], 1, 3) //=> [0, 3, 2, 1, 4]
 * ```
 */

export function swapItems<T>(arr: T[], index1: number, index2: number) {
  return arr.map((item, i) => {
    if (i === index1) return arr[index2]
    if (i === index2) return arr[index1]
    return item
  })
}

export function isEqual(
  thing1: object | [],
  thing2: object | [],
  orderMatters = false,
  isCaseSensitive = false
) {
  if (orderMatters && Array.isArray(thing1) && Array.isArray(thing2)) {
    if (isCaseSensitive) {
      return JSON.stringify(thing1) === JSON.stringify(thing2)
    } else {
      return (
        JSON.stringify(thing1).toLowerCase() ===
        JSON.stringify(thing2).toLowerCase()
      )
    }
  } else if (Array.isArray(thing1) && Array.isArray(thing2)) {
    const _thing1 = [...(thing1 as [])].sort()
    const _thing2 = [...(thing2 as [])].sort()
    for (let i = 0; i < thing1.length; i++) {
      const thing1value = isCaseSensitive
        ? _thing1[i]
        : String(_thing1[i]).toLowerCase()
      const thing2value = isCaseSensitive
        ? _thing2[i]
        : String(_thing2[i]).toLowerCase()
      if (thing1value !== thing2value) return false
    }
    return true
  } else if (typeof thing1 === "object" && typeof thing2 === "object") {
    let isObjectsMatchUnordered = true
    Object.keys(thing1).forEach((key) => {
      if (
        (isCaseSensitive &&
          thing1[key as keyof typeof thing1] !==
            thing2[key as keyof typeof thing2]) ||
        (!isCaseSensitive &&
          String(thing1[key as keyof typeof thing1]).toLowerCase() !==
            String(thing2[key as keyof typeof thing2]).toLowerCase())
      ) {
        isObjectsMatchUnordered = false
      }
    })
    return isObjectsMatchUnordered
  } else return false
}

/** Returns a boolean indicating whether or not the array includes the object
 *
 * Example:
 * ```typescript
 * const arrayItems = [
 *       { x: 1, y: 1 },
 *       { x: 2, y: 2 },
 *       { x: 3, y: 3 },
 *     ]
 *
 * isArrayIncludesObject(arrayItems, { x: 2, y: 2 })) //=> true
 * isArrayIncludesObject(arrayItems, { x: 1, y: 2 })) //=> false
 * ```
 *
 **/
export function isObjectInArray(obj: Object, arr: Object[]) {
  return JSON.stringify(arr).includes(JSON.stringify(obj))
}

/** Returns an object with specific keys removed.
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

/** Returns an object with only the specific keys included.
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

/** Returns a single object with all of the key value pairs from two or more objects.
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
export function combineObjects(...objs: object[]): object {
  const result: { [key: string]: any } = {}
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      result[key] = obj[key as keyof object]
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

/** Return an array of objects sorted by a specific shared key's value. Optionally pass in "desc" as a
 * third parameter to sort in descending order.
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
 *
 * sortByKeyValue([obj1, obj2, obj3], "a", "desc")
 * //=>
 *     [
 *       { a: 3, b: 2 },
 *       { a: 2, b: 2 },
 *       { a: 1, b: 2 },
 *     ]
 * ```
 **/
export function sortByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  order: "asc" | "desc" = "asc"
) {
  const isAscending = order === "asc"
  return [...arr].sort((a, b) =>
    a[key] < b[key] ? (isAscending ? -1 : 1) : isAscending ? 1 : -1
  )
}

/** Returns an array of objects with nested sorting based on a set of specific shared keys. Optionally
 * pass in a third parameter which is an array of "asc" or "desc" values to specify the order
 * of sorting for each key. The default is all ascending.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 1, b: 6, c: 3 }
 * const obj2 = { a: 3, b: 2, c: 4 }
 * const obj3 = { a: 3, b: 2, c: 3 }
 * const obj4 = { a: 2, b: 4, c: 3 }
 * const obj5 = { a: 2, b: 5, c: 3 }
 *
 * sortByKeyValues([obj1, obj2, obj3, obj4, obj5], ["a", "b", "c"])
 * //=>
 *      [
 *       { a: 1, b: 6, c: 3 }
 *       { a: 2, b: 4, c: 3 }
 *       { a: 2, b: 5, c: 3 }
 *       { a: 3, b: 2, c: 3 }
 *       { a: 3, b: 2, c: 4 }
 *      ]
 * sortByKeyValues([obj1, obj2, obj3, obj4, obj5], ["a", "b", "c"], ["asc", "desc", "asc"])
 * //=>
 *      [
 *       { a: 1, b: 6, c: 3 }
 *       { a: 2, b: 5, c: 3 }
 *       { a: 2, b: 4, c: 3 }
 *       { a: 3, b: 2, c: 3 }
 *       { a: 3, b: 2, c: 4 }
 *      ]
 * ```
 **/
export function sortByKeyValues<T extends object, U extends keyof T>(
  objs: T[],
  keys: U[],
  order?: ("asc" | "desc")[]
): T[] {
  if (keys.length === 1)
    return sortByKeyValue(objs, keys[0], order ? order[0] : undefined)

  const groupedByKey = groupByKeyValue(objs, keys[0])
  const sortedKeyValues = Object.keys(groupedByKey).sort()

  if (order && order[0] === "desc") sortedKeyValues.reverse()

  return sortedKeyValues.reduce(
    (acc: T[], keyVal) => [
      ...acc,
      ...sortByKeyValues(groupedByKey[keyVal], keys.slice(1), order?.slice(1)),
    ],
    []
  )
}

/** Returns an object with counts of specific values of a shared key in an array of objects.
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
  isCaseSensitive = false
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

/** Returns an object with keys corresponding to the values of a shared key. The values are arrays of objects
 *  that share the same value of that key. You can optionally pass in a boolean to apply case sensitivity. (false by default)
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
 *        Sarah: [{ name: "Sarah", age: 32 }]
 *        Beth: [{name: "Beth", age: 23 }]
 *      }
 * ```
 **/
export function groupByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive = false
) {
  const result: { [key: string]: T[] } = {}
  arr.forEach((obj: T) => {
    const keyValue = isCaseSensitive
      ? String(obj[key])
      : String(obj[key]).toLowerCase()
    if (result[keyValue]) {
      result[keyValue].push(obj)
    } else {
      result[keyValue] = [obj]
    }
  })
  return result
}

/**
 * Returns an array of objects where a value of a specific key can only occur once. The first instance of the key/value pair
 * is preserved and subsequent instances are removed. You can optionally pass in a boolean to make detection case sensitive.
 *
 * Example:
 * ```typescript
 * const members = [
    { id: 1, name: "Stephen" },
    { id: 2, name: "Andrea" },
    { id: 1, name: "Monica" },
    { id: 4, name: "Dylan" },
]
 *
 * removeDuplicatesByKeyValue(members, "id")
 * //=>
 * [{ id: 1, name: "Stephen" },
    { id: 2, name: "Andrea" },
    { id: 4, name: "Dylan" },
]
 * ```
 */
export function removeDuplicatesByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive = false
) {
  const groupedByKey = groupByKeyValue(arr, key, isCaseSensitive)
  return Object.keys(groupedByKey).reduce((acc, _key) => {
    return [...acc, groupedByKey[_key][0]]
  }, [] as T[])
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

/** Returns a deep copy of an object.
 *
 * Example:
 * ```typescript
 * deepCopy({ a: 1, b: { c: 2 }, d: 3 }) //=> { a: 1, b: { c: 2 }, d: 3 }
 * ```
 */
export function deepCopy<T extends object>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/** Returns an object with the keys and values reversed.
 *
 * NOTE: Values must be able to be converted to strings.
 *
 * Example:
 * ```typescript
 * invert({ a: 1, b: 2, c: 3 }) //=> { "1": a, "2": b, "3": c}
 * ```
 */
export function invert<T extends object>(obj: T): { [key: string]: string } {
  const result: { [key: string]: string } = {}
  const keys = Object.keys(obj)
  const values = Object.values(obj)
  values.forEach((value, i) => {
    result[String(value)] = keys[i]
  })
  return result
}

/** Returns the key with highest numerical value. Returns an array of keys if two or more keys have the same numerical value.
 *
 *
 * Example:
 * ```typescript
 * getKeyWithLargestValue({ a: 1, b: 2, c: 3 }) //=> "c"
 *
 * getKeyWithLargestValue({ a: 1, b: 3, c: 3 }) //=> ["b", "c"]
 * ```
 */
export function getKeyWithLargestValue<T extends object>(obj: T) {
  type KeyValueResult = {
    key: string
    value: number
  }
  let result: KeyValueResult[] = []
  for (let key in obj) {
    const value = Number(obj[key])
    const highestValue = result.length > 0 ? result[0].value : 0

    if (value > highestValue) {
      result = [{ key, value }]
    } else if (value === highestValue) {
      result.push({ key, value })
    }
  }
  if (result.length > 1) {
    return result.map(({ key }) => key)
  } else return result[0].key
}

/**
 * Runs a callback function on array of items and returns a single object with keys that match the return values.
 * Each key's value is an array of items that provide the same result when having the callback function run on them.
 *
 * Example:
 * ```typescript
 * const ages = [{ age: 28 }, { age: 14 }, { age: 67 }, { age: 17 }, ]
 *
 * const canDrinkAlcohol = (obj:{ age: number }) => obj.age >= 21
 *
 * groupByCallbackResult(ages, canDrinkAlcohol)
 * //=>
 *      {
 *        "true": [{ age: 28 }, { age: 67 }]
 *        "false": [{ age: 14 }, { age: 17 }]
 *      }
 * ```
 */
export function groupByCallbackResult(things: any[], func: Function) {
  const result: { [key: string]: any[] } = {}
  things.forEach((thing) => {
    const funcResult = String(func(thing))
    if (result[funcResult]) result[funcResult].push(thing)
    else result[funcResult] = [thing]
  })
  return result
}

export function getCallbackResultCounts(things: any[], func: Function) {
  const result: { [key: string]: number } = {}
  const groupedByResult = groupByCallbackResult(things, func)

  Object.keys(groupedByResult).forEach((key) => {
    result[key] = groupedByResult[key].length
  })

  return result
}

/**
 * Runs a callback function on array of items and returns an array of items that are sorted by the return value of running
 * the callback function on the item.
 *
 * Example:
 * ```typescript
 const socialStats = [
  { follows: 1, likes: 2 },
  { follows: 5, likes: 1 },
  { follows: 2, likes: 0 },
  { follows: 4, likes: 3 },
]

// Adds the follows and likes to get a total popularity score
const getPopularity = (obj: { follows: number; likes: number }) =>
  obj.follows + obj.likes

sortByCallbackResult(socialStats, getPopularity)
//=>
* [
    { follows: 2, likes: 0 },
    { follows: 1, likes: 2 },
    { follows: 5, likes: 1 },
    { follows: 4, likes: 3 },
]
 * ```
 */

export function sortByCallbackResult<T>(things: T[], func: Function) {
  const groupedByResult = groupByCallbackResult(things, func)
  return safeSort(Object.keys(groupedByResult)).reduce(
    (acc, key) => [...acc, ...groupedByResult[key]],
    [] as T[]
  )
}

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

/** Takes a promise and wraps it in another promise that rejects if the original promise takes longer to resolve than a
 * specific amount of time in milliseconds. If the original promise resolves before the timeout, that value is returned.
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

/** Delays future code from executing until a specific number of milliseconds has passed.
 **/
export function pauseSync(milliseconds: number) {
  const start = Date.now()
  const end = start + milliseconds
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

/** Returns a debounced version of the function passed. Accepts custom delay in
 * milliseconds and immediate boolean for leading/trailing.
 *
 * * If `immediate` is `true`, the function will execute immediately on the first call. The function
 * will not execute if called again until the provided number of milliseconds have passed.
 * * If `immediate` is `false`, the function when called will not execute until the provided number of milliseconds have passed.
 *  If the function is called again before the time has passed, the timer starts over.
 **/
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  milliseconds: number,
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
        wait = setTimeout(() => (isWaiting = false), milliseconds)

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
      }, milliseconds)

      return getReturnObject(args)
    }
  }
}

/** Returns a throttled version of a function. The throttled version can only execute once every N milliseconds,
 * where N is the delay passed in to the throttle function.
 *
 * An optional third parameter indicates whether subsequent calls of the function before the
 * delay period has passed should be enqueued and run once the delay passes (true)
 * or simply ignored (false). The default is true.
 *
 **/
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  enqueueEarlyCalls = true
): T {
  const { enqueue, executeAll, queue } = createAsyncQueue(func, delay)
  let isWaiting = false
  return ((...args: Parameters<T>) => {
    if (isWaiting) {
      if (enqueueEarlyCalls) enqueue(...args)
      else return
    } else {
      isWaiting = true
      setTimeout(() => {
        isWaiting = false
      }, delay)

      enqueue(...args)
      if (queue.length > 1) return
      else executeAll()
    }
  }) as T
}

/** Returns a memoized version of a function.
 *
 * _Memoization is the process of caching a function's result so that if the function is called
 * with same parameters, the result can be retrieved from cache, rather than
 * executing the function again._
 */
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

type Falsy = null | undefined | false

export function partial<T extends (...args: any[]) => any>(
  func: T,
  ...args: (Parameters<typeof func>[number] | Falsy)[]
) {
  const newArgsToCall: (Parameters<typeof func>[number] | Falsy)[] = []
  let lastNewArgUsed = -1

  return (...newArgs: (Parameters<typeof func>[number] | Falsy)[]) => {
    args.forEach((arg) => {
      if (!!arg && arg !== 0) newArgsToCall.push(arg)
      else {
        lastNewArgUsed++
        newArgsToCall.push(newArgs[lastNewArgUsed])
      }
    })
    return func(...newArgsToCall, ...newArgs.slice(lastNewArgUsed))
  }
}

/** Prompts a user in their browser to save some specific text to a file on their machine.
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

type AsyncQueueObject<T extends (...args: any[]) => Promise<unknown>> = {
  queue: unknown[]
  enqueue: (...args: Parameters<T>) => void
  executeOne: Function
  executeAll: (ignoreErrors?: boolean) => unknown
  breakOut: Function
}

/** Returns an `AsyncQueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
export function createAsyncQueue<
  T extends (...args: any[]) => Promise<unknown>
>(functionToExecute: T, delay?: number): AsyncQueueObject<T> {
  const queue: unknown[][] = []
  let isBreakRequested = false
  const executeOne = async () => {
    await functionToExecute(...queue[0])
    queue.shift()
  }
  const executeAll = async (ignoreErrors = false) => {
    if (isBreakRequested) return
    try {
      await functionToExecute(...queue[0])
      queue.shift()
      if (delay) await pauseAsync(delay)
      if (queue.length > 0) executeAll(ignoreErrors)
    } catch {
      if (ignoreErrors) {
        queue.shift()
        if (delay) await pauseAsync(delay)
        if (queue.length > 0) executeAll(true)
      }
    }
  }
  return {
    breakOut: () => {
      isBreakRequested = true
    },
    queue,
    enqueue: (...args: Parameters<T>) => queue.push(args),
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

/** A function that does nothing and returns nothing. Useful for linters that require a callback. */
export function noOp() {}

const hexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
]

/**
 * Returns a hexadecimal code of an RGB value
 *
 * Example:
 * ```typescript
 * rgbToHex(255, 0, 0) //=> #FF0000
 *
 * rgbToHex(189, 23, 123) //=> #BD177B
 * ```
 */
export function rgbToHex(red: number, green: number, blue: number): string {
  const getHex = (n: number) => {
    const firstValue = hexValues[Math.floor(n / 16)]
    const secondValue = hexValues[n % 16]
    return `${firstValue}${secondValue}`
  }
  return `#${getHex(red)}${getHex(green)}${getHex(blue)}`
}

/**
 * Returns an RGB value of a hexadecimal code
 *
 * Example:
 * ```typescript
 * hexToRgb("#FF0000") //=> [255, 0, 0]
 *
 * ```
 */
export function hexToRgb(hex: string): [number, number, number] {
  const _hex = hex[0] === "#" ? hex.slice(1) : hex
  const redHex = _hex.substring(0, 2)
  const greenHex = _hex.substring(2, 4)
  const blueHex = _hex.substring(4, 6)

  const getNumberForHexCharacter = (hexCharacter: string) =>
    hexValues.findIndex((x) => x === hexCharacter.toUpperCase())

  const getNumberForHexString = (hexString: string) =>
    getNumberForHexCharacter(hexString[0]) * 16 +
    getNumberForHexCharacter(hexString[1])

  return [
    getNumberForHexString(redHex),
    getNumberForHexString(greenHex),
    getNumberForHexString(blueHex),
  ]
}

/**
 * Returns a lorem ipsum paragraph. Optionally pass in a word count.
 *
 * Example:
 * ```typescript
 * loremIpsum(5) //=> "Lorem ipsum dolor sit amet,"
 *
 * ```
 */
export function loremIpsum(wordCount?: number) {
  const li =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  if (wordCount) {
    const words = li.split(" ")
    return words.slice(0, wordCount).join(" ")
  } else return li
}
