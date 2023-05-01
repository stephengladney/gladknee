# gladknee 😄🦵

Gladknee is an open-source TypeScript utility library.

<details>
<summary>Numbers</summary><br>
<details>
<summary>&nbsp;&nbsp;isEven</summary>

### **isEven(n: number): boolean**

Returns a boolean of whether or not the provided number is even
<br><br>
Example:

```
float(4.24398, 3)
// 4.244
```

</details>
<details>
<summary>&nbsp;&nbsp;float</summary>

### **float(n: number, decimalPlaces?: number): number**

Returns a number limited to a specific number of decimal places. This is different from the native toFixed() method because it returns a number not a string.
<br><br>
Example:

```
float(4.24398, 3)
// 4.244
```

</details>
<details>
<summary>&nbsp;&nbsp;clampNumber</summary>

### **clampNumber(n: number, min: number: max: number): number**

Enforces a minimum and/or maximum limit on a number and returns the number or the enforced limit
<br><br>
Example:

```
clamp(15, 3, 12)
// 12

clamp(15, 16, 20)
// 16
```

</details>
<details>
<summary>&nbsp;&nbsp;toDoubleDigit</summary>

### **toDoubleDigit(n: number): string**

Returns a provided single digit number with a leading zero as a string
<br><br>
Example:

```
toDoubleDigit(9)
// "09"
```

</details>
<details>
<summary>&nbsp;&nbsp;ordinal</summary>

### **ordinal(n: number): string**

Returns a string of the provided number with the ordinal suffix added
<br><br>
Example:

```
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

```
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

```
interface TimeObjectTimeOutput {
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

```
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
```

</details>
<details>
<summary>&nbsp;&nbsp;getSecondsFromAmountOfTime</summary>

### **getSecondsFromAmountOfTime(time: TimeObject): number**

Returns the numbers of seconds from the TimeObject provided
<br><br>

```
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

```
getAmountOfTimeFromSeconds({
    years: 0,
    months: 0,
    weeks: 3,
    days: 2,
    hours: 3,
    minutes: 33,
    seconds: 20
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
<summary>&nbsp;&nbsp;getDayName</summary>

### **getDayName(day: number): string | undefined**

Returns the corresponding human readable day name of the integer provided (integer must be 0-6)
<br><br>
Example:

```
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

```
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

```
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

```
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

```
const isEven = (n: number) => n % 2 === 0

isEvery([2,4,6,8],(n) => isEven(n))
// true

isEvery([2,4,7,8],(n) => isEven(n))
// false
```

</details>
<details>
<summary>&nbsp;&nbsp;isAny</summary>

### **isAny<T>(arr: T[], func: (i: T, index?: number) => boolean): boolean**

Returns a boolean that reflects whether or not any item in an array meets a condition
<br><br>
Example:

```
const isEven = (n: number) => n % 2 === 0

isAny([3,5,7,9],(n) => isEven(n))
// false

isAny([2,5,7,9],(n) => isEven(n))
// true
```

</details>
<details>
<summary>&nbsp;&nbsp;drop</summary>

### **drop(arr: T[], n: number): T[]**

Returns the provided array with n items removed from the end, where n is a provided integer
<br><br>
Example:

```
drop([1, 2, 3, 4, 5], 2)
// [1, 2, 3]
```

</details>
<details>
<summary>&nbsp;&nbsp;shuffle</summary>

### **shuffle(arr: T[]): T[]**

Returns the provided array with the items randomly ordered
<br><br>
Example:

```
shuffle([1, 2, 3, 4, 5])
// [3, 5, 1, 4, 2]
```

</details>
<details>
<summary>&nbsp;&nbsp;chunkArray</summary>

### **chunkArray(arr: any[], n: number): any[][]**

Divides the provided array into smaller arrays of a provided size. Returns an array of these smaller arrays.
<br><br>
Example:

```
chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
// [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
```

</details>
<details>
<summary>&nbsp;&nbsp;clampArray</summary>

### **clampArray(arr: any[], min: number | null, max: number | null, fill?: any): any[]**

Returns the provided array with a minimum and/or maximum length limit enforced. If the minimum length is enforced, items with the value of the fill provided will be added.
<br><br>
Example:

```
clampArray([1, 2, 3, 4, 5], 3)
// [1, 2, 3]

