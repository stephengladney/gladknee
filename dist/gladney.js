"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTextToFileInBrowser = exports.debounce = exports.pipe = exports.pauseSync = exports.pauseAsync = exports.addTimeoutToPromise = exports.convertQueryParamOperators = exports.createExpressRoutes = exports.convertObjectToQueryParams = exports.groupObjectsByKeyValue = exports.getKeyValueCounts = exports.sortObjectsByKeyValues = exports.sortObjectsByKeyValue = exports.sumOfKeyValue = exports.combineObjects = exports.pickKeys = exports.omitKeys = exports.areArraysEqual = exports.nthFromEnd = exports.getSharedItems = exports.getCommonItems = exports.getUniqueItems = exports.getCountOf = exports.getCounts = exports.getRollingSum = exports.removeDuplicates = exports.insertionSort = exports.selectionSort = exports.bubbleSort = exports.flatten = exports.chunkArray = exports.clampArray = exports.shuffle = exports.isAny = exports.isEvery = exports.getRandomString = exports.truncate = exports.lowerCaseNoSpaces = exports.endOfToday = exports.beginningOfToday = exports.getDayName = exports.timeSince = exports.timeUntil = exports.getAmountOfTimeFromSeconds = exports.ordinal = exports.getRange = exports.doubleDigit = exports.clampNumber = exports.sum = exports.float = void 0;
exports.getBrowserLocationQueryParams = exports.getBrowserGeolocation = exports.createQueueAsync = exports.createQueue = exports.setCookie = exports.getCookie = void 0;
/** Returns a number limited to a specific number of decimal places.
This is different from the native `toFixed()` method because it returns a number not a string.
*
* _Example:_
* ```typescript
* float(4.24398, 3) //=> 4.244
* ```
 **/
function float(n, decimalPlaces) {
    return decimalPlaces ? Number(n.toFixed(decimalPlaces)) : n;
}
exports.float = float;
/** Returns the sum of the provided numbers.
 *
 * Example:
 * ```typescript
 * sum(1, 4, 6) //=> 11
 * ```
 **/
function sum(...arr) {
    return arr.reduce((acc, i) => acc + i, 0);
}
exports.sum = sum;
/** Enforces a minimum and/or maximum limit on a number and returns the number or the enforced limit.
 You can pass **false** or **0** for a limit parameter to bypass that limit.
*
* _Example:_
* ```typescript
* clamp(15, 3, 12) //=> 12
* clamp(15, 16, 20) //=> 16
* ```
 **/
function clampNumber(n, min, max) {
    let result = n;
    if (min)
        result = n > min ? n : min;
    if (max)
        result = result < max ? result : max;
    return result;
}
exports.clampNumber = clampNumber;
/** Returns a provided single digit number with a leading zero as a string.
 *
 * _Example:_
 * ```typescript
 * doubleDigit(9) //=> "09"
 * ```
 **/
function doubleDigit(n) {
    if (String(n).length > 2)
        return String(n);
    else
        return String(`0${n}`).slice(-2);
}
exports.doubleDigit = doubleDigit;
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
function getRange(start, end, step = 1) {
    const result = [];
    if (start < end) {
        if (step <= 0)
            return;
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
    }
    else {
        if (step >= 0)
            return;
        for (let i = start; i >= end; i += step) {
            result.push(i);
        }
    }
    return result;
}
exports.getRange = getRange;
/** Returns a string of the provided number with the ordinal suffix added.
 *
 * _Example:_
 * ```typescript
 * ordinal(4) //=> "4th"
 * ```
 **/
function ordinal(n) {
    if (n >= 11 && n <= 13)
        return `${String(n)}th`;
    switch (String(n).slice(-1)) {
        case "1":
            return `${String(n)}st`;
        case "2":
            return `${String(n)}nd`;
        case "3":
            return `${String(n)}rd`;
        default:
            return `${String(n)}th`;
    }
}
exports.ordinal = ordinal;
const secondsInAMinute = 60;
const secondsInAnHour = 3600;
const secondsInADay = 86400;
const secondsInAWeek = 604800;
const secondsInAMonth = 2592000; // Assumes 30 day month
const secondsInAYear = 31557600;
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
function getAmountOfTimeFromSeconds(seconds) {
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
    };
}
exports.getAmountOfTimeFromSeconds = getAmountOfTimeFromSeconds;
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
function timeUntil(date) {
    const diffInSeconds = Math.floor((new Date(date).getTime() - Date.now()) / 1000);
    return getAmountOfTimeFromSeconds(diffInSeconds);
}
exports.timeUntil = timeUntil;
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
function timeSince(date) {
    const diffInSeconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    return getAmountOfTimeFromSeconds(diffInSeconds);
}
exports.timeSince = timeSince;
/** Returns the corresponding human readable day name of the integer (0-6) provided.
 *
 * Example:
 * ```typescript
 * getDayName(3) //=> "Wednesday"
 * ```
 **/
