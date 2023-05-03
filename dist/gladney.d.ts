import type { Router } from "express";
export declare function float(n: number, decimalPlaces?: number): number;
export declare function clampNumber(n: number, min: number | null, max?: number | null): number;
export declare function doubleDigit(n: number): string;
export declare function getRange(start: number, end: number, step?: number): number[] | undefined;
export declare function ordinal(n: number): string;
export interface TimeObject {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export declare function getAmountOfTimeFromSeconds(seconds: number): TimeObject;
export declare function getSecondsFromAmountOfTime(time: TimeObject): number;
export declare function timeUntil(date: Date): TimeObject;
export declare function timeSince(date: Date): TimeObject;
export declare function getDayName(day: number): string;
export declare function beginningOfToday(): Date;
export declare function endOfToday(): Date;
export declare function lowerCaseNoSpaces(str: string): string;
export declare function truncate(str: string, lengthLimit: number, ending?: string): string;
export declare function getRandomString(length: number, includeLetters?: boolean, includeNumbers?: boolean): string;
export declare function isEvery<T>(arr: T[], func: (i: T, index?: number) => boolean): boolean;
export declare function isAny<T>(arr: T[], func: (i: T, index?: number) => boolean): boolean;
export declare function shuffle(array: any[]): any[];
export declare function clampArray(arr: any[], min: number | null, max: number | null, fill?: any): any[] | undefined;
export declare function chunkArray(arr: any[], chunkSize: number): any[][];
export declare function flatten(arr: any[]): any[];
type SortableArray = (string | number)[];
export declare function bubbleSort(arr: SortableArray): SortableArray;
export declare function selectionSort(arr: SortableArray): SortableArray;
export declare function insertionSort(arr: SortableArray): SortableArray;
export declare function removeDuplicates(arr: any[]): any[];
export declare function sum(arr: number[]): number;
export declare function getRollingSum(arr: number[], decimalPlaces?: number): number[];
export declare function getUniqueItems<T>(...arrs: T[][]): T[];
export declare function getCommonItems<T>(...arrs: T[][]): T[];
export declare function nthFromEnd(arr: any[], n: number): any;
export declare function areArraysEqual<T>(array1: T[], array2: T[], orderMatters?: boolean): boolean;
export declare function omitKeys(obj: {
    [key: string]: any;
}, ...keys: string[]): {
    [key: string]: any;
};
export declare function pickKeys<T extends object, U extends keyof T>(obj: T, ...keys: U[]): {
    [key: string]: any;
};
export declare function sumOfKeyValues<T extends object, U extends keyof T>(arr: (T & {
    [K in U]: number;
})[], key: U): number;
export declare function sortObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U): T[];
export declare function getKeyValueCounts<T extends object, U extends keyof T>(arr: T[], key: U, isCaseSensitive?: boolean): {
    [key: string]: number;
};
export declare function groupObjectsByKeyValue<T extends object, U extends keyof T>(arr: T[], key: U): {
    [key: string]: T[];
};
export type Handler = (req: Request, res: Response) => void;
type Handlers = {
    index?: Handler;
    show?: Handler;
    create?: Handler;
    update?: Handler;
    deleteFn?: Handler;
    extendRouter?: (router: Router) => void;
};
export declare function createExpressRoutes(handlers: Handlers): Router;
export declare function convertQueryParamOperators(params: {}): {};
export declare function addTimeoutToPromise(asyncFunction: () => Promise<unknown>, timeout: number): () => Promise<unknown>;
export declare function pauseAsync(milliseconds: number): Promise<unknown>;
export declare function pauseSync(ms: number): void;
type GenericFunction<T> = (...args: T[]) => unknown;
export declare function pipe<T>(...funcs: [
    firstFunc: GenericFunction<T>,
    secondFunc: GenericFunction<T>,
    ...otherFuncs: GenericFunction<T>[]
]): (...args: T[]) => unknown;
export declare function debounce(func: Function, ms: number, immediate: boolean): (...args: unknown[]) => {
    clear: () => void;
    flush: () => void;
};
export declare function saveTextToFileInBrowser(content: string, filename: string): void;
export declare function getCookie(cookieName: string): string;
export declare function setCookie(cookieName: string, cookieValue: string, expirationInDays: number): void;
export type QueueObject = {
    queue: unknown[];
    enqueue: Function;
    executeOne: Function;
    executeAll: Function;
    breakOut: Function;
};
export declare function createQueue(functionToExecute: Function): QueueObject;
type AsyncQueueObject = {
    queue: unknown[];
    enqueue: Function;
    executeOne: Function;
    executeAll: (ignoreErrors?: boolean) => unknown;
    breakOut: Function;
};
export declare function createQueueAsync(functionToExecute: (...args: any[]) => Promise<unknown>): AsyncQueueObject;
type GeoCoords = {
    latitude: number | null;
    longitude: number | null;
};
export declare function getBrowserLocation(timeoutInSeconds?: number): Promise<GeoCoords>;
export {};
