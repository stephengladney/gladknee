# gladknee 😄🦵

Gladknee is an open-source TypeScript utility library. It's written with functional programming conventions in mind.<br><br>

#### What this library includes...

<ul>
<li>Abstractions of commonly needed functionality (i.e. lowerCaseNoSpaces, clampNumber, pause, etc)</li>
<li>Safe alternatives to JavaScript weirdness (i.e. sorting negative numbers)</li>
<li>Abstractions of common browser-related functionality (i.e. cookies, geolocation, saving files, etc)</li>
<li>Abstractions of computer-sciency things (i.e. queue, stack, etc)</li>
</ul>

#### What this library does not include...

<ul>
<li>Custom classes that are just re-hashings of existing classes (i.e. "Sequence" instead of array)</li>
<li>Custom functions that are just re-hashings of existing functions (i.e. array.includes())</li>
<li>Abstractions of things you don't need a library for (i.e. get element from array at index N)</li>
<li>Type checking in JavaScript</li>
</ul>
<br>

### Methods

<details>
<summary>Numbers</summary><br>
<details>
<summary>&nbsp;&nbsp;float</summary>
<br>
Returns a number limited to a specific number of decimal places. This is different from the native toFixed() method because it returns a number not a string.
<br><br>

```typescript
float(n: number, decimalPlaces?: number): number
```

Example:

```typescript
float(4.24398, 3)
// 4.244
```

</details>
<details>
<summary>&nbsp;&nbsp;clampNumber</summary>

Enforces a minimum and/or maximum limit on a number and returns the number or the enforced limit. You can pass `false` or 0 for a limit parameter to bypass that limit.
<br><br>

```typescript
float(n: number, decimalPlaces?: number): number
```

<br><br>
Example:

```typescript
clamp(15, 3, 12)
// 12

clamp(15, 16, 20)
// 16
```

</details>
<details>
<summary>&nbsp;&nbsp;doubleDigit</summary>

### **doubleDigit(n: number): string**

Returns a provided single digit number with a leading zero as a string
<br><br>
Example:

```typescript
doubleDigit(9)
// "09"
```

</details>
<details>
<summary>&nbsp;&nbsp;ordinal</summary>

### **ordinal(n: number): string**

Returns a string of the provided number with the ordinal suffix added
<br><br>
Example:

```typescript
ordinal(4)
// "4th"
```

</details>
<details>
<summary>&nbsp;&nbsp;getRange</summary>

### **getRange(start: number, end: number, step?: number) : number[]**

Returns an array of numbers, starting from the provided start number and ending with provided end number. You can optionally pass in a step number to increment by a number other than 1. You can also increment negatively.
<br><br>
Example:

```typescript
getRange(5, 10)
// [5, 6, 7, 8, 9, 10]

getRange(0, 10, 2)
// [0, 2, 4, 6, 8, 10]

getRange(10, 0, -2)
// [10, 8, 6, 4, 2, 0]
```

</details>
<br>
</details>
<details>
<summary>Dates & Time</summary><br>
<details>
<summary>&nbsp;&nbsp;getAmountOfTimeFromSeconds</summary>

### **getAmountOfTimeFromSeconds(seconds: number): TimeObject**

Returns an object with calculated years, months, weeks, days, hours, minutes and seconds from seconds provided
<br><br>

```typescript
interface TimeObjectTimeOutput {
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
```

<br><br>
Example:

```typescript
getAmountOfTimeFromSeconds(2000000)
//
 {
    years: 0,
    months: 0,
    weeks: 3,
    days: 2,
    hours: 3,
    minutes: 33,
    seconds: 20
  }

  getAmountOfTimeFromSeconds(2000000).inDays()
// 23.14814814814815
```

</details>
<details>
<summary>&nbsp;&nbsp;getSecondsFromAmountOfTime</summary>

### **getSecondsFromAmountOfTime(time: TimeObject): number**

Returns the numbers of seconds from the TimeObject provided
<br><br>

```typescript
interface TimeObject {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}
```

<br><br>
Example:

```typescript
getAmountOfTimeFromSeconds({
  years: 0,
  months: 0,
  weeks: 3,
  days: 2,
  hours: 3,
  minutes: 33,
  seconds: 20,
})

// 2000000
```

</details>
<details>
<summary>&nbsp;&nbsp;timeUntil</summary>

### **timeUntil(date: Date): TimeOutput**

Returns an object with the number of years, months, weeks, days, hours, minutes and seconds until the date provided

</details>
<details>
<summary>&nbsp;&nbsp;timeSince</summary>