function getDayName(day) {
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return dayNames[day];
}
exports.getDayName = getDayName;
/** Returns a Date of the current date with a time of 0:00:00.
 **/
function beginningOfToday() {
    return new Date(new Date().toDateString());
}
exports.beginningOfToday = beginningOfToday;
/** Returns a Date of the current date with a time of 23:59:59.
 **/
function endOfToday() {
    const date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date;
}
exports.endOfToday = endOfToday;
// STRINGS
/** Returns the provided string in lowercase form with spaces removed.
 * *
 * Example:
 * ```typescript
 * lowerCaseNoSpaces("Hello World") //=> "helloworld"
 * ```
 **/
function lowerCaseNoSpaces(str) {
    return String(str).toLowerCase().replace(/ /g, "");
}
exports.lowerCaseNoSpaces = lowerCaseNoSpaces;
/** Returns a string limited to a max length with "..." or custom ending.
 *
 * Example:
 * ```typescript
 * truncate("Hello World!", 4) //=> "Hell..."

truncate("Hello World!", 4, "/") //=> "Hell/"
 * ```
 **/
function truncate(str, lengthlevels, ending = "...") {
    return str.length > lengthlevels
        ? `${str.substring(0, lengthlevels)}${ending}`
        : str;
}
exports.truncate = truncate;
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
function getRandomString(length, includeLetters = true, includeNumbers = true) {
    const chars = includeLetters
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        : "" + includeNumbers
            ? "0123456789"
            : "";
    let randomString = "";
    for (let i = 1; i <= length; i++) {
        randomString += chars[Math.floor(Math.random() * chars.length)];
    }
    return randomString;
}
exports.getRandomString = getRandomString;
// ARRAYS
/** Returns a boolean that reflects whether or not every item in an array meets a condition.
 *
 * Example:
 * ```typescript
 const isEven = (n: number) => n % 2 === 0

isEvery([2, 4, 6, 8], (n) => isEven(n)) //=> true

isEvery([2, 4, 7, 8], (n) => isEven(n)) //=> false
 * ```
 **/
function isEvery(arr, func) {
    return arr.filter(func).length === arr.length;
}
exports.isEvery = isEvery;
/** Returns a boolean that reflects whether or not any item in an array meets a condition.
 *
 * Example:
 * ```typescript
 const isEven = (n: number) => n % 2 === 0

isAny([3, 5, 7, 9], (n) => isEven(n)) //=> false

isAny([2, 5, 7, 9], (n) => isEven(n)) //=> true
 * ```
 **/
function isAny(arr, func) {
    return arr.filter(func).length > 0;
}
exports.isAny = isAny;
/** Returns the provided array with the items randomly ordered.
 *
 * Example:
 * ```typescript
 shuffle([1, 2, 3, 4, 5]) //=> [3, 5, 1, 4, 2]
 * ```
 **/
function shuffle(array) {
    const _array = [...array];
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [_array[currentIndex], _array[randomIndex]] = [
            _array[randomIndex],
            _array[currentIndex],
        ];
    }
    return _array;
}
exports.shuffle = shuffle;
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
function clampArray(arr, min, max, fill) {
    let result = [];
    if (min && arr.length < min) {
        result = [...arr];
        const diff = min - arr.length;
        for (let i = 1; i <= diff; i++) {
            result.push(fill);
        }
    }
    if (max && arr.length > max)
        result = arr.slice(0, max);
    return result;
}
exports.clampArray = clampArray;
/** Divides the provided array into smaller arrays of a provided size. Returns an array of these smaller arrays.
 *
 * Example:
 * ```typescript
 *chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
//=> [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * ```
 **/
