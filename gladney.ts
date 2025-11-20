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
  const multiplier = 1 / precision
  const rounded = Math.round(n * multiplier) / multiplier

  const precisionDigits = -Math.floor(Math.log10(precision))
  return Number(rounded.toFixed(clampNumber(precisionDigits, 0, 100)))
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
  return Math.floor(Math.random() * (max - min + 1)) + min
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
  if (min !== false) result = n > min ? n : min
  if (max !== false && max !== undefined) result = result < max ? result : max
  return result
}

/** Returns an array of numbers, starting from and ending at provided numbers.
 * You can optionally pass in a step number to increment by a number other than 1. You can also increment negatively.
 *
 * _Example:_
 * ```typescript
 * range(5, 10)
 * //=> [5, 6, 7, 8, 9, 10]
 *
 * range(0, 10, 2)
 * //=> [0, 2, 4, 6, 8, 10]
 *
 * range(10, 0, -2)
 * //=> [10, 8, 6, 4, 2, 0]
 * ```
 **/
export function range(start: number, end: number, step = 1) {
  const result: number[] = []
  if (start < end) {
    if (step <= 0) return result
    for (let i = start; i <= end; i += step) {
      result.push(i)
    }
  } else {
    if (step === 1) step = -1
    else if (step >= 0) return result
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
  const sorted = safeSort(flatten(numbers) as number[])
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
x * mode(1, 2, 3, 4, 5) //=> null
 *
 * mode([1, 2, 2, 3, 4, 5]) //=> 2
 *
 * mode(1, 2, 2, 3, 4, 4, 5) //=> [2, 4]
 * ```
 **/
export function mode(...numbers: (number | number[])[]) {
  const flattened = flatten(numbers)
  const nCounts = counts(flattened)
  const mostCommon = keyWithLargestValue(nCounts)
  if (Array.isArray(mostCommon)) {
    if (mostCommon.length === flattened.length) return null
    else return mostCommon.map((key) => Number(key))
  } else return Number(mostCommon)
}

/**
 * Returns the digits of a number as an array
 *
 * Example:
 * ```typescript
 * digits(39482) //=> [3, 9, 4, 8, 2]
 * ```
 */
export function digits(n: number) {
  return n
    .toString()
    .split("")
    .map((s) => Number(s))
}

const secondsInAMinute = 60
const secondsInAnHour = 3600
const secondsInADay = 86400

/** Returns a `Duration` with calculated days, hours, minutes and seconds from an amount of seconds.
 *
 * _Example:_
 * ```typescript
 * durationFromMilliseconds(200000000)
//=> { days: 2, hours: 7, minutes: 33, seconds: 20 }
 * ```
 **/
function durationFromMilliseconds(milliseconds: number): Duration {
  const seconds = Math.floor(milliseconds / 1000)

  return duration({
    days: Math.floor(seconds / secondsInADay),
    hours: Math.floor((seconds % secondsInADay) / secondsInAnHour),
    minutes: Math.floor((seconds % secondsInAnHour) / secondsInAMinute),
    seconds: seconds % secondsInAMinute,
  })
}

/** Returns the number of milliseconds from an amount of time
 *
 * Example:
 *
 * ```typescript
 * const amountOfTime = {days: 1, hours: 3, minutes: 24, seconds: 11}
 *
 * getMillisecondsFromDuration(amountOfTime) //=> 98651000
 * ```
 */
function getMillisecondsFromDuration(duration: Partial<Duration>) {
  let result = 0
  if (duration.days) result += duration.days * secondsInADay * 1000
  if (duration.hours) result += duration.hours * secondsInAnHour * 1000
  if (duration.minutes) result += duration.minutes * secondsInAMinute * 1000
  if (duration.seconds) result += duration.seconds * 1000
  return result
}

/** Returns a date in the future or past based on a duration from a specific date
 *
 * Example:
 *
 * ```typescript
 * const fromDate = new Date("Jan 1, 2024 12:00:00AM")
 * //=> Date: "2024-01-01T05:00:00.000Z"
 *
 * dateFromDuration({days: 1: hours: 2, minutes: 3, seconds: 4}, fromDate)
 * //=> Date: "2024-01-02T07:03:04.000Z"
 *
 * dateFromDuration({days: -1: hours: -2, minutes: -3, seconds: -4}, fromDate)
 * //=> Date: "2023-12-31T02:56:56.000Z"
 * ```
 */
export function dateFromDuration(
  duration: Partial<Duration>,
  startDate: Date = new Date()
) {
  return new Date(startDate.getTime() + getMillisecondsFromDuration(duration))
}

/** Returns a date in the past based on a duration from now
 *
 * Example:
 *
 * ```typescript
 * // Jan 1, 2024 12:00:00AM
 * ago({days: 1: hours: 2, minutes: 3, seconds: 4})
 *
 * //=> Date: "2023-12-31T02:56:56.000Z"
 * ```
 */
export function ago(duration: Partial<Duration>) {
  const negativeDuration = objectInto(
    omitKeys(duration, "isGreaterThan", "isLessThan"),
    (key, val) => ({
      [key]: val! * -1,
    })
  )
  return dateFromDuration(negativeDuration)
}

/** Returns a date in the future based on a duration from now
 *
 * Example:
 *
 * ```typescript
 * // Jan 1, 2024 12:00:00AM
 * ago({days: 1: hours: 2, minutes: 3, seconds: 4})
 *
 * //=> Date: "2024-01-02T07:03:04.000Z"
 * ```
 */
export function fromNow(duration: Partial<Duration>) {
  return dateFromDuration(duration)
}

/** Returns a `Duration` with the number of years, months, weeks, days, hours, minutes and seconds until 
 * a specific date. A `Duration` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
 * ```typescript
interface Duration {
  days: number
  hours: number
  minutes: number
  seconds: number
}
 * ```
 **/

export function timeUntil(date: Date): Duration {
  return durationFromDates(new Date(), new Date(date))
}

/** Returns a `Duration` with the number of years, months, weeks, days, hours, minutes and seconds since a
 * specific date. A `Duration` also includes methods to measure the amount of time in a specific unit (i.e. minutes)
 * ```typescript
interface Duration {
  days: number
  hours: number
  minutes: number
  seconds: number
}
 * ```
 **/
export function timeSince(date: Date): Duration {
  return durationFromDates(new Date(), new Date(date))
}

/** Returns the corresponding human readable day name of an integer (0-6).
 *
 * Example:
 * ```typescript
 * dayName(3) //=> "Wednesday"
 * ```
 **/
export function dayName(day: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  const dayNames: DayName[] = [
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

/** Returns a Duration representing the amount of time between two dates. Accepts Dates or date strings.
 *
 * Example:
 *
 * ```typescript
 * const fiveMinutesAgo = new Date(Date.now() - 60 * 1000 * 5)
 *
 * duration(new Date(), fiveMinutesAgo) //=>
 *  {
 *    days: 0,
 *    hours: 0,
 *    minutes: 5,
 *    seconds: 0
 *  }
 * ```
 */
export function durationFromDates(dateA: Date | string, dateB: Date | string) {
  const dateASerialized = typeof dateA === "string" ? new Date(dateA) : dateA
  const dateBSerialized = typeof dateB === "string" ? new Date(dateB) : dateB

  const diff = Math.abs(dateASerialized.getTime() - dateBSerialized.getTime())
  return durationFromMilliseconds(diff)
}

export function duration({
  seconds,
  minutes,
  hours,
  days,
}: {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}) {
  const resultingDuration: Duration = {
    seconds: seconds ?? 0,
    minutes: minutes ?? 0,
    hours: hours ?? 0,
    days: days ?? 0,
    isGreaterThan: (d: Duration) => false,
    isLessThan: (d: Duration) => false,
  }

  return {
    ...resultingDuration,
    isGreaterThan: (otherDuration: Duration) =>
      convertDuration(resultingDuration, "seconds") >
      convertDuration(otherDuration, "seconds"),
    isLessThan: (otherDuration: Duration) =>
      convertDuration(resultingDuration, "seconds") <
      convertDuration(otherDuration, "seconds"),
  } as Duration
}

export function convertDuration(
  d: Duration,
  to: "milliseconds" | "seconds" | "minutes" | "hours" | "days",
  precision?: number
) {
  const ms = getMillisecondsFromDuration(d)
  const seconds = ms / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24

  switch (to) {
    case "milliseconds":
      return precision ? round(ms, precision) : ms
    case "seconds":
      return precision ? round(seconds, precision) : seconds
    case "minutes":
      return precision ? round(minutes, precision) : minutes
    case "hours":
      return precision ? round(hours, precision) : hours
    case "days":
      return precision ? round(days, precision) : days
  }
}

/** Returns the relative time difference of two dates
 *
 * Example:
 *
 * ```typescript
 * const fiveMinutesAgo = new Date(Date.now() - 60 * 1000 * 5)
 *
 * relativeTimeDiff(fiveMinutesAgo) //=> "5 minutes ago"
 * ```
 */
export function relativeTimeDiff(to: Date, from: Date = new Date()) {
  const TIME_UNITS: { n: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { n: 60, unit: "seconds" },
    { n: 60, unit: "minutes" },
    { n: 24, unit: "hours" },
    { n: 7, unit: "days" },
    { n: 4.34524, unit: "weeks" },
    { n: 12, unit: "months" },
    { n: Number.POSITIVE_INFINITY, unit: "years" },
  ]

  let duration = (to.getTime() - from.getTime()) / 1000

  for (let i = 0; i < TIME_UNITS.length; i++) {
    const currentUnit = TIME_UNITS[i]
    if (Math.abs(duration) < currentUnit.n) {
      return new Intl.RelativeTimeFormat(undefined, {
        numeric: "auto",
      }).format(Math.round(duration), currentUnit.unit)
    }
    duration /= currentUnit.n
  }
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

/** Removes specific substring(s) from a larger string
 *
 * Example:
 * ```typescript
 * strip("hello1234", { numbers: true }) //=> "hello"
 * strip("hello1234", { letters: true }) //=> "1234"
 * strip("hello, newman!", { punctuation: true }) //=> "hello newman"
 * strip("hello@#$%^", { specialChars: true }) //=> "hello"
 * strip("hello newman", { spaces: true }) //=> "hellonewman"
 * strip("hello newman", { terms: ["new", "man"] }) //=> "hello "
 * ```
 *
 */
export function strip(
  body: string,
  config: {
    numbers?: boolean
    letters?: boolean
    punctuation?: boolean
    specialChars?: boolean
    spaces?: boolean
    text?: string[]
  }
): string {
  let newBody = body

  if (config.numbers) newBody = newBody.replace(/\d/g, "")
  if (config.letters) newBody = newBody.replace(/[a-zA-Z]+/g, "")
  if (config.punctuation) newBody = newBody.replace(/\'\"\:\;\,\.\?\!/g, "")
  if (config.spaces) newBody = newBody.replace(/\s/g, "")
  if (config.specialChars)
    newBody = newBody.replace(/\!\@\#\$\%\^\&\*\(\)\{\}\[\]\\\//g, "")

  if (config.text) {
    for (const text of config.text) {
      newBody = newBody.replace(text, "")
    }
  }

  return newBody
}

/** Returns a singular or pluralized string based on a provided number.
 *  Pluralized version defaults to the letter S appended to the singular form.
 *
 * Example:
 * ```typescript
 * plural(4, "apple") //=> "apples"
 *
 * plural(1, "orange") //=> "orange"
 *
 * const personCount = 2
 *
 * const personPhrase = plural(personCount, "person is", "people are")
 *
 * `${personCount} ${personPhrase} here.` //=> "2 people are here."
 * ```
 */
export function plural(n: number, singular: string, plural?: string) {
  const sOrPlural = plural || singular + "s"

  return n === 1 ? singular : sOrPlural
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
  style: "leading" | "trailing" = "trailing"
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
 * NOTE: `includeLetters` and `includeNumbers` both default to true. `includeSpecialChars` defaults to false.
 * 
 * Example:
 * ```typescript
 randomString(10) //=> "N3xO1pDs2f"

randomString(5, true, false) //=> "GjOxa"

randomString(5, false, true) //=> "39281"

randomString(5, true, true, true) //=> "G2a$k!"
 * ```
 **/
export function randomString(
  length: number,
  includeLetters = true,
  includeNumbers = true,
  includeSpecialChars = false
): string {
  const chars =
    (includeLetters
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      : "") +
    (includeNumbers ? "0123456789" : "") +
    (includeSpecialChars ? "!@#$%^&*()" : "")
  let randomString = ""
  for (let i = 1; i <= length; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)]
  }
  return randomString
}

/**
 * Returns a string with the first letter of each word capitalized. Optionally pass in
 * a boolean to convert following characters to lower case.
 *
 * Example:
 * ```typescript
 * capitalize("stephen") //=> "Stephen"
 *
 * capitalize("hello world") //=> "Hello World"
 *
 * capitalize("hELLO", true) //=> "Hello"
 *
 * capitalize("hELLO", false) //=> "HELLO"
 * ```
 */
export function capitalize(str: string, lowercaseOthers = false) {
  const capitalizeWord = (str: string) =>
    str[0].toUpperCase() +
    (lowercaseOthers ? str.slice(1).toLowerCase() : str.slice(1))

  return str
    .split(" ")
    .map((word) => capitalizeWord(word))
    .join(" ")
}

/**
 * Returns a boolean of whether or not the first string starts with a specific prefix or one of several prefixes
 *
 * Example:
 * ```typescript
 * startsWith("hello world", "hel") //=> true
 *
 * startsWith("hello world", ["sdf", "hel"]) //=> true
 * ```
 */

export function startsWith(str: string, suffix: string | string[]): boolean {
  if (Array.isArray(suffix)) {
    for (let i = 0; i < suffix.length; i++) {
      if (str.substring(0, suffix[i].length) === suffix[i]) {
        return true
      }
    }
    return false
  } else {
    return str.substring(0, suffix.length) === suffix
  }
}

/**
 * Returns a boolean of whether or not the first string ends with a specific suffix or one of several suffixes
 *
 * Example:
 * ```typescript
 * endsWith("hello world", "rld") //=> true
 *
 * endsWith("hello world", ["sdf", "rld"]) //=> true
 * ```
 */

export function endsWith(str: string, suffix: string | string[]): boolean {
  if (Array.isArray(suffix)) {
    for (let i = 0; i < suffix.length; i++) {
      if (str.substring(str.length - suffix[i].length) === suffix[i]) {
        return true
      }
    }
    return false
  } else {
    return str.substring(str.length - suffix.length) === suffix
  }
}

/**
 * Returns a boolean of whether not the first parameter (array or string) includes the second parameter, ignoring case.
 *
 * Example:
 * ```typescript
 * lazyIncludes("Hello world", "LL") //=> true
 *
 * lazyIncludes("Hello world", "ff") //=> false
 * ```
 */

export function lazyIncludes<T extends string | any[]>(
  a: T,
  b: T extends (infer U)[] ? U : string
) {
  let compareA = Array.isArray(a)
    ? a.map((x) => lowerCaseNoSpaces(x))
    : lowerCaseNoSpaces(a)

  return compareA.includes(lowerCaseNoSpaces(b))
}

/**
 * Returns a boolean of whether or not the first parameter is equal in value to the second. Accepts strings, objects or arrays.
 * Optionally pass in a third `Options` parameter to enforce loose matching on casing, spaces and order.
 *
 * Example:
 * ```typescript
 *
 * isEqual("Hello world", "helloworld", { ignoreCase: true, ingoreSpace: true })
 * //=> true
 *
 * isEqual([1, 2, 3], [3, 2, 1], { ignoreOrder: true })
 * //=> true
 *
 * isEqual({name: "John"}, {Name: "john"})
 * //=> true
 * ```
 */
export function isEqual<T extends string | any[] | Record<any, any>>(
  a: T,
  b: T extends (infer U)[]
    ? U[]
    : T extends string
    ? string
    : T extends Record<any, unknown>
    ? Record<any, unknown>
    : never,
  options: MatchOptions = defaultMatchOptions
): boolean {
  if (typeof a === "string" && typeof b === "string") {
    return withMatchOptions(a, options) === withMatchOptions(b, options)
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      JSON.stringify(withMatchOptions(a, options)) ===
      JSON.stringify(withMatchOptions(b, options))
    )
  }

  if (typeof a === "object" && typeof b === "object") {
    return (
      JSON.stringify(withMatchOptions(a, options)) ===
      JSON.stringify(withMatchOptions(b, options))
    )
  }

  if (typeof a === typeof b) {
    return a === b
  }

  return false
}

/**
 * Returns a string lowercased with non letter/number characters removed and spaces and underscores replaced with a separator (- by default)
 *
 * Example:
 * ```typescript
 * slugify("This is the 42nd blog post title!") //=> "this-is-the-42nd-blog-post-title"
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

export function shave<T extends string | U[], U = any>(
  iterable: T,
  n: number
): StringOrArray<T> {
  return (
    n > 0 ? iterable.slice(0, iterable.length - n) : iterable.slice(n * -1)
  ) as StringOrArray<T>
}

/** Returns an array with elements copied N times.
 *
 * Example:
 * ```typescript
 * multiplyArray([1, 2, 3], 3) //=> [1, 2, 3, 1, 2, 3, 1, 2, 3]
 * ```
 */
export function repeatArray<T>(arr: T[], n: number): T[] {
  return [].concat(...Array(n).fill(arr))
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
 * randomItem([1, 2, 3, 4, 5, 6]) //=> 3
 * ```
 **/
export function randomItem<T>(arr: T[], n: number) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

/** Returns random elements from an array
 *
 * Example:
 * ```typescript
 * randomItems([1, 2, 3, 4, 5, 6], 1) //=> [3]
 *
 * randomItems([1, 2, 3, 4, 5, 6], 3) //=> [2, 5, 1]
 * ```
 **/
export function randomItems<T>(arr: T[], n: number) {
  let remainingItems = Array.from(arr)
  const result = []
  for (let i = 1; i <= n; i++) {
    const randomIndex = Math.floor(Math.random() * remainingItems.length)
    result.push(remainingItems[randomIndex])
    remainingItems.splice(randomIndex, 1)
  }
  return result
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

/** Returns an array of unique values from the provided arrays
 *
 * Example:
 * ```typescript
 * union([1, 2, 3], [3, 4, 5], [5, 6, 7]) //=> [1, 2, 3, 4, 5, 6, 7]
 * ```
 */
export function union<T>(...arr: T[][]): T[] {
  const concatenated = arr.reduce((acc, i) => {
    return [...acc, ...i]
  }, [])

  const asStrings = concatenated.map((i) => JSON.stringify(i))

  return Array.from(new Set(asStrings)).map((i) => JSON.parse(i))
}

/** Returns an array of unique values from the provided arrays based on a callback result
 *
 * Example:
 * ```typescript
 * const arr1 = [1, 3]
 * const arr2 = [2, 4]
 *
 * unionBy([arr1, arr2], (n) => n % 2) //=> [1, 2]
 * ```
 */
export function unionBy<T, U extends Func>(arr: T[][], by: U): T[] {
  const concatenated = arr.reduce((acc, i) => {
    return [...acc, ...i]
  }, [])

  let asStrings = concatenated.map((i) => ({
    value: JSON.stringify(i),
    result: JSON.stringify(by(i)),
  }))

  const unique = uniqueBy(asStrings, (i) => JSON.parse(i.result))

  return unique.map((i) => JSON.parse(i.value))
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
export function chunk<T>(arr: T[], chunkSize: number) {
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
 * Example:
 * ```typescript
 * flatten([1, [2, 3, [4, 5]], 6])  //=> [1, 2, 3, 4, 5, 6]
 *
 * flatten([1, [2, 3, [4, 5]], 6], 1)  //=> [1, 2, 3, [4, 5], 6]
 * ```
 **/
export function flatten(arr: any[], levels = 0): unknown[] {
  function flattenWithAccumulator(
    arr: any[],
    levels = 0,
    currentLevel = 0
  ): any[] {
    return arr.reduce((acc, item) => {
      if (Array.isArray(item) && (!levels || currentLevel < levels)) {
        return [
          ...acc,
          ...flattenWithAccumulator(item, levels, currentLevel + 1),
        ]
      } else return [...acc, item]
    }, [])
  }
  return flattenWithAccumulator(arr, levels)
}

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
export function safeSort<T extends string[] | number[]>(arr: T) {
  return [...arr].sort((a, b) => {
    if (isNumeric(a)) return Number(a) - Number(b)
    else return a < b ? -1 : 1
  }) as StringOrNumberArray<T>
}

/** Returns an array sorted (ascending) via bubble sort.
 **/
export function bubbleSort<T extends string[] | number[]>(arr: T) {
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
  return _arr as StringOrNumberArray<T>
}

/** Returns an array sorted (ascending) via selection sort.
 **/

export function selectionSort<T extends string[] | number[]>(arr: T) {
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

  return _arr as StringOrNumberArray<T>
}

/** Returns an array sorted (ascending) via insertion sort.
 **/
export function insertionSort<T extends string[] | number[]>(arr: T) {
  var currentVal
  const _arr = [...arr]
  for (var i = 1; i < _arr.length; i++) {
    currentVal = _arr[i]
    for (var j = i - 1; j >= 0 && _arr[j] > currentVal; j--) {
      _arr[j + 1] = _arr[j]
    }
    _arr[j + 1] = currentVal
  }
  return _arr as StringOrNumberArray<T>
}

/** Returns an array with any duplicates removed.
 *
 * Example:
 * ```typescript
 * unique([1, 2, 3, 3, 4, 4, 5]) //=> [1, 2, 3, 4, 5]
 * ```
 **/
export function unique<T>(arr: T[]): T[] {
  if (typeof arr[0] === "object") {
    const strings = arr.map((obj) => JSON.stringify(obj))
    const uniques = new Set(strings)
    return Array.from(uniques).map((str) => JSON.parse(str))
  } else return Array.from(new Set(arr))
}

export function uniqueBy<T, U extends (arg: T) => any>(arr: T[], callback: U) {
  const seen: ReturnType<U>[] = []
  return arr.reduce((acc, i) => {
    const result = callback(i)
    if (!seen.includes(result)) {
      seen.push(result)
      return [...acc, i]
    } else {
      seen.push(result)
      return acc
    }
  }, [] as T[])
}

/** Returns an array of the rolling sum of an array of numbers.
 **/
export function rollingSum(arr: number[], precision?: number) {
  return arr.reduce(
    (acc: number[], i, index) =>
      index > 0
        ? [...acc, round(acc[acc.length - 1] + Number(i), precision ?? 1)]
        : [i],
    []
  )
}

/** Returns an object with items from an array as keys and values of the number of
 instances of these values in the array.
 *
 * Example:
 * ```typescript
 * getCounts(["a", "a", "b", "c", "c", "c"]) //=> {"a": 2, "b": 1, "c": 3}
 * ```
 **/
export function counts<T>(arr: T[]): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  arr.forEach((item) => {
    const itemAsString = String(item)
    if (result[itemAsString]) result[itemAsString]++
    else result[itemAsString] = 1
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
export function count<T>(arr: T[], target: T) {
  return counts(arr)[String(target)] || 0
}

/** Returns items that the first array contains but the second array does not.
 *
 * Example:
 *
 * ```typescript
 * difference([1, 2, 3, 4], [1, 2]) //=> [3, 4]
 * ```
 */
export function difference<T>(firstArray: T[], secondArray: T[]) {
  const firstArrayAsJSON = firstArray.map((item) => JSON.stringify(item))
  const secondArrayAsJSON = secondArray.map((item) => JSON.stringify(item))
  return firstArrayAsJSON
    .filter((item) => !secondArrayAsJSON.includes(item))
    .map((item) => JSON.parse(item))
}

/** Returns an array of items that only appear in one of the given arrays.
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [3, 4, 5, 6]
 
 uncommon(arr1, arr2) //=> [1, 2, 5, 6]
 * ```
 * See also: `common()` and `intersection()`
 **/
export function uncommon<T>(firstArray: T[], ...otherArrays: T[][]) {
  const arraysAsJSONStrings = [firstArray, ...otherArrays].map((arr) =>
    arr.map((item: T) => JSON.stringify(item))
  )
  const arraysUniqueValues = arraysAsJSONStrings.map((arr) => new Set(arr))
  const seen: string[] = []
  let result: string[] = []

  for (let i = 0; i < arraysUniqueValues.length; i++) {
    arraysUniqueValues[i].forEach((j) => {
      if (seen.includes(j)) {
        result = result.filter((x) => x !== j)
      } else {
        seen.push(j)
        result.push(j)
      }
    })
  }
  return result.map((item) => JSON.parse(item)) as T[]
}

/** Returns an array of items that appear in at least two of the given arrays.
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [3, 4, 5, 6]
 const arr3 = [4, 5, 6, 7]
 
 common(arr1, arr2, arr3) //=> [3, 4, 5, 6]
 * ```
 * See also: `difference()` and `intersection()`
 **/
export function common<T>(firstArray: T[], ...otherArrays: T[][]) {
  let arraysAsJSONStrings = [firstArray, ...otherArrays]
    .map((arr) => arr.map((item: T) => JSON.stringify(item)))
    .map((arr) => unique(arr))

  const seen: string[] = []
  let result: string[] = []

  for (let i = 0; i < arraysAsJSONStrings.length; i++) {
    arraysAsJSONStrings[i].forEach((j) => {
      if (seen.includes(j) && !result.includes(j)) {
        result.push(j)
      }
      seen.push(j)
    })
  }
  return result.map((item) => JSON.parse(item)) as T[]
}

/** Returns an array of items that appear in all of the given arrays.
 *
 * Example:
 * ```typescript
 const arr1 = [1, 2, 3, 4]
 const arr2 = [3, 4, 5, 6]
 const arr3 = [4, 5, 6, 7]
 
 intersection(arr1, arr2, arr3) //=> [4]
 * ```
 * See also: `difference()` and `common()`
 **/
export function intersection<T>(firstArray: T[], ...otherArrays: T[][]) {
  const firstArrayAsJSONStrings = firstArray.map((item) => JSON.stringify(item))
  const firstArrayUniqueValues = Array.from(new Set(firstArrayAsJSONStrings))

  return otherArrays
    .reduce((acc, arr) => {
      const arrayAsJSONString = arr.map((item) => JSON.stringify(item))
      return acc.filter((item) => arrayAsJSONString.includes(item))
    }, firstArrayUniqueValues)
    .map((item) => JSON.parse(item)) as T[]
}

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

/** Updates an item at a specific index in an array and returns result as a new array.
 *
 * Example:
 * ```typescript
 * const arr = [0, 1, 2, 3]
 *
 * console.log(updateAt(arr, 0, 1)) //=> [1, 1, 2, 3]
 *
 * console.log(arr) //=> [0, 1, 2, 3]
 * ```
 */
export function updateAt<T>(arr: T[], index: number, newValue: T) {
  return arr.map((item, i) => (i === index ? newValue : item))
}

/** Returns items in an array with a falsy result of a callback function
 *
 * Example:
 *
 * ```typescript
 * const arr = [1, 2, 3, 4, 5, 6]
 *
 * const isEven = (n: number) => n % 2 === 0
 *
 * reject(arr, isEven) //=> [1, 3, 5]
 * ```
 */
export function reject<T>(arr: T[], fn: Func) {
  return arr.filter((x) => !fn(x))
}

/** Returns items in an array with a falsy result of an async callback function
 *
 * Example:
 *
 * ```typescript
 * const arr = [1, 2, 3, 4, 5, 6]
 *
 * const asyncIsEven = async (n: number) => new Promise((resolve) => resolve(n % 2 === 0))
 *
 * await rejectAsync(arr, asyncIsEven) //=> [1, 3, 5]
 * ```
 */
export function rejectAsync<T>(arr: T[], fn: AsyncFunc<T, any>) {
  return filterAsync(arr, async (x: T) => !(await fn(x)))
}

/** Maps over an array and runs an async function
 *
 * Example:
 *
 * ```typescript
 * const result = await mapAsync([1, 2, 3], asyncDouble) //=> [2, 4, 6]
 * ```
 */
export async function mapAsync<T, U extends AsyncFunc<T, any>>(
  arr: T[],
  fn: U
) {
  const result: ReturnType<U>[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push(await fn(arr[i]))
  }
  return result as ReturnType<U>[]
}

/** Filters an array with an async function
 *
 * Example:
 *
 * ```typescript
 * const result = await filterAsync([1, 2, 3], asyncIsEven) //=> [2]
 * ```
 */
export async function filterAsync<T>(arr: T[], fn: AsyncFunc<T, any>) {
  const result: T[] = []
  for (let i = 0; i < arr.length; i++) {
    const fnResult = await fn(arr[i])
    if (!!fnResult) result.push(arr[i])
  }
  return result as T[]
}

/** Reduces an array with an async function
 *
 * Example:
 *
 * ```typescript
 * const asyncAdd = async (acc: number, n: number) => new Promise((resolve) => resolve(acc + n))
 *
 * const result = await reduceAsync([1, 2, 3], asyncAdd) //=> 6
 * ```
 */
export async function reduceAsync<T, V = any>(
  arr: T[],
  fn: (acc: any, i: T) => Promise<any>,
  defaultValue?: V
) {
  let result: V | undefined = defaultValue

  for (let i = 0; i < arr.length; i++) {
    result = await fn(result, arr[i])
  }

  return result as V
}

/** Returns an array of the difference of each consecutive item in an array of numbers
 *
 * Example:
 * ```typescript
 * steps([1, 3, 2, 5, -1]) //=> [2, -1, 3, -6]
 * ```
 *
 */
export function steps(arr: number[]) {
  return arr.slice(1).map((item, i) => item - arr[i])
}

/** Combines several arrays into one.
 *
 * Example:
 *
 * ```typescript
 *  combine([1, 2, 3], [4, 5], [6, 7, 8]) //=> [1, 2, 3, 4, 5, 6, 7, 8]
 * ```
 */
export function combine<T>(...arrs: T[][]) {
  return arrs.reduce((acc, arr) => {
    return acc.concat(arr)
  }, [])
}

/**
 *  Combines multiple strings into one string with specified separators,
 *  including a specific last separator.
 *
 * Example:
 * ```typescript
 * join(["apples", "oranges"], " and ") //=> "apples and oranges"
 *
 * join(["apples", "oranges"], ", ", " and ") //=> "apples and oranges"
 *
 * join(["apples", "oranges", "bananas"], ", ", " and ") //=> "apples, oranges and bananas"
 * ```
 */
export function join(arr: string[], separator: string, lastSeparator?: string) {
  return arr.reduce((acc, item, i) => {
    if (i === 0) return item

    if (i < arr.length - 1) return acc + separator + item

    return lastSeparator ? acc + lastSeparator + item : acc + separator + item
  }, "")
}

/**
 * Similar to `Array.find()` but returns the result of the callback function as opposed to the element itself.
 *
 * Example:
 * ```typescript
 * const squareGreaterThan2 = (n:number) => n > 2 ? n * n : null
 *
 * findValue([1, 2, 3, 4], squareGreaterThan2) //=> 9
 * ```
 */
export function findValue<T>(arr: T[], fn: Func<any | Falsy>) {
  const found = arr.find((item) => !!fn(item))

  return !!found ? fn(found) : null
}

/** Tranforms an array into an object with keys and values provided via callback function
 *
 * Example:
 * ```typescript
 * const arr = [{ first: "John", last: "Doe" }]
 *
 * arrayInto(arr, (i) => ({[i.first]: i.last})) //=> { "John": "Doe" }
 * ```
 */
export function arrayInto<T extends any[]>(
  arr: T,
  fn: (item: T[number], index?: number) => object
): object {
  return arr.reduce((acc, i, index) => ({ ...acc, ...fn(i, index) }), {})
}

/** Combines corresponding elements from a collection of arrays into an array of tuples
 *
 * Example:
 * ```typescript
 * zip([1, 2, 3], ["a", "b", "c"]) //=> [[1, "a"], [2, "b"], [3, "c"]]
 * ```
 *
 */
export function zip(arr: any[], ...rest: any[][]) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const current = [arr[i]]

    for (let j = 0; j < rest.length; j++) {
      current.push(rest[j][i])
    }
    result.push(current)
  }
  return result
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
export function omitKeys<T extends object, U extends keyof T>(
  obj: T,
  ...keys: U[]
) {
  const result: { [key: string]: any } = {}
  const keysAsStrings = keys.map((k) => String(k))
  Object.keys(obj).forEach((key) => {
    if (!keysAsStrings.includes(key)) {
      result[key] = obj[key as U]
    }
  })
  return result as Omit<T, U>
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
  return result as Pick<T, U>
}

/**
 * Returns an object with a new key value pair added if the key does not already exist
 *
 * Example:
 *
 * ```typescript
 * const obj = { name: "Stephen", age: 39 }
 *
 * putNew(obj, "name", "James") //=> { name: "Stephen", age: 39}
 *
 * putNew(obj, "city", "Atlanta") //=> { name: "Stephen", age: 39, city: "Atlanta" }
 *
 * ```
 */
export function putNew<T extends object>(
  obj: T,
  key: string,
  value: T[keyof T]
) {
  if (Object.keys(obj).includes(key)) return deepCopy(obj)
  else {
    const newObject = deepCopy(obj)
    newObject[key as keyof T] = value
    return newObject
  }
}

/** Tranforms an object into a new shape provided via callback function
 *
 * Example:
 * ```typescript
 * const obj = { user: { id: 1, name: "Stephen", age: 39, sex: "M"} }
 *
 * into(obj, (key, value) => ({[value.name]: `${value.age}/${value.sex}`}))
 *
 * //=> { "Stephen": "39/M" }
 * ```
 */
export function objectInto<T extends object, K extends keyof T, V extends T[K]>(
  obj: T,
  fn: (key: K, val: V) => object
): object {
  return Object.keys(obj).reduce(
    (acc, k) => ({ ...acc, ...fn(k as K, obj[k as K] as V) }),
    {}
  )
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

/** Returns the value of a nested key within an object of objects.
 * 
 * Example:
 * ```typescript
 * const nestedObject = { a: { b: { c: 42 } } }
 * getIn(nestedObject, ["a", "b", "c"]) //=> 42
 * ```
 * 
 
 */
export function getIn<T extends object>(
  o: T,
  nestedKeys: [string, string, ...rest: string[]]
) {
  const recursiveGet = (obj: any, key: any, i: number): any => {
    return i == nestedKeys.length - 1
      ? obj[nestedKeys[i]]
      : recursiveGet(obj[key], nestedKeys[i + 1], i + 1)
  }

  return recursiveGet(o, nestedKeys[0], 0)
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
  const sortedKeyValues = safeSort(Object.keys(groupedByKey))

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
 * keyValueCounts(arr, "name") //=> { John: 2, Sarah: 1, Beth: 1 }
 * ```
 **/
export function keyValueCounts<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive = false
) {
  return arr.reduce((result: { [key: string]: number }, obj) => {
    const value = isCaseSensitive
      ? String(obj[key])
      : String(obj[key]).toLowerCase()
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
 * uniqueByKeyValue(members, "id")
 * //=>
 * [{ id: 1, name: "Stephen" },
    { id: 2, name: "Andrea" },
    { id: 4, name: "Dylan" },
]
 * ```
 */
export function uniqueByKeyValue<T extends object, U extends keyof T>(
  arr: T[],
  key: U,
  isCaseSensitive = false
) {
  const groupedByKey = groupByKeyValue(arr, key, isCaseSensitive)
  return Object.keys(groupedByKey).reduce((acc: T[], k) => {
    return [...acc, groupedByKey[k][0]]
  }, [])
}

/** Returns a string of an object's key and value pairs as a query parameter string. Supports one level of nesting.
 *
 * Example:
 * ```typescript
 * objectToQueryParams({ age: 30, city: "Atlanta" }) //=> "age=38&city=Atlanta"
 * ```
 **/
export function objectToQueryParams(obj: object): string {
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

/** Finds objects with matching criteria and updates specific key value(s) on those objects. 
 * The function does not mutate the original object or array and instead returns a new array of objects.
 *
 * Example:
 * ```typescript
 * const objs = [
        { id: 1, name: "Stephen", sex: "male", isGuy: false },
        { id: 2, name: "Heather", sex: "female", isGuy: false },
      ]

//  * updateObjectsWhere(objs, { sex: "male" }, { isGuy: true }) 
//       // Find all objects where "sex" equals "male"
//       // and update "isGuy" to true
//       //=> 
//       [
//         { id: 1, name: "Stephen", sex: "male", isGuy: true },
//         { id: 2, name: "Heather", sex: "female", isGuy: false },
//       ]
//  * ```
//  */
// export function updateObjectsWhere<T extends object>(
//   objectArray: T[],
//   matchCriteria: Partial<T>,
//   newKeyValues: Partial<T>,
//   onlyUpdateFirstMatch = false
// ) {
//   const indeces: number[] = []

//   for (let i = 0; i < objectArray.length; i++) {
//     const obj = objectArray[i]

//     const allKeyValuesMatch = Object.keys(matchCriteria).reduce(
//       (allMatch, key) => {
//         if (matchCriteria[key as keyof T] === obj[key as keyof T] && allMatch)
//           return true
//         else return false
//       },
//       true
//     )

//     if (allKeyValuesMatch) indeces.push(i)
//     if (indeces.length > 0 && onlyUpdateFirstMatch) break
//   }

//   return Array.from(objectArray).map((obj, i) => {
//     if (indeces.includes(i)) return { ...obj, ...newKeyValues }
//     else return obj
//   })
// }

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
export function keyWithLargestValue<T extends object>(obj: T) {
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

/** Returns the first key in an object with a particular value (or null if none is found)
 *
 *
 * Example:
 * ```typescript
 * const obj = {a: 1, b: 2, c: 3}
 *
 * keyWhereValueIs(obj, 3) //=> "c"
 * ```
 */
export function keyWhereValueIs<T extends object, U extends T[keyof T]>(
  obj: T,
  value: U
): string | null {
  for (let key in obj) {
    if (obj[key] === value) return key
  }
  return null
}

/**
 * Runs a callback function on array of items and returns a single object with keys that match the return values.
 * Each key's value is an array of items that provide the same result when having the callback function run on them.
 *
 * Example:
 * ```typescript
 const people = [
                   { name: "John", age: 28 }, 
                   { name: "Brittany", age: 14 }, 
                   { name: "Susan", age: 67 }, 
                   { name: "Jeff", age: 17 }
                  ]
 
const canDrinkAlcohol = (person: { age: number }) => person.age >= 21
 
groupBy(people, canDrinkAlcohol)
 //=>
      {
       "true": [
         { name: "John", age: 28 },
         { name; "Susan", age: 67 }
       ]
       "false": [
         { name: "Brittany", age: 14 },
         { name: "Jeff", age: 17 }
       ]
      }
 * ```
 */
export function groupBy<T>(things: T[], func: Function) {
  const result: { [key: string]: T[] } = {}
  things.forEach((thing) => {
    const funcResult = JSON.stringify(func(thing))
    if (result[funcResult]) result[funcResult].push(thing)
    else result[funcResult] = [thing]
  })
  return result
}

export function countsBy<T>(things: T[], func: Function) {
  const result: { [key: string]: number } = {}
  const groupedByResult = groupBy(things, func)

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

sortBy(socialStats, getPopularity)
//=>
* [
    { follows: 2, likes: 0 },
    { follows: 1, likes: 2 },
    { follows: 5, likes: 1 },
    { follows: 4, likes: 3 },
]
 * ```
 */
export function sortBy<T>(things: T[], func: Function) {
  const groupedByResult = groupBy(things, func)
  return safeSort(Object.keys(groupedByResult)).reduce(
    (acc: T[], key) => [...acc, ...groupedByResult[key]],
    []
  )
}

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

/** Takes an async function and wraps it in promise that rejects if the original function takes
 * longer to resolve than a specific amount of time in milliseconds. If the original function resolves
 * before the timeout, that value is returned.
 **/
export function withTimeout<T extends AsyncFunc>(
  asyncFunction: T,
  timeout: number
) {
  return (...args: Parameters<T>) =>
    new Promise((resolve, reject) => {
      let timer: any
      asyncFunction(...(args as Array<Parameters<T>>)).then(
        (result: ReturnType<T>) => {
          clearTimeout(timer)
          resolve(result)
        }
      )
      timer = setTimeout(() => {
        reject("TIMED_OUT")
      }, timeout)
    }) as Promise<UnwrapPromiseOrResult<T>>
}

/** Returns a promise that resolves after a given amount of time in milliseconds.
 **/
export function pause(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

/** Returns a function that calls multiple given functions in a specific order.
 * 
 * Example:
 * ```typescript
const double = (n: number) => n * 2
const triple = (n: number) => n * 3
const doubleThenTriple = createPipe(double, triple)

doubleThenTriple(6) //=> 36
```
 **/
export function createPipe<FirstFn extends Func, F extends Func[]>(
  firstFn: FirstFn,
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
) {
  return (...args: Parameters<FirstFn>) =>
    (fns as Func[]).reduce(
      (acc, fn) => fn(acc),
      firstFn(...(args as Array<Parameters<FirstFn>>))
    ) as LastFnReturnType<F, ReturnType<FirstFn>>
}

/** Takes a starting argument(s) and runs it through a function. The result is then passed
 * to the next function and so on and so forth. The final result is returned.
 * 
 * Example:
 * ```typescript
const double = (n: number) => n * 2
const triple = (n: number) => n * 3

pipe(6, double, triple) //=> 36
```
 **/
export function pipe<FirstFn extends Func, F extends Func[]>(
  arg: Parameters<FirstFn> extends [any, any, ...any]
    ? Parameters<FirstFn>
    : Parameters<FirstFn>[number],
  firstFn: FirstFn,
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
) {
  return (fns as Func[]).reduce(
    (acc, fn) => fn(acc),
    firstFn(arg)
  ) as LastFnReturnType<F, ReturnType<FirstFn>>
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
  delay: number,
  immediate: boolean = false
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout>
  let lastArgs: Parameters<T>
  let isWaiting = false

  const clear = () => {
    clearTimeout(timeoutId)
    isWaiting = false
  }

  function debouncedFunction(
    ...args: Parameters<T>
  ): Promise<ReturnType<T> | undefined> {
    lastArgs = args
    clearTimeout(timeoutId)

    if (immediate) {
      if (!isWaiting) {
        const result = func(...lastArgs)
        isWaiting = true
        timeoutId = setTimeout(() => {
          isWaiting = false
        }, delay)
        return new Promise((resolve) => {
          resolve(result as ReturnType<T>)
        })
      } else {
        return new Promise((resolve) => {
          resolve(undefined)
        })
      }
    } else {
      isWaiting = true
      return new Promise((resolve) => {
        timeoutId = setTimeout(() => {
          resolve(func(...lastArgs) as ReturnType<T>)
          isWaiting = false
        }, delay)
      })
    }
  }

  debouncedFunction.clear = clear

  debouncedFunction.flush = (): Promise<ReturnType<T> | undefined> => {
    if (!immediate && isWaiting) {
      isWaiting = false
      clearTimeout(timeoutId)
      if (lastArgs) {
        return new Promise((resolve) => resolve(func(...lastArgs))) as Promise<
          ReturnType<T>
        >
      } else {
        return new Promise((resolve) => resolve(func())) as Promise<
          ReturnType<T>
        >
      }
    } else {
      return new Promise((resolve) => resolve(undefined))
    }
  }

  return debouncedFunction
}

/** Returns a throttled version of a function. The throttled version can only execute once every N milliseconds,
 * where N is the delay passed in to the throttle function. If the function is called again before the necessary
 * time has passed since last calling the function, the subsequent execution is queued and will occur
 * once the time has passed.
 **/
export function throttle<
  T extends Func | AsyncFunc,
  U extends Parameters<T>,
  R extends UnwrapPromiseOrResult<T>
>(func: T, delay = 0) {
  let index = 0
  let lastCompleted = 0
  let queue: number[] = []
  return async (...args: U) => {
    index++
    queue.push(index)
    while (lastCompleted < index - 1) {
      await pause(250)
    }
    const result = await func(...(args as Array<U>))
    if (delay) {
      setTimeout(() => {
        lastCompleted++
      }, delay)
    }
    return result as R
  }
}

/** Returns a function that can only be run a certain number of times
 *
 * Example:
 *
 * ```typescript
 * const logHello = () => console.log("hello")
 * const limitedLogHello = limit(logHello, 1)
 *
 * logHello()
 * logHello()
 *
 * //=> "hello"
 * ```
 */
export function limit<T extends Func | AsyncFunc>(func: T, limit: number) {
  let runCount = 0
  return (...params: Parameters<T>) => {
    if (runCount < limit) {
      runCount++
      func(...params)
    }
  }
}

/** Attempts to run a function up to a specified number of times and returns the result if successful. Also accepts an
 * optional delay in ms between each attempt and fallback function if all calls are unsuccessful.
 *
 */
export async function retry<T extends Func | AsyncFunc>(
  func: T,
  attempts: number,
  delay?: number,
  fallbackFn?: Func | AsyncFunc
) {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await func()
    } catch {
      await pause(delay ?? 0)
    }
  }
  if (fallbackFn) return fallbackFn()
}

/** Returns a memoized version of a function.
 *
 * _Memoization is the process of caching a function's result so that if the function is called
 * with same parameters, the result can be retrieved from cache, rather than
 * executing the function again._
 */
export function memoize<T extends Func | AsyncFunc>(func: T): T {
  const results: { [key: string]: ReturnType<T> } = {}
  return ((...args: Parameters<T>): ReturnType<T> => {
    const argsAsString = args.join(",")
    if (results[argsAsString]) return results[argsAsString]
    else {
      results[argsAsString] = func(...(args as Array<Parameters<T>>))
      return results[argsAsString]
    }
  }) as T
}

/** Returns a function with arguments prepended to the arguments it receives.
 * 
 * Example:
 * ```typescript
const greet = (greeting: string, name: string) => greeting + " " + name;
const sayHello = partial(greet, "Hello")

sayHello("John") //=> "Hello John"
}

* ```
 **/
export function partial<T extends Func>(
  func: T,
  ...args: (Parameters<T>[number] | Falsy)[]
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

/** Returns a curried version of a function.
 *
 * Example:
 * ```typescript
 * const addThreeNumbers = (n1: number, n2: number, n3: number) => n1 + n2 + n3
 *
 * const curriedAdd3 = curry(addThreeNumbers)
 *
 * curriedAdd3(1)(2)(3) //=> 6
 * ```
 **/
export function curry<T extends (...args: any[]) => any>(
  func: T
): CurryFunction<T> {
  function curried(func: Function, i: number, args: any[]): Function {
    return args.length < func.length
      ? (arg: any) => curried(func, i - 1, [...args, arg])
      : func(...args)
  }
  return curried(func, func.length, []) as CurryFunction<T>
}

/** Runs a function a specified number of times. Optionally pass in a delay between each execution.
 * Returns the returned value of the last execution.
 *
 */
export async function times(
  fn: Func | AsyncFunc,
  times: number,
  delay?: number
) {
  let result
  for (let i = 1; i <= times; i++) {
    result = await fn()
    if (delay) await pause(delay)
  }
  return result
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

/** Returns an `Queue` which includes a queue, enqueue function, and two execute methods.
 **/
export function createQueue<
  T extends Func | AsyncFunc,
  U extends Parameters<T>,
  R extends UnwrapPromiseOrResult<T>
>(functionToExecute: T, delay?: number): Queue<U, R> {
  const queue: U[] = []
  let isBreakRequested = false

  const executeOne = async () => {
    const returnValue = await functionToExecute(...(queue[0] as Array<U>))
    queue.shift()
    return returnValue as R
  }

  const executeAll = async (ignoreErrors = false): Promise<any> => {
    type ResultType = R | "error"

    const recursiveExecuteAll = async (
      results: ResultType[] = []
    ): Promise<any> => {
      if (isBreakRequested) return results

      try {
        const newResults: ResultType[] = [
          ...results,
          await functionToExecute(...(queue[0] as Array<U>)),
        ]
        queue.shift()
        if (delay) await pause(delay)
        if (queue.length > 0) return recursiveExecuteAll(newResults)
        else return newResults
      } catch {
        if (ignoreErrors) {
          queue.shift()
          if (delay) await pause(delay)
          if (queue.length > 0) recursiveExecuteAll([...results, "error"])
          else return results
        }
      }
    }

    return recursiveExecuteAll()
  }
  return {
    breakOut: () => {
      isBreakRequested = true
    },
    queue,
    enqueue: (...args: U) => queue.push(args),
    executeOne,
    executeAll,
  }
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
    (error) => {
      err = String(error)
    }
  )
  while (browserLocation.latitude === null && err === null) {
    await pause(500)
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

/** Returns the browser's display mode (light of dark)
 **/
export function getBrowserDisplayMode(): "light" | "dark" {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
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
export function hexToRgb(
  hex: string
): [red: number, green: number, blue: number] {
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
export function loremIpsum(wordCount = 69) {
  const li =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  if (wordCount) {
    const words = li.split(" ")
    return words.slice(0, wordCount).join(" ")
  } else return li
}

/**
 * Removes any html tags from a provided string
 *
 * Example:
 * ```typescript
 * stripHTML("<html><p>Hello <b>world</b>!</p></html>") //=> "Hello world!"
 *
 * ```
 */
export function stripHTML(text: string) {
  let isInsideBracket = false
  let result = ""

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "<") isInsideBracket = true
    else if (!isInsideBracket) result += text[i]
    else if (text[i] === ">") isInsideBracket = false
  }
  return result
}

const defaultMatchOptions: MatchOptions = {
  ignoreCase: false,
  ignoreSpace: false,
  ignoreOrder: false,
}

function withMatchOptions(
  param: string | any[] | Record<any, any>,
  options: MatchOptions
): typeof param {
  if (typeof param === "number") return String(param)
  if (typeof param === "string") {
    let compare: string | string[] = param
    if (options.ignoreCase) compare = compare.toLowerCase()
    if (options.ignoreSpace) compare = compare.replace(/ /g, "")
    if (options.ignoreOrder) {
      compare = JSON.stringify(compare.split("").toSorted().join(""))
    }
    return compare
  } else if (Array.isArray(param)) {
    let compare = param

    if (options.ignoreCase) {
      compare = compare.map((x) =>
        typeof x === "string" ? x.toLowerCase() : x
      )
    }

    if (options.ignoreSpace) {
      compare = compare.map((x) =>
        typeof x === "string" ? x.replace(/ /g, "") : x
      )
    }

    if (options.ignoreOrder) {
      compare = compare.toSorted()
    }
    return compare
  } else if (typeof param === "object") {
    let compare: Record<any, any> = {}

    if (options.ignoreOrder) {
      Object.keys(param)
        .toSorted()
        .forEach((p) => {
          compare[p] = param[p]
        })
    } else compare = JSON.parse(JSON.stringify(param))

    if (options.ignoreCase) {
      compare = JSON.parse(JSON.stringify(compare).toLowerCase())
    }

    if (options.ignoreSpace) {
      let newCompare: Record<any, any> = {}
      Object.keys(compare).forEach((p) => {
        newCompare[p.replace(/ /g, "")] = String(compare[p]).replace(/ /g, "")
      })
      return newCompare
    }
    return compare
  } else return param
}

// TYPES

export type Duration = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isGreaterThan: (otherDuration: Duration) => boolean
  isLessThan: (otherDuration: Duration) => boolean
}

type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"

type StringOrArray<T extends string | any[]> = T extends (infer U)[]
  ? U[]
  : string

type Func<T = any, U = any> = (...args: T[]) => U

type AsyncFunc<T = any, U = any> = (...args: T[]) => Promise<U>

type UnwrapPromiseOrResult<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : T extends (...args: any[]) => any
  ? ReturnType<T>
  : never

type DebouncedFunction<T extends Func> = {
  (...args: Parameters<T>): Promise<ReturnType<T> | undefined>
  clear: () => void
  flush: () => Promise<ReturnType<T> | undefined>
}

type CurryFunction<T> = T extends (...args: infer Args) => infer Result
  ? Args extends []
    ? () => Result
    : Args extends [infer First, ...infer Rest]
    ? (arg: First) => CurryFunction<(...rest: Rest) => Result>
    : never
  : never

type Queue<Params extends any[], Result> = {
  queue: Params[]
  enqueue: (...args: Params) => void
  executeOne: () => Promise<Result>
  executeAll: (ignoreErrors?: boolean) => Promise<(Result | "error")[]>
  breakOut: Function
}

// Credit to @ecyrbedev on Twitter for this advanced typing mastery
type PipeArgs<F extends Func[], Acc extends Func[] = []> = F extends [
  (...args: infer A) => infer B
]
  ? [...Acc, (...args: A) => B]
  : F extends [(...args: infer A) => any, ...infer Tail]
  ? Tail extends [(arg: infer B) => any, ...any[]]
    ? PipeArgs<Tail, [...Acc, (...args: A) => B]>
    : Acc
  : Acc

type LastFnReturnType<F extends Array<Func>, Else = never> = F extends [
  ...any[],
  (...arg: any) => infer R
]
  ? R
  : Else

type GeoCoords = {
  latitude: number | null
  longitude: number | null
}

type StringOrNumberArray<T extends string[] | number[]> = T extends string[]
  ? string[]
  : number[]

type Falsy = null | undefined | false

export type Handler = (req: Request, res: Response) => void

type MatchOptions = {
  ignoreCase?: boolean
  ignoreSpace?: boolean
  ignoreOrder?: boolean
}