### **timeSince(date: Date): TimeOutput**

Returns an object with the number of years, months, weeks, days, hours, minutes and seconds since the date provided

</details>
<details>
<summary>&nbsp;&nbsp;getDayName</summary>

### **getDayName(day: number): string | undefined**

Returns the corresponding human readable day name of the integer provided (integer must be 0-6)
<br><br>
Example:

```typescript
getDayName(3)
// "Wednesday"

getDayName(99)
// undefined
```

</details>
<details>
<summary>&nbsp;&nbsp;beginningOfToday</summary>

### **beginningOfToday(): Date**

Returns a Date object with the date of today and time of 00:00:00

</details>
<details>
<summary>&nbsp;&nbsp;endOfToday</summary>

### **endOfToday(): Date**

Returns a Date object with the date of today and time of 23:59:59

</details>
<br>
</details>
<details>
<summary>Strings</summary><br>
<details>
<summary>&nbsp;&nbsp;lowerCaseNoSpaces</summary>

### **lowerCaseNoSpaces(str: string): string**

Returns a string in lowercase form with spaces removed
<br><br>
Example:

```typescript
lowerCaseNoSpaces("Hello World")
// "helloworld"
```

<br>
</details>
<details>
<summary>&nbsp;&nbsp;truncate</summary>

### **truncate(str: string, lengthLimit: number, ending: string ): string**

Returns a string limited to a max length with ... or custom ending
<br><br>
Example:

```typescript
truncate("Hello World!", 4)
// "Hell..."

truncate("Hello World!", 4, "/")
// "Hell/"
```

</details>
<details>
<summary>&nbsp;&nbsp;getRandomString</summary>

### **getRandomString(length: number, includeLetters: boolean, includeNumbers: boolean ): string**

Returns a random string of specified length. Can include letters and/or numbers<br><br>
_Note: includeLetters and includeNumbers both default to true_
<br><br>
Example:

```typescript
getRandomString(10)
// "N3xO1pDs2f"

getRandomString(5, true, false)
// "GjOxa"

getRandomString(5, false, true)
// "39281"
```

</details>
<br>
</details>
<details>
<summary>Arrays</summary><br>
<details>
<summary>&nbsp;&nbsp;isEvery</summary>

### **isEvery<T>(arr: T[], func: (i: T, index?: number) => boolean): boolean**

Returns a boolean that reflects whether or not every item in an array meets a condition
<br><br>
Example:

```typescript
const isEven = (n: number) => n % 2 === 0

isEvery([2, 4, 6, 8], (n) => isEven(n))
// true

isEvery([2, 4, 7, 8], (n) => isEven(n))
// false
```

</details>
<details>
<summary>&nbsp;&nbsp;isAny</summary>

### **isAny<T>(arr: T[], func: (i: T, index?: number) => boolean): boolean**

Returns a boolean that reflects whether or not any item in an array meets a condition
<br><br>
Example:

```typescript
const isEven = (n: number) => n % 2 === 0

isAny([3, 5, 7, 9], (n) => isEven(n))
// false

isAny([2, 5, 7, 9], (n) => isEven(n))
// true
```

</details>
<details>
<summary>&nbsp;&nbsp;shuffle</summary>

### **shuffle(arr: T[]): T[]**

Returns the provided array with the items randomly ordered.
<br><br>
Example:

```typescript
shuffle([1, 2, 3, 4, 5])
// [3, 5, 1, 4, 2]
```

</details>
<details>
<summary>&nbsp;&nbsp;flatten</summary>

### **flatten(arr: any[], levels?: number): any[]**

Returns a single dimensional array by default. If you pass a number for levels, the function will only reduce that many dimensions of arrays.
<br><br>
Example:

```typescript
flatten([1, 2, [3, 4], 5])
// [1, 2, 3, 4, 5]

flatten([1, 2, [[3, 4], 5]])
// [1, 2, 3, 4, 5]

flatten([1, 2, [[3, 4], 5]], 1)
// [1, 2, [3, 4], 5]
```

</details>
<details>
<summary>&nbsp;&nbsp;chunkArray</summary>

### **chunkArray(arr: any[], n: number): any[][]**

Divides the provided array into smaller arrays of a provided size. Returns an array of these smaller arrays.
<br><br>
Example:

```typescript
chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
// [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
```

</details>
<details>
<summary>&nbsp;&nbsp;clampArray</summary>

### **clampArray<T>(arr: T[], min: number | false, max: number | false, fill?: T): any[]**