function chunkArray(arr, chunkSize) {
    const items = Array.from(arr);
    const result = [];
    while (items.length > 0) {
        result.push(items.splice(0, chunkSize));
    }
    return result;
}
exports.chunkArray = chunkArray;
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
function flatten(arr, levels = 0, currentLevel = 0) {
    return arr.reduce((acc, item) => {
        if (Array.isArray(item) && (!levels || currentLevel < levels)) {
            return [...acc, ...flatten(item, levels, currentLevel + 1)];
        }
        else
            return [...acc, item];
    }, []);
}
exports.flatten = flatten;
/** Returns the provided array sorted (ascending) via bubble sort.
 **/
function bubbleSort(arr) {
    let noSwaps;
    for (var i = arr.length; i > 0; i--) {
        noSwaps = true;
        for (var j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                noSwaps = false;
            }
        }
        if (noSwaps)
            break;
    }
    return arr;
}
exports.bubbleSort = bubbleSort;
/** Returns the provided array sorted (ascending) via selection sort.
 **/
function selectionSort(arr) {
    const swap = (arr, idx1, idx2) => ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
    for (let i = 0; i < arr.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[lowest] > arr[j]) {
                lowest = j;
            }
        }
        if (i !== lowest)
            swap(arr, i, lowest);
    }
    return arr;
}
exports.selectionSort = selectionSort;
/** Returns the provided array sorted (ascending) via insertion sort.
 **/
function insertionSort(arr) {
    var currentVal;
    for (var i = 1; i < arr.length; i++) {
        currentVal = arr[i];
        for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = currentVal;
    }
    return arr;
}
exports.insertionSort = insertionSort;
/** Returns the provided array with any duplicates removed.
 *
 * Example:
 * ```typescript
 * removeDuplicates([1, 2, 3, 3, 4, 4, 5]) //=> [1, 2, 3, 4, 5]
 * ```
 **/
function removeDuplicates(arr) {
    return Array.from(new Set(arr));
}
exports.removeDuplicates = removeDuplicates;
/** Returns an array of the rolling sum of the provided array of numbers.
 **/
function getRollingSum(arr, decimalPlaces) {
    return arr.reduce((acc, i, index) => index > 0
        ? [...acc, float(acc[acc.length - 1] + Number(i), decimalPlaces)]
        : [i], []);
}
exports.getRollingSum = getRollingSum;
/** Returns an object with items from the provided array as keys and values of the number of
 * instances of these values in the array.
 **/
function getCounts(arr) {
    const result = {};
    arr.forEach((item) => {
        if (result[item])
            result[item]++;
        else
            result[item] = 1;
    });
    return result;
}
exports.getCounts = getCounts;
/** Returns the number of instances the target occurs in the provided array.
 *
 * Example:
 * ```typescript
 * const arr = [1, 2, 3, 3, 4, 4, 4, 5]
 * getCount(arr, 4) //=> 3
 * ```
 **/
function getCountOf(arr, target) {
    return getCounts(arr)[target] || 0;
}
exports.getCountOf = getCountOf;
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
function getUniqueItems(...arrs) {
    const seen = [];
    let result = [];
    const sets = arrs.map((arr) => new Set(arr));
    for (let i = 0; i < sets.length; i++) {
        sets[i].forEach((j) => {
            if (seen.includes(j)) {
                result = result.filter((x) => x !== j);
            }
            else {
                seen.push(j);
                result.push(j);
            }
        });
    }
    return result;
}
exports.getUniqueItems = getUniqueItems;
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
function getCommonItems(...arrs) {
    const seen = [];
    let result = [];
    for (let i = 0; i < arrs.length; i++) {
        arrs[i].forEach((j) => {
            if (seen.includes(j) && !result.includes(j)) {
                result.push(j);
            }
            seen.push(j);
        });
    }
    return result;
}
exports.getCommonItems = getCommonItems;
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
function getSharedItems(...arrs) {
    let result = [];
    arrs[0].forEach((item) => {
        let isItemInAllOtherArrays = true;
        arrs.slice(1).forEach((compareArray) => {
            if (!compareArray.includes(item))
                isItemInAllOtherArrays = false;
        });
        if (isItemInAllOtherArrays)
            result.push(item);
    });
    return result;
}
exports.getSharedItems = getSharedItems;
/** Returns the item in the array N spots from the last item.
 *
 * Example:
 * ```typescript
 * nthFromEnd([1, 2, 3, 4, 5], 2) //=> 3
 * ```
 **/
