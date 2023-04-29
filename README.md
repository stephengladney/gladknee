# gladknee 😄🦵

Gladknee is a TypeScript utility library that I created for personal projects but is open to use by anyone. Enjoy!

<details>
<summary>Numbers</summary><br>

<details>
<summary>&nbsp;&nbsp;toFixedNumber</summary>

### **toFixedNumber(n: number, decimalPlaces: number): number**

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

Returns a provided single digit number with a leading zero
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

Returns the numeric ordinal name of a provided number
<br><br>
Example:

```
ordinal(4)
// "4th"
```

</details>
<details>
<summary>&nbsp;&nbsp;getRange</summary>

### **getRange(start: number, end: number)**

Returns an array of numbers, starting from the provided start number and ending with provided end number
<br><br>
Example:

```
getRange(5,10)
// [5, 6, 7, 8, 9, 10]
```

</details>

<details>
<summary>Dates & Time</summary><br>
<details>
<summary>getAmountOfTimeFromSeconds</summary>
Returns years, months, weeks, days, hours, minutes, seconds
</details>
<details><summary>timeUntil</summary>
Returns the amount of time until a specific date</details>
<details><summary>getDayName</summary>
Returns the human-readable weekday name from the numerical weekday provided
</details>
<details>
<summary>beginningOfToday</summary>
Returns a Date object with date of today and time of 00:00:00
</details>
endOfToday | Returns a Date object with date of today and time of 11:59:59

</details>
STRINGS
================================================================================================================================================
lowerCaseNoSpaces | Returns a string in lowercase form with spaces removed
truncate | Returns a string limited to a max length with ... or custom ending
getRandomString | Returns a random string of specified length. Can include letters and/or numbers
================================================================================================================================================
ARRAYS
================================================================================================================================================
drop | Returns the provided array with n items removed from the end, where n is a provided integer
shuffle | Returns the provided array with the items randomly ordered
bubbleSort | Sorts an array via the bubble sort method
selectionSort | Sorts an array via the selection sort method
insertionSort | Sorts an array via the insertion sort method
removeDuplicates | Removes duplicates from an array
sum | Returns the sum of an array of numbers
getRollingSum | Returns an array of the rolling sum of an array, i.e. [1,3,5] returns [1,4,9]
================================================================================================================================================
OBJECTS
================================================================================================================================================
getSumOfKeyValues | Returns the sum of the values of a specific shared key in an array of objects
sortObjectsByKeyValue | Sort an array of objects by a specific shared key's value
getKeyValueCounts | Returns an object with counts of a specific value of a specific shared key in an array of objects
groupObjectsByKeyValue | Returns an object with arrays of objects that share a specific value of a specific shared key in an array of objects
================================================================================================================================================
MISC
================================================================================================================================================
addTimeoutToPromise | Returns a promise that rejects if the original promise takes longer to resolve than a given amount of time (ms)
debounce | Returns a debounced version of the function passed. Acccepts custom delay and immediate boolean for leading/trailing
pause | Returns a promise that resolves after a given amount of time (ms)
pipe | Returns a function that calls multiple given functions in a specific order
saveTextToFileInBrowser | Prompts a user in their browser to save provided text to a file on their machine
getCookie | Returns the value of a specific cookie
setCookie | Sets the vaue of a specific cookie
\*/