Returns the provided array with a minimum and/or maximum length limit enforced. If the minimum length is larger than the length of the array, the fill will be added to the array as many times as necessary to reach the minimum limit. If a fill is provided, it must match the type of the array provided. If no fill is provided, `undefined` will be added. For min and max limits, you can pass `false` or 0 for a limit parameter to bypass that limit.
<br><br>
Example:

```typescript
clampArray([1, 2, 3, 4, 5], 0, 3)
// [1, 2, 3]

clampArray([1, 2, 3], 5, false, "x")
// [1, 2, 3, "x", "x"]
```

</details>
<details>
<summary>&nbsp;&nbsp;getUnique</summary>

### **getUniqueItems<T>(arrs: T[][]): T[]**

Returns an array of items that only appear once across all items of the provided arrays.
<br><br>
Example:

```typescript
getUnique([1, 2, 3], [3, 4, 5])
// [1, 2, 4, 5]
```

</details>
<details>
<summary>&nbsp;&nbsp;getCommon</summary>

### **getCommonItems<T>(arrs: T[][]): T[]**

Returns an array of items that appear at least twice across all items of the provided arrays.
<br><br>
Example:

```typescript
getCommon([1, 2, 3, 4], [3, 4, 5])
// [3, 4]
```

</details>
<details>
<summary>&nbsp;&nbsp;areArraysEqual</summary>

### **areArraysEqual<T>(arrray1: T[], array2: T[], orderMatters: boolean): boolean**

Returns a boolean of whether or not the two arrays have the same items. orderMatters is true by default.
<br><br>
Example:

```typescript
areArraysEqual([1, 2, 3], [1, 2, 3])
// true

areArraysEqual([3, 2, 1], [1, 2, 3])
// false

areArraysEqual([3, 2, 1], [1, 2, 3], false)
// true
```

</details>
<details>
<summary>&nbsp;&nbsp;getNthFromEnd</summary>

### **nthFromEnd<T>(arr: T[], n: number): T**

Returns the item in the array N spots from the last item.
<br><br>
Example:

```typescript
nthFromEnd([1, 2, 3, 4], 1)
// 3
```

</details>
<details>
<summary>&nbsp;&nbsp;bubbleSort</summary>

### **bubbleSort(arr: T[]): T[]**

Returns the provided array sorted (ascending) via bubble sort.

</details>
<details>
<summary>&nbsp;&nbsp;selectionSort</summary>

### **selectionSort(arr: T[]): T[]**

Returns the provided array sorted (ascending) via selection sort.

</details>
<details>
<summary>&nbsp;&nbsp;insertSort</summary>

### **insertSort(arr: T[]): T[]**

Returns the provided array sorted (ascending) via insert sort.

</details>
<details>
<summary>&nbsp;&nbsp;removeDuplicates</summary>

### **removeDuplicates(arr: T[]): T[]**

Returns the provided array with duplicates removed.
<br><br>
Example:

```typescript
removeDuplicates([1, 2, 1, 1, 2, 5])
// [1, 2, 5]
```

</details>
<details>
<summary>&nbsp;&nbsp;sum</summary>

### **sum(arr: number[]): number**

Returns the sum of an array of numbers.
<br><br>
Example:

```typescript
sum([1, 2, 3, 4, 5])
// 15
```

</details>
<details>
<summary>&nbsp;&nbsp;getRollingSum</summary>

### **getRollingSum(arr: number[]): number[]**

Returns an array of the rolling sum of an array.
<br><br>
Example:

```typescript
getRollingSum([1, 3, 5])
// [1, 4, 9]
```

</details>
<br>
</details>
<details>
<summary>Objects</summary><br>
<details>
<summary>&nbsp;&nbsp;omitKeys</summary>

### **function omitKeys(obj: { [key: string]: any }, ...keys: string[]): object**

Returns the object with any provided keys removed
<br><br>
Example:

```typescript
const obj = { a: 1, b: 2, c: 3 }

omitKeys(obj, "b", "c")
// {a: 1}
```

</details>
<details>
<summary>&nbsp;&nbsp;pickKeys</summary>

### **function pickKeys<T extends object, U extends keyof T>(obj: T, ...keys: U[]): object**

Returns the object with only the provided keys included
<br><br>
Example:

```typescript
const obj = { a: 1, b: 2, c: 3 }

pickKeys(obj, "b", "c")
// {b: 2, c: 3}
```

</details>
<details>
<summary>&nbsp;&nbsp;combineObjects</summary>

### **function combineObjects(objs: object[]): object**