function nthFromEnd(arr, n) {
    return arr[arr.length - 1 - n];
}
exports.nthFromEnd = nthFromEnd;
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
function areArraysEqual(array1, array2, orderMatters = true) {
    const _array1 = orderMatters ? array1 : [...array1].sort();
    const _array2 = orderMatters ? array2 : [...array2].sort();
    for (let i = 0; i < array1.length; i++) {
        if (_array1[i] !== _array2[i])
            return false;
    }
    return true;
}
exports.areArraysEqual = areArraysEqual;
// OBJECTS
/** Returns the object with any provided keys removed.
 *
 * Example:
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * omitKeys(obj, "b") //=> { a: 1, c: 3 }
 * ```
 **/
function omitKeys(obj, ...keys) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (!keys.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.omitKeys = omitKeys;
/** Returns the object with only the provided keys included.
 *
 * Example:
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * pickKeys(obj, "a", "c") //=> { a: 1, c: 3 }
 * ```
 **/
function pickKeys(obj, ...keys) {
    const result = {};
    const keysAsStrings = keys.map((k) => k);
    Object.keys(obj).forEach((key) => {
        if (keysAsStrings.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.pickKeys = pickKeys;
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
function combineObjects(objs) {
    const result = {};
    objs.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
            result[key] = obj[key];
        });
    });
    return result;
}
exports.combineObjects = combineObjects;
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
function sumOfKeyValue(arr, key) {
    return arr.reduce((acc, i) => acc + i[key], 0);
}
exports.sumOfKeyValue = sumOfKeyValue;
/** Sorts an array of objects by a specific shared key's value.
 *
 * Example:
 * ```typescript
 * const obj1 = { a: 3, b: 2 }
 * const obj2 = { a: 1, b: 2 }
 * const obj3 = { a: 2, b: 2 }
 *
 * sortObjectsByKeyValue([obj1, obj2, obj3], "a")
 * //=>
 *     [
 *       { a: 1, b: 2 },
 *       { a: 2, b: 2 },
 *       { a: 3, b: 2 },
 *     ]
 * ```
 **/
function sortObjectsByKeyValue(arr, key) {
    return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1));
}
exports.sortObjectsByKeyValue = sortObjectsByKeyValue;
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
 * sortObjectsByKeyValues([obj1, obj2, obj3, obj4, obj5], "a","b", "c")
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
function sortObjectsByKeyValues(objs, ...keys) {
    if (keys.length === 1)
        return sortObjectsByKeyValue(objs, keys[0]);
    const groupedByKey = groupObjectsByKeyValue(objs, keys[0]);
    const sortedKeyValues = Object.keys(groupedByKey).sort();
    return sortedKeyValues.reduce((acc, keyVal) => [
        ...acc,
        ...sortObjectsByKeyValues(groupedByKey[keyVal], ...keys.slice(1)),
    ], []);
}
exports.sortObjectsByKeyValues = sortObjectsByKeyValues;
/** Returns an object with counts of specifics value of a specific shared key in an array of objects.
 *
 * Example:
 * ```typescript
 * const arr = [{ name: "John"}, { name: "Sarah"}, { name: "John"}, { name: "Beth"}]
 *
 * getKeyValueCounts(arr, "name") //=> { John: 2, Sarah: 1, Beth: 1 }
 * ```
 **/
