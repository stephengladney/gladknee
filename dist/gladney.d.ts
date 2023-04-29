export declare function toFixedNumber(n: number, decimalPlaces?: number): number;
export declare function clamp(n: number, min: number | null, max: number | null): number;
export declare function toDoubleDigit(n: number): string | number;
export declare function getRange(start: number, end: number): number[];
export declare function ordinal(n: number): string;
interface TimeOutput {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export declare function getAmountOfTimeFromSeconds(seconds: number): TimeOutput;
export declare function timeUntil(date: Date): TimeOutput;
export declare function getDayName(day: number): string;
export declare function beginningOfToday(): Date;
export declare function endOfToday(): Date;
export declare function lowerCaseNoSpaces(str: string): string;
export declare function truncate(str: string, lengthLimit: number, ending?: string): string;
export declare function getRandomString(length: number, includeLetters?: boolean, includeNumbers?: boolean): string;
export declare function drop(arr: any[], n: number): any[];
export declare function shuffle(array: any[]): any[];
type SortableArray = (string | number)[];
export declare function bubbleSort(arr: SortableArray): SortableArray;
export declare function selectionSort(arr: SortableArray): SortableArray;
export declare function insertionSort(arr: SortableArray): SortableArray;
export declare function removeDuplicates(arr: any[]): any[];
export declare function sum(arr: number[]): number;
export declare function getRollingSum(arr: number[], decimalPlaces: number): number[];
export declare function getSumOfKeyValues<T extends object, U extends keyof T>(arr: (T & {
    [K in U]: number;
})[], key: U): number;
export declare function sortObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U): T[];
export declare function getKeyValueCounts<T extends object, U extends keyof T>(arr: T[], key: U, isCaseSensitive?: boolean): {
    [key: string]: number;
};
export declare function groupObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U): {
    [key: string]: T[];
};
export declare function convertQueryParamOperators(params: {}): {};
export declare function addTimeoutToPromise(asyncFunction: () => Promise<unknown>, timeout: number): () => Promise<unknown>;
export declare function pause(milliseconds: number): Promise<unknown>;
type GenericFunction<T> = (...args: T[]) => unknown;
export declare function pipe<T>(...funcs: [
    firstFunc: GenericFunction<T>,
    secondFunc: GenericFunction<T>,
    ...otherFuncs: GenericFunction<T>[]
]): (...args: T[]) => unknown;
export declare function debounce(func: Function, ms: number, immediate: boolean): (...args: unknown[]) => {
    clear: () => void;
    flush: () => void;
} | undefined;
export declare function saveTextToFileInBrowser(content: string, filename: string): void;
export declare function getCookie(cookieName: string): string;
export declare function setCookie(cookieName: string, cookieValue: string, expirationInDays: number): void;
export {};