Returns a single object with all key value pairs from provided objects.
<br><br>
_NOTE: If two objects have the same key, the latter object in the array's value(s) will result_
<br><br>
Example:

```typescript
combineObjects([{ a: 1 }, { b: 2 }, { c: 3 }])
// {a: 1, b: 2, c: 3}
```

</details>
<details>
<summary>&nbsp;&nbsp;sumOfKeyValues</summary>

### **sumOfKeyValues<T extends object, U extends keyof T>(arr: (T & { [K in U]: number })[],key: U): number**

Returns the sum of the values of a specific shared key in an array of objects.
<br><br>
Example:

```typescript
const arr = [{ a: 1 }, { a: 2 }, { a: 3 }]

sumOfKeyValues(arr, "a")
// 6
```

</details>
<details>
<summary>&nbsp;&nbsp;sortObjectsByKeyValue</summary>

### **sortObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U)**

Sorts an array of objects by a specific shared key's value.
<br><br>
Example:

```typescript
const arr = [{ a: 3 }, { a: 1 }, { a: 5 }]

sortObjectsByKeyValue(arr, "a")
// [{a: 1}, { a: 3 }, {a: 5}]
```

</details>
<details>
<summary>&nbsp;&nbsp;sortObjectsByKeyValues</summary>

### **sortObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], ...keys: U[])**

Returns an array of objects with nested sorting based on the keys provided.
<br><br>
Example:

```typescript
const arr = [
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
        { a: 3, b: 4, c: 1 },
      ]

sortObjectsByKeyValues(arr, "a", "b", "c")
// [
    { a: 1, b: 1, c: 1 },
    { a: 1, b: 2, c: 1 },
    { a: 1, b: 2, c: 2 },
    { a: 1, b: 3, c: 2 },
    { a: 2, b: 1, c: 3 },
    { a: 2, b: 2, c: 1 },
    { a: 3, b: 4, c: 1 },
   ]
```

</details>
<details>
<summary>&nbsp;&nbsp;getKeyValueCounts</summary>

### **getKeyValueCounts<T extends object, U extends keyof T>(arr: T[], key: U, isCaseSensitive?: boolean)**

Returns an object with counts of specifics value of a specific shared key in an array of objects.
<br><br>
Example:

```typescript
const arr = [{ suit: "Clubs" }, { suit: "Hearts" }, { suit: "Clubs" }]

getKeyValueCounts(arr, "suit")
// { "Clubs": 2, "Hearts": 1}
```

</details>
<details>
<summary>&nbsp;&nbsp;groupObjectsByKeyValue</summary>

### **groupObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U)**

Returns an object with arrays of objects that share a specific value of a specific shared key in an array of objects.
<br><br>
Example:

```typescript
const arr = [{ suit: "Clubs", value: 2 }, {suit: "Hearts", value: 5}, {suit: "Clubs", value: 10}]

groupObjectsByKeyValue(arr, "suit")
// {
    "Clubs": [{ suit: "Clubs" value: 2}, { suit: "Clubs", value: 10 }],
    "Hearts": [{ suit: "Hearts", value: 5 }]}
```

</details>
<details>
<summary>&nbsp;&nbsp;convertObjectToQueryParams</summary>

### **convertObjectToQueryParams(obj: object): string**

Returns a string of an object's key and value pairs as a query parameter string. Supports single-level nesting.
<br><br>
Example:

```typescript
convertObjectToQueryParams({ age: 30, city: "Atlanta" })
// "age=38&city=Atlanta"
```

</details>
<br>
</details>
<details>
<summary>Express</summary><br>
<details>
<summary>&nbsp;&nbsp;createExpressRoutes</summary>

### **creatExpressRoutes(handlers: Handlers): Route**

Returns an Express Router object with GET, POST, PUTS and DELETE routes defined.
<br><br>

```typescript
type Handler = (req: Request, res: Response) => void

type Handlers = {
  index?: Handler
  show?: Handler
  create?: Handler
  update?: Handler
  deleteFn?: Handler
  extendRouter?: (router: Router) => void
}
```

</details>
</details>
<details>
<summary>Misc</summary><br>
<details>
<summary>&nbsp;&nbsp;addTimeoutToPromise</summary>

### **addTimeoutToPromise(asyncFunction: () => Promise<unknown>, timeout: number): Promise<unkown>**

Returns a promise that rejects if the original promise takes longer to resolve than a given amount of time. (ms)
<br><br>
Note: The promise rejects with the string "TIMED_OUT"
<br>

</details>
<details>
<summary>&nbsp;&nbsp;pauseAsync</summary>