function getKeyValueCounts(arr, key, isCaseSensitive) {
    return arr.reduce((result, obj) => {
        const value = isCaseSensitive
            ? obj[key]
            : obj[key].toLowerCase();
        if (result[value] > 0) {
            result[value] = result[value] + 1;
            return result;
        }
        else {
            result[value] = 1;
            return result;
        }
    }, {});
}
exports.getKeyValueCounts = getKeyValueCounts;
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
 * groupObjectsByKeyValue(arr, "name")
 * //=>
 *      {
 *        John: [{ name: "John", age: 30 }, {name: "John", age: 28 }]
 *         Sarah: [{ name: "Sarah", age: 32 }]
 *        Beth: [{name: "Beth", age: 23 }]
 *      }
 * ```
 **/
function groupObjectsByKeyValue(arr, key) {
    const result = {};
    arr.forEach((obj) => {
        const keyValue = obj[key];
        if (result[keyValue])
            result[keyValue].push(obj);
        else
            result[keyValue] = [obj];
    });
    return result;
}
exports.groupObjectsByKeyValue = groupObjectsByKeyValue;
/** Returns a string of an object's key and value pairs as a query parameter string. Supports one level of nesting.
 *
 * Example:
 * ```typescript
 * convertObjectToQueryParams({ age: 30, city: "Atlanta" }) //=> "age=38&city=Atlanta"
 * ```
 **/
function convertObjectToQueryParams(obj) {
    let result = "";
    const objectKeys = Object.keys(obj);
    objectKeys.forEach((key, i) => {
        const keyValue = obj[key];
        if (typeof keyValue !== "object") {
            result += `${key}=${keyValue}` + (i < objectKeys.length - 1 ? "&" : "");
        }
        else {
            Object.keys(keyValue).forEach((key2, i2) => {
                const keyValue2 = keyValue[key2];
                result += `${key}[${key2}]=${keyValue2}`;
            });
        }
    });
    return result;
}
exports.convertObjectToQueryParams = convertObjectToQueryParams;
/** Returns an Express Router with CRUD routes
 **/
function createExpressRoutes(handlers) {
    // @ts-ignore Must be ignored for non-Express projects
    let router = express.Router();
    if (handlers.index)
        router.get("", handlers.index);
    if (handlers.show)
        router.get("/:id", handlers.show);
    if (handlers.create)
        router.post("", handlers.create);
    if (handlers.update)
        router.put("/:id", handlers.update);
    if (handlers.deleteFn)
        router.delete("/:id", handlers.deleteFn);
    if (handlers.extendRouter)
        handlers.extendRouter(router);
    return router;
}
exports.createExpressRoutes = createExpressRoutes;
// SEQUELIZE
function convertQueryParamOperators(params) {
    const output = {};
    for (let param in params) {
        const paramString = String(param);
        const operator = paramString.substring(paramString.length - 1);
        const paramStringWithoutOperator = paramString.substring(0, paramString.length - 1);
        switch (operator) {
            case "!":
                // @ts-ignore Must be ignored for non-Sequelize projects
                output[paramStringWithoutOperator] = { [Op.ne]: params[param] };
                break;
            default:
                // @ts-ignore
                output[paramString] = params[param];
        }
    }
    return output;
}
exports.convertQueryParamOperators = convertQueryParamOperators;
// MISC
/** Returns a promise that rejects if the original promise takes longer to resolve than the provided amount of time
 * in milliseconds.
 **/
function addTimeoutToPromise(asyncFunction, timeout) {
    return () => new Promise((resolve, reject) => {
        let timer;
        asyncFunction().then((result) => {
            clearTimeout(timer);
            resolve(result);
        });
        timer = setTimeout(() => {
            reject("TIMED_OUT");
        }, timeout);
    });
}
exports.addTimeoutToPromise = addTimeoutToPromise;
/** Returns a promise that resolves after a given amount of time in milliseconds.
 **/
function pauseAsync(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
}
exports.pauseAsync = pauseAsync;
/** Delays future code from executing until the provided milliseconds have passed.
 **/
function pauseSync(ms) {
    const start = Date.now();
    const end = start + ms;
    while (Date.now() < end) { }
}
exports.pauseSync = pauseSync;
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
function pipe(...funcs) {
    return (...args) => {
        return funcs.reduce((acc, current) => current(acc), args[0]);
    };
}
exports.pipe = pipe;
/** Returns a debounced version of the function passed. Acccepts custom delay in
 * milliseconds and immediate boolean for leading/trailing.
 *
 * * If `immediate` is `true`, the function will execute immediately on the first call. The function
 * will not execute if called again until the provided milliseconds have passed.
 * * If `immediate` is `false`, the function will not execute until the provided milliseconds have passed. If the
 * function is called again before the time has passed, the timer starts over.
 **/
function debounce(func, ms, immediate) {
    let wait;
    let isWaiting = false;
    const getReturnObject = (args) => ({
        clear: () => {
            clearTimeout(wait);
            isWaiting = false;
        },
        flush: () => {
            clearTimeout(wait);
            isWaiting = false;
            func(...args);
        },
    });
    if (immediate) {
        return (...args) => {
            if (isWaiting)
                return getReturnObject(args);
            else {
                isWaiting = true;
                wait = setTimeout(() => (isWaiting = false), ms);
                func(...args);
            }
            return getReturnObject(args);
        };
    }
    else {
        return (...args) => {
            if (isWaiting)
                clearTimeout(wait);
            isWaiting = true;
            wait = setTimeout(() => {
                isWaiting = false;
                func(...args);
            }, ms);
            return getReturnObject(args);
        };
    }
}
exports.debounce = debounce;
// BROWSER STUFF
/** Prompts a user in their browser to save provided text to a file on their machine.
 **/
function saveTextToFileInBrowser(content, filename) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}
exports.saveTextToFileInBrowser = saveTextToFileInBrowser;
/** Returns the value of a specific cookie.
 **/
function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
exports.getCookie = getCookie;
/** Sets the value of a specific cookie.
 **/
function setCookie(cookieName, cookieValue, expirationInDays) {
    const d = new Date();
    d.setTime(d.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";";
}
exports.setCookie = setCookie;
/** Returns a `QueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
function createQueue(functionToExecute) {
    const queue = [];
    let isBreakRequested = false;
    const executeOne = () => {
        if (Array.isArray(queue[0]))
            functionToExecute(...queue[0]);
        else
            functionToExecute(queue[0]);
        queue.shift();
    };
    const executeAll = () => {
        if (isBreakRequested)
            return;
        if (Array.isArray(queue[0]))
            functionToExecute(...queue[0]);
        else
            functionToExecute(queue[0]);
        queue.shift();
        if (queue.length > 0)
            executeAll();
    };
    return {
        queue,
        enqueue: (...args) => queue.push(args),
        executeOne,
        executeAll,
        breakOut: () => {
            isBreakRequested = true;
        },
    };
}
exports.createQueue = createQueue;
/** Returns an `AsyncQueueObject` which includes a queue, enqueue function, and two execute methods.
 **/
