"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = exports.getCookie = exports.saveTextToFileInBrowser = exports.debounce = exports.pipe = exports.pause = exports.addTimeoutToPromise = exports.convertQueryParamOperators = exports.groupObjectsByKeyValue = exports.getKeyValueCounts = exports.sortObjectsByKeyValue = exports.getSumOfKeyValues = exports.getRollingSum = exports.sum = exports.removeDuplicates = exports.insertionSort = exports.selectionSort = exports.bubbleSort = exports.shuffle = exports.drop = exports.getRandomString = exports.truncate = exports.lowerCaseNoSpaces = exports.endOfToday = exports.beginningOfToday = exports.getDayName = exports.timeUntil = exports.getAmountOfTimeFromSeconds = exports.ordinal = exports.getRange = exports.toDoubleDigit = exports.clamp = exports.toFixedNumber = void 0;
function toFixedNumber(n, decimalPlaces) {
    return decimalPlaces ? Number(n.toFixed(decimalPlaces)) : n;
}
exports.toFixedNumber = toFixedNumber;
function clamp(n, min, max) {
    let result = n;
    if (min)
        result = n > min ? n : min;
    if (max)
        result = result < max ? result : max;
    return result;
}
exports.clamp = clamp;
function toDoubleDigit(n) {
    if (String(n).length > 2)
        return n;
    else
        return String(`0${n}`).slice(-2);
}
exports.toDoubleDigit = toDoubleDigit;
function getRange(start, end) {
    const result = [start];
    for (let i = start + 1; i <= end; i++) {
        result.push(i);
    }
    return result;
}
exports.getRange = getRange;
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
function getAmountOfTimeFromSeconds(seconds) {
    const secondsInAMinute = 60;
    const secondsInAnHour = 3600;
    const secondsInADay = 86400;
    const secondsInAWeek = 604800;
    const secondsInAMonth = 2592000; // Assumes 30 day month
    const secondsInAYear = 31557600;
    return {
        years: Math.floor(seconds / secondsInAYear),
        months: Math.floor((seconds % secondsInAYear) / secondsInAMonth),
        weeks: Math.floor((seconds % secondsInAMonth) / secondsInAWeek),
        days: Math.floor((seconds % secondsInAWeek) / secondsInADay),
        hours: Math.floor((seconds % secondsInADay) / secondsInAnHour),
        minutes: Math.floor((seconds % secondsInAnHour) / secondsInAMinute),
        seconds: seconds % secondsInAMinute,
    };
}
exports.getAmountOfTimeFromSeconds = getAmountOfTimeFromSeconds;
function timeUntil(date) {
    const diffInSeconds = Math.floor((new Date(date).getTime() - Date.now()) / 1000);
    return getAmountOfTimeFromSeconds(diffInSeconds);
}
exports.timeUntil = timeUntil;
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
function beginningOfToday() {
    return new Date(new Date().toDateString());
}
exports.beginningOfToday = beginningOfToday;
function endOfToday() {
    const date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date;
}
exports.endOfToday = endOfToday;
// STRINGS
function lowerCaseNoSpaces(str) {
    return String(str).toLowerCase().replace(/ /g, "");
}
exports.lowerCaseNoSpaces = lowerCaseNoSpaces;
function truncate(str, lengthLimit, ending = "...") {
    return str.length > lengthLimit
        ? `${str.substring(0, lengthLimit)}${ending}`
        : str;
}
exports.truncate = truncate;
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
function drop(arr, n) {
    return arr.slice(0, arr.length - n);
}
exports.drop = drop;
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
exports.shuffle = shuffle;
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
function removeDuplicates(arr) {
    return Array.from(new Set(arr));
}
exports.removeDuplicates = removeDuplicates;
function sum(arr) {
    return arr.reduce((acc, i) => acc + i, 0);
}
exports.sum = sum;
function getRollingSum(arr, decimalPlaces) {
    return arr.reduce((acc, i, index) => index > 0
        ? [
            ...acc,
            toFixedNumber(acc[acc.length - 1] + Number(i), decimalPlaces),
        ]
        : [i], []);
}
exports.getRollingSum = getRollingSum;
// OBJECTS
function getSumOfKeyValues(arr, key) {
    return arr.reduce((acc, i) => acc + i[key], 0);
}
exports.getSumOfKeyValues = getSumOfKeyValues;
function sortObjectsByKeyValue(arr, key) {
    return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1));
}
exports.sortObjectsByKeyValue = sortObjectsByKeyValue;
function getKeyValueCounts(arr, key, isCaseSensitive) {
    return arr.reduce((result, obj) => {
        const value = isCaseSensitive
            ? obj[key]
            : lowerCaseNoSpaces(obj[key]);
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
// EXPRESS
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
function addTimeoutToPromise(asyncFunction, timeout) {
    return () => new Promise((resolve, reject) => {
        asyncFunction().then((result) => resolve(result));
        setTimeout(() => {
            reject("TIMED_OUT");
        }, timeout);
    });
}
exports.addTimeoutToPromise = addTimeoutToPromise;
function pause(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
}
exports.pause = pause;
function pipe(...funcs) {
    return (...args) => {
        return funcs.reduce((acc, current) => current(acc), args[0]);
    };
}
exports.pipe = pipe;
function debounce(func, ms, immediate) {
    let wait;
    let isWaiting = false;
    const getReturnObject = (...args) => ({
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
                return;
            else {
                isWaiting = true;
                wait = setTimeout(() => (isWaiting = false), ms);
                func(...args);
            }
            return getReturnObject();
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
            return getReturnObject();
        };
    }
}
exports.debounce = debounce;
// BROWSER STUFF
function saveTextToFileInBrowser(content, filename) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}
exports.saveTextToFileInBrowser = saveTextToFileInBrowser;
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
function setCookie(cookieName, cookieValue, expirationInDays) {
    const d = new Date();
    d.setTime(d.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";";
}
exports.setCookie = setCookie;