### **pauseAsync(milliseconds: number): Promise<void>**

Returns a promise that resolves after a given amount of time (ms)
<br>

</details>
<details>
<summary>&nbsp;&nbsp;pauseSync</summary>

### **pauseSync(milliseconds: number)**

Delays future code from executing until the provided milliseconds have passed.
<br>

</details>
<details>
<summary>&nbsp;&nbsp;pipe</summary>

### pipe<T>(...funcs: [firstFunc: GenericFunction<T>,secondFunc: GenericFunction<T>,...otherFuncs: GenericFunction<T>[]]): Function

Returns a function that calls multiple given functions in a specific order.
<br><br>
Example:

```typescript
const double = (n: number) => n * 2
const triple = (n: number) => n * 3
const doubleThenTriple = pipe(double, triple)

doubleThenTriple(6)
// 36
```

</details>
<details>
<summary>&nbsp;&nbsp;debounce</summary>

### **debounce(func: Function, ms: number, immediate: boolean): Function**

Returns a debounced version of the function passed. Acccepts custom delay and immediate boolean for leading/trailing.
<br>

</details>
<details>
<summary>&nbsp;&nbsp;saveTextToFileInBrowser</summary>

### **saveTextToFileInBrowser(content: string, filename: string)**

Prompts a user in their browser to save provided text to a file on their machine.
<br>

</details>
<details>
<summary>&nbsp;&nbsp;getBrowserGeolocation</summary>

### **getBrowserGeolocation(timeoutInSeconds?: number): GeoCoords**

Returns the user's latitude and longitude or an error.
<br><br>
**Note: Timeout defaults to 10 seconds**
<br><br>

```typescript
type GeoCoords = {
  latitude: number | null
  longitude: number | null
}
```

</details>
<details>
<summary>&nbsp;&nbsp;getBrowserSearchParams</summary>

### **getBrowserSearchParams(): object**

Returns the window location's search params. Supports single-level nesting.
<br><br>

```typescript
// Browser location: website.com?search=john&page=1

getBrowserSearchParams()
/* {
    search: "john",
    page: "1"
   }
*/
```

</details>
<details>
<summary>&nbsp;&nbsp;setCookie</summary>

### **setCookie(cookieName: string, cookieValue: string, expirationInDays: number)**

Sets the vaue of a specific cookie.
<br>

</details>
<details>
<summary>&nbsp;&nbsp;getCookie</summary>

### **getCookie(cookieName: string)**

Returns the value of a specific cookie.
<br>

</details>
<details>
<summary>&nbsp;&nbsp;createQueue</summary>

### **createQueue(functionToExecute: Function): QueueObject**

Returns a **QueueObject** which includes a queue, enqueue function, and two execute methods.
<br>
<br>
`executeOne()` will call the function on the first item in the queue and then remove that item from the queue.
<br><br>
`executeAll()` will call the function every item in the queue and remove each item after execution.
<br><br>
`breakOut()` halts the `executeAll()` function.
<br><br>
Example:

```typescript
type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: Function
  breakOut: Function
}
```

```typescript
const log = (n: any) => {
  console.log(n)
}
const { queue, enqueue, executeOne, executeAll, breakOut } = createQueue(log)

enqueue(1)
enqueue(2)
enqueue(3)
enqueue(4)

executeOne()
// 1

executeAll()
// 2
// 3
// 4
```

</details>
<details>
<summary>&nbsp;&nbsp;createQueueAsync</summary>

### **createQueueAsync(functionToExecute: Function): AsyncQueueObject**

Returns a **AsyncQueueObject** which includes a queue, enqueue function, and two execute methods.
<br>
<br>
`executeOne()` will call the async function on the first item in the queue and then remove that item from the queue.
<br><br>
`executeAll(ignoreErrors?: boolean)` will call the async function on every item in the queue and remove each item after execution. The previous function's returned promise must resolve before the next iteration is invoked. If you wish to continue iterating even if a promise rejects, pass a true boolean into the function.
<br><br>
`breakOut()` halts the `executeAll()` function.
<br><br>
Example:

```typescript
type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: (ignoreErrors = false) => unknown
  breakOut: Function
}
```

```typescript
const log = async (n: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(n)
      resolve(n)
    },2000)
  })

const { queue, enqueue, executeOne, executeAll, breakOut } = createQueueAsync(log)

enqueue(1)
enqueue(2)
enqueue(3)
enqueue(4)

await executeOne()
// 1

await executeAll()
// 2
// 3
// 4
```

</details>
</details>
