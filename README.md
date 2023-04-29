# gladknee 😄🦵

Gladknee is a TypeScript utility library that I created for personal projects but is open to use by anyone. Enjoy!

<details>
<summary>Numbers</summary><br>
<details>
<summary>&nbsp;&nbsp;toFixedNumber</summary>

### **float(n: number, decimalPlaces?: number): number**

Returns a number limited to a specific numner of decimal places as a number (not a string)
<br><br>
Example:

```
toFixedNumber(4.24398, 3)
// 4.244
```

</details>
<details>
<summary>&nbsp;&nbsp;clamp</summary>

### **clamp(n: number, min: number: max: number): number**

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

### **getRange(start: number, end: number) : number[]**

Returns an array of numbers, starting from the provided start number and ending with provided end number
<br><br>
Example:

```
getRange(5,10)
// [5, 6, 7, 8, 9, 10]
```

</details>
<br>
</details>
<details>
<summary>Dates & Time</summary><br>
<details>
<summary>&nbsp;&nbsp;getAmountOfTimeFromSeconds</summary>

### **getAmountOfTimeFromSeconds(seconds: number): TimeOutput**

Returns an object with calculated years, months, weeks, days, hours, minutes and seconds from seconds provided
<br><br>

```
interface TimeOutput {
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
</details>
<details>
<summary>Arrays</summary><br>
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

</details>

# OBJECTS

# groupObjectsByKeyValue |

# MISC

addTimeoutToPromise | Returns a promise that rejects if the original promise takes longer to resolve than a given amount of time (ms)
debounce | Returns a debounced version of the function passed. Acccepts custom delay and immediate boolean for leading/trailing
pause | Returns a promise that resolves after a given amount of time (ms)
pipe | Returns a function that calls multiple given functions in a specific order
saveTextToFileInBrowser | Prompts a user in their browser to save provided text to a file on their machine
getCookie | Returns the value of a specific cookie
setCookie | Sets the vaue of a specific cookie
\*/