clampArray([1, 2, 3], null, 5, "x")
// [1, 2, 3, "x", "x"]
```

</details>
<details>
<summary>&nbsp;&nbsp;getUnique</summary>

### **getUniqueItems<T>(arrs: T[][]): T[]**

Returns an array of items that only appear once across all items of the provided arrays.
<br><br>
Example:

```
getUnique([1, 2, 3],[3, 4, 5])
// [1, 2, 4, 5]
```

</details>
<details>
<summary>&nbsp;&nbsp;getCommon</summary>

### **getCommonItems<T>(arrs: T[][]): T[]**

Returns an array of items that appear at least twice across all items of the provided arrays.
<br><br>
Example:

```
getCommon([1, 2, 3, 4],[3, 4, 5])
// [3, 4]
```

</details>
<details>
<summary>&nbsp;&nbsp;areArraysEqual</summary>

### **areArraysEqual<T>(arrray1: T[], array2: T[], orderMatters: boolean): boolean**

Returns a boolean of whether or not the two arrays have the same items. orderMatters is true by default.
<br><br>
Example:

```
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

Returns the item in the array N spots from the last item
<br><br>
Example:

```
nthFromEnd([1, 2, 3, 4], 1)
// 3
```

</details>
<details>
<summary>&nbsp;&nbsp;bubbleSort</summary>

### **bubbleSort(arr: T[]): T[]**

Returns the provided array sorted (ascending) via bubble sort

</details>
<details>
<summary>&nbsp;&nbsp;selectionSort</summary>

### **selectionSort(arr: T[]): T[]**

Returns the provided array sorted (ascending) via selection sort

</details>
<details>
<summary>&nbsp;&nbsp;insertSort</summary>

### **insertSort(arr: T[]): T[]**

Returns the provided array sorted (ascending) via insert sort

</details>
<details>
<summary>&nbsp;&nbsp;removeDuplicates</summary>

### **removeDuplicates(arr: T[]): T[]**

Returns the provided array with duplicates removed
<br><br>
Example:

```
removeDuplicates([1, 2, 1, 1, 2, 5])
// [1, 2, 5]
```

</details>
<details>
<summary>&nbsp;&nbsp;sum</summary>

### **sum(arr: number[]): number**

Returns the sum of an array of numbers
<br><br>
Example:

```
sum([1, 2, 3, 4, 5])
// 15
```

</details>
<details>
<summary>&nbsp;&nbsp;getRollingSum</summary>

### **getRollingSum(arr: number[]): number[]**

Returns an array of the rolling sum of an array, i.e. [1,3,5] returns [1,4,9]
<br><br>
Example:

```
getRollingSum([1,3,5])
// [1, 4, 9]
```

</details>
<br>
</details>
<details>
<summary>Objects</summary><br>
<details>
<summary>&nbsp;&nbsp;sumOfKeyValues</summary>

### **sumOfKeyValues<T extends object, U extends keyof T>(arr: (T & { [K in U]: number })[],key: U): number**

Returns the sum of the values of a specific shared key in an array of objects
<br><br>
Example:

```
const arr = [{ a: 1 }, {a: 2}, {a: 3}]
sumOfKeyValues(arr, "a")
// 6
```

</details>
<details>
<summary>&nbsp;&nbsp;sortByKeyValue</summary>

### **sortObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U)**

Sort an array of objects by a specific shared key's value
<br><br>
Example:

```
const arr = [{ a: 3 }, {a: 1}, {a: 5}]
sortObjectsByKeyValue(arr, "a")
// [{a: 1}, { a: 3 }, {a: 5}]
```

</details>
<details>
<summary>&nbsp;&nbsp;getKeyValueCounts</summary>

### **getKeyValueCounts<T extends object, U extends keyof T>(arr: T[], key: U, isCaseSensitive?: boolean)**

Returns an object with counts of specifics value of a specific shared key in an array of objects
<br><br>
Example:

