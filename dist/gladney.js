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
exports.getBrowserLocation = exports.createQueueAsync = exports.createQueue = exports.setCookie = exports.getCookie = exports.saveTextToFileInBrowser = exports.debounce = exports.pipe = exports.pauseSync = exports.pauseAsync = exports.addTimeoutToPromise = exports.convertQueryParamOperators = exports.createExpressRoutes = exports.groupObjectsByKeyValue = exports.getKeyValueCounts = exports.sortObjectsByKeyValue = exports.sumOfKeyValues = exports.pickKeys = exports.omitKeys = exports.areArraysEqual = exports.nthFromEnd = exports.getCommonItems = exports.getUniqueItems = exports.getRollingSum = exports.sum = exports.removeDuplicates = exports.insertionSort = exports.selectionSort = exports.bubbleSort = exports.flatten = exports.chunkArray = exports.clampArray = exports.shuffle = exports.isAny = exports.isEvery = exports.getRandomString = exports.truncate = exports.lowerCaseNoSpaces = exports.endOfToday = exports.beginningOfToday = exports.getDayName = exports.timeUntil = exports.getSecondsFromAmountOfTime = exports.getAmountOfTimeFromSeconds = exports.ordinal = exports.getRange = exports.doubleDigit = exports.clampNumber = exports.float = void 0;
function float(n, decimalPlaces) {
    return decimalPlaces ? Number(n.toFixed(decimalPlaces)) : n;
}
exports.float = float;
function clampNumber(n, min, max) {
    let result = n;
    if (min)
        result = n > min ? n : min;
    if (max)
        result = result < max ? result : max;
    return result;
}
exports.clampNumber = clampNumber;
function doubleDigit(n) {
    if (String(n).length > 2)
        return String(n);
    else
        return String(`0${n}`).slice(-2);
}
exports.doubleDigit = doubleDigit;
function getRange(start, end, step = 1) {
    const result = [];
    if (start < end && step > 0) {
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
    }
    else if (step < 0) {
        for (let i = start; i >= end; i += step) {
            result.push(i);
        }
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
const secondsInAMinute = 60;
const secondsInAnHour = 3600;
const secondsInADay = 86400;
const secondsInAWeek = 604800;
const secondsInAMonth = 2592000; // Assumes 30 day month
const secondsInAYear = 31557600;
function getAmountOfTimeFromSeconds(seconds) {
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
function getSecondsFromAmountOfTime(time) {
    return (time.years * secondsInAYear +
        time.months * secondsInAMonth +
        time.weeks * secondsInAWeek +
        time.days * secondsInADay +
        time.hours * secondsInAnHour +
        time.minutes * secondsInAMinute +
        time.seconds);
}
exports.getSecondsFromAmountOfTime = getSecondsFromAmountOfTime;
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
function isEvery(arr, func) {
    return arr.filter(func).length === arr.length;
}
exports.isEvery = isEvery;
function isAny(arr, func) {
    return arr.filter(func).length > 0;
}
exports.isAny = isAny;
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
function clampArray(arr, min, max, fill) {
    let result;
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
function chunkArray(arr, chunkSize) {
    const items = Array.from(arr);
    const result = [];
    while (items.length > 0) {
        result.push(items.splice(0, chunkSize));
    }
    return result;
}
exports.chunkArray = chunkArray;
function flatten(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(...flatten(arr[i]));
        }
        else
            result.push(arr[i]);
    }
    return result;
}
exports.flatten = flatten;
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
        ? [...acc, float(acc[acc.length - 1] + Number(i), decimalPlaces)]
        : [i], []);
}
exports.getRollingSum = getRollingSum;
function getUniqueItems(...arrs) {
    const seen = [];
    let result = [];
    for (let i = 0; i < arrs.length; i++) {
        arrs[i].forEach((j) => {
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
function getCommonItems(...arrs) {
    const seen = [];
    let result = [];
    for (let i = 0; i < arrs.length; i++) {
        arrs[i].forEach((j) => {
            if (seen.includes(j)) {
                result.push(j);
            }
            else {
                result = result.filter((x) => x !== j);
            }
            seen.push(j);
        });
    }
    return result;
}
exports.getCommonItems = getCommonItems;
function nthFromEnd(arr, n) {
    return arr[arr.length - 1 - n];
}
exports.nthFromEnd = nthFromEnd;
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
function sumOfKeyValues(arr, key) {
    return arr.reduce((acc, i) => acc + i[key], 0);
}
exports.sumOfKeyValues = sumOfKeyValues;
function sortObjectsByKeyValue(arr, key) {
    return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1));
}
exports.sortObjectsByKeyValue = sortObjectsByKeyValue;
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
function pauseAsync(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
}
exports.pauseAsync = pauseAsync;
function pauseSync(ms) {
    const start = Date.now();
    const end = start + ms;
    while (Date.now() < end) { }
}
exports.pauseSync = pauseSync;
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
                return getReturnObject();
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
function getBrowserLocation(timeoutInSeconds = 10) {
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
exports.getBrowserLocation = getBrowserLocation;