function createQueueAsync(functionToExecute) {
    const queue = [];
    let isBreakRequested = false;
    const executeOne = () => __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(queue[0]))
            yield functionToExecute(...queue[0]);
        else
            yield functionToExecute(queue[0]);
        queue.shift();
    });
    const executeAll = (ignoreErrors = false) => __awaiter(this, void 0, void 0, function* () {
        if (isBreakRequested)
            return;
        try {
            if (Array.isArray(queue[0]))
                yield functionToExecute(...queue[0]);
            else
                yield functionToExecute(queue[0]);
            queue.shift();
            if (queue.length > 0)
                executeAll(ignoreErrors);
        }
        catch (_a) {
            if (ignoreErrors) {
                queue.shift();
                if (queue.length > 0)
                    executeAll(true);
            }
        }
    });
    return {
        breakOut: () => {
            isBreakRequested = true;
        },
        queue,
        enqueue: (...args) => queue.push(args),
        executeOne,
        executeAll,
    };
}
exports.createQueueAsync = createQueueAsync;
/** Returns the user's latitude and longitude or an error.
 *
 * Example:
 * ```typescript
 * getBrowserGeolocation() //=> { latitude: 35.7402404, longitude: -82.3420191 }
 * ```
 **/
function getBrowserGeolocation(timeoutInSeconds = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        let browserLocation = { latitude: null, longitude: null };
        let err = null;
        let pauseCount = 0;
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            browserLocation.latitude = coords.latitude;
            browserLocation.longitude = coords.longitude;
        }, () => {
            err = "Unable to get location";
        });
        while (browserLocation.latitude === null && err === null) {
            yield pauseAsync(500);
            pauseCount++;
            if (pauseCount === timeoutInSeconds * 2)
                err = "TIMED_OUT";
        }
        if (err)
            throw err;
        else
            return browserLocation;
    });
}
exports.getBrowserGeolocation = getBrowserGeolocation;
/** Returns the window location's search params. Supports single-level nesting.
 **/
function getBrowserLocationQueryParams() {
    const params = window.location.search.slice(1).split("&");
    return params.reduce((acc, param) => {
        const paramSplit = param.split("=");
        const [key, value] = paramSplit;
        const objectRegEx = /(.+)\[(.+)\]/;
        if (objectRegEx.test(key)) {
            const [_, parentKey, childKey] = objectRegEx.exec(key);
            return Object.assign(Object.assign({}, acc), { [parentKey]: { [childKey]: value } });
        }
        else
            return Object.assign(Object.assign({}, acc), { [key]: value });
    }, {});
}
exports.getBrowserLocationQueryParams = getBrowserLocationQueryParams;
