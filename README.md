# gladknee 😄🦵

Gladknee is a TypeScript utility library that I created for personal projects but is open to use by anyone. Enjoy!

<details>
## <summary>Numbers</summary>

### **toFixedNumber(n: number, decimalPlaces: number)**

Returns a number limited to a specific numner of decimal places as a number (not a string)
<br><br>
Example:

```
toFixedNumber(4.24398, 3)
// 4.244
```

<br>
**clamp**<br>
Enforce a minimum and/or maximum limit on a number and returns the number or the enforced limit
<br><br>
toDoubleDigit
<br>
Convert single digit numbers to double digit, i.e. 9 returns "09"
<br><br>
ordinal | Return the ordinal form of a number, i.e. 4 returns "4th"
getRange | Returns an array of numbers from a provided starting point to a provided ending point
</details>
# DATES/TIMES

getAmountOfTimeFromSeconds | Returns years, months, weeks, days, hours, minutes, seconds
timeUntil | Returns the amount of time until a specific date
getDayName | Returns the human-readable weekday name from the numerical weekday provided
beginningOfToday | Returns a Date object with date of today and time of 00:00:00
endOfToday | Returns a Date object with date of today and time of 11:59:59
================================================================================================================================================
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