```
const arr = [{ suit: "Clubs" }, {suit: "Hearts"}, {suit: "Clubs"}]
getKeyValueCounts(arr, "suit")
// { "Clubs": 2, "Hearts": 1}
```

</details>
<details>
<summary>&nbsp;&nbsp;groupObjectsByKeyValue</summary>

### **groupObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U)**

Returns an object with arrays of objects that share a specific value of a specific shared key in an array of objects
<br><br>
Example:

```
const arr = [{ suit: "Clubs", value: 2 }, {suit: "Hearts", value: 5}, {suit: "Clubs", value: 10}]
groupObjectsByKeyValue(arr, "suit")
// {
    "Clubs": [{ suit: "Clubs" value: 2}, { suit: "Clubs", value: 10 }],
    "Hearts": [{ suit: "Hearts", value: 5 }]}
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

```
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

Returns a promise that rejects if the original promise takes longer to resolve than a given amount of time (ms)
<br><br>
Note: The promise rejects with the string "TIMED_OUT"
<br>

</details>
<details>
<summary>&nbsp;&nbsp;pause</summary>

### **pause(milliseconds: number): Promise<void>**

Returns a promise that resolves after a given amount of time (ms)
<br>

</details>
<details>
<summary>&nbsp;&nbsp;pipe</summary>

### pipe<T>(...funcs: [firstFunc: GenericFunction<T>,secondFunc: GenericFunction<T>,...otherFuncs: GenericFunction<T>[]]): Function

Returns a function that calls multiple given functions in a specific order
<br><br>
Example:

```
const double = (n: number) => n * 2
const triple = (n: number) => n * 3
const doubleThenTriple = pipe(double,triple)
doubleThenTriple(6)

// 36
```

</details>
<details>
<summary>&nbsp;&nbsp;debounce</summary>

### **debounce(func: Function, ms: number, immediate: boolean): Function**

Returns a debounced version of the function passed. Acccepts custom delay and immediate boolean for leading/trailing
<br>

</details>
<details>
<summary>&nbsp;&nbsp;saveTextToFileInBrowser</summary>

### **saveTextToFileInBrowser(content: string, filename: string)**

Prompts a user in their browser to save provided text to a file on their machine
<br>

</details>
<details>
<summary>&nbsp;&nbsp;setCookie</summary>

### **setCookie(cookieName: string, cookieValue: string, expirationInDays: number)**

Sets the vaue of a specific cookie
<br>

</details>
<details>
<summary>&nbsp;&nbsp;getCookie</summary>

### **getCookie(cookieName: string)**

Returns the value of a specific cookie
<br>

</details>
<details>
<summary>&nbsp;&nbsp;createQueue</summary>

### **createQueue(functionToExecute: Function): QueueObject**

Returns a **QueueObject** which includes a queue, enqueue function, and two execute methods.
<br>
<br>
**executeOne** will call the function on the first item in the queue and then remove that item from the queue.
**executeAll** will call the function every item in the queue and remove each item after execution.
<br><br>
Example:

```
type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: Function
}
```

```
const log = (n: any) => { console.log(n) }
const { queue, enqueue, executeOne, executeAll} = createQueue(log)

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
<summary>&nbsp;&nbsp;createAsyncQueue</summary>

### **createAsyncQueue(functionToExecute: Function): AsyncQueueObject**

Returns a **AsyncQueueObject** which includes a queue, enqueue function, and two execute methods.
<br>
<br>
**executeOne** will call the async function on the first item in the queue and then remove that item from the queue.
**executeAll** will call the async function on every item in the queue and remove each item after execution. The previous function's returned promise must resolve before the next iteration is invoked. If you wish to continue iterating even if a promise rejects, pass a true boolean into the function.
<br><br>
Example:

```
type QueueObject = {
  queue: unknown[]
  enqueue: Function
  executeOne: Function
  executeAll: (ignoreErrors = false) => unknown
}
```

```
const log = async (n: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(n)
      resolve(n)
    },2000)
  })

const { queue, enqueue, executeOne, executeAll} = createQueue(log)

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
