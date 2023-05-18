import * as _ from "./gladney"

describe("numbers", () => {
  describe("float", () => {
    it("returns a number to the specific number of decimal places", () => {
      expect(_.float(3.4567, 2)).toBe(3.46)
    })
  })

  describe("clampNumber", () => {
    it("enforces the minimum limit", () => {
      expect(_.clampNumber(45, 50)).toBe(50)
    })

    it("enforces the maximum limit", () => {
      expect(_.clampNumber(50, 0, 40)).toBe(40)
    })
  })

  describe("doubleDigit", () => {
    it("returns a single digit with a leading zero", () => {
      expect(_.doubleDigit(9)).toBe("09")
    })

    it("returns a number with 2+ digits as a string", () => {
      expect(_.doubleDigit(29)).toBe("29")
      expect(_.doubleDigit(109)).toBe("109")
    })
  })

  describe("getRange", () => {
    it("returns a range of numbers", () => {
      expect(_.getRange(1, 5)).toEqual([1, 2, 3, 4, 5])
    })
    it("uses the step parameter", () => {
      expect(_.getRange(2, 10, 2)).toEqual([2, 4, 6, 8, 10])
    })
    it("can create a decreasing sequence", () => {
      expect(_.getRange(-2, -10, -2)).toEqual([-2, -4, -6, -8, -10])
    })
  })
  describe("ordinal", () => {
    it("returns the numerical ordinal name", () => {
      expect(_.ordinal(1)).toBe("1st")
      expect(_.ordinal(11)).toBe("11th")
      expect(_.ordinal(2)).toBe("2nd")
      expect(_.ordinal(12)).toBe("12th")
      expect(_.ordinal(3)).toBe("3rd")
      expect(_.ordinal(13)).toBe("13th")
    })
  })
})

describe("time & dates", () => {
  describe("getAmountOfTimeFromSeconds", () => {
    it("returns the correct TimeOutput", () => {
      const timeObject = _.getAmountOfTimeFromSeconds(200000)
      expect(timeObject.years).toEqual(0)
      expect(timeObject.months).toEqual(0)
      expect(timeObject.weeks).toEqual(0)
      expect(timeObject.days).toEqual(2)
      expect(timeObject.hours).toEqual(7)
      expect(timeObject.minutes).toEqual(33)
      expect(timeObject.seconds).toEqual(20)
    })
  })

  describe("timeUntil", () => {
    it("returns the correct number of seconds until the provided time", () => {
      const end = new Date()
      end.setDate(end.getDate() + 1)
      const result = _.timeUntil(end)
      const validResult1 =
        result.hours === 23 && result.minutes === 59 && result.seconds === 59
      const validResult2 =
        result.days === 1 &&
        result.hours === 0 &&
        result.minutes === 0 &&
        result.seconds === 0
      const isValidResult = validResult1 || validResult2
      expect(isValidResult).toBe(true)
    })
  })

  describe("timeSince", () => {
    it("returns the correct number of seconds until the provided time", () => {
      const start = new Date()
      start.setDate(start.getDate() - 1)
      const result = _.timeSince(start)
      const validResult =
        result.days === 1 &&
        result.hours === 0 &&
        result.minutes === 0 &&
        (result.seconds === 0 || result.seconds === 1)

      expect(validResult).toBe(true)
    })
  })

  describe("getDayName", () => {
    it("returns the correct day name", () => {
      expect(_.getDayName(0)).toBe("Sunday")
      expect(_.getDayName(1)).toBe("Monday")
      expect(_.getDayName(2)).toBe("Tuesday")
      expect(_.getDayName(3)).toBe("Wednesday")
      expect(_.getDayName(4)).toBe("Thursday")
      expect(_.getDayName(5)).toBe("Friday")
      expect(_.getDayName(6)).toBe("Saturday")
    })
  })

  describe("beginningOfToday", () => {
    it("returns a date object with today at 0:00:00", () => {
      const testDate = _.beginningOfToday()
      expect(testDate.getDate()).toBe(new Date().getDate())
      expect(testDate.getMonth()).toBe(new Date().getMonth())
      expect(testDate.getFullYear()).toBe(new Date().getFullYear())
      expect(testDate.getHours()).toBe(0)
      expect(testDate.getMinutes()).toBe(0)
      expect(testDate.getSeconds()).toBe(0)
    })
  })

  describe("endOfToday", () => {
    it("returns a date object with today at 23:59:59", () => {
      const testDate = _.endOfToday()
      expect(testDate.getDate()).toBe(new Date().getDate())
      expect(testDate.getMonth()).toBe(new Date().getMonth())
      expect(testDate.getFullYear()).toBe(new Date().getFullYear())
      expect(testDate.getHours()).toBe(23)
      expect(testDate.getMinutes()).toBe(59)
      expect(testDate.getSeconds()).toBe(59)
    })
  })
})

describe("strings", () => {
  describe("lowerCaseNoSpaces", () => {
    it("returns the string lowercased without spaces", () => {
      expect(_.lowerCaseNoSpaces("Hello World")).toBe("helloworld")
    })
  })

  describe("truncate", () => {
    it("enforces the maximum length and uses traililng by default", () => {
      expect(_.truncate("Hello world", 8)).toBe("Hello wo...")
    })

    it("uses a custom filler", () => {
      expect(_.truncate("Hello world", 8, "/")).toBe("Hello wo/")
    })

    it("can use a leading filler", () => {
      expect(_.truncate("Hello world", 4, "...", "leading")).toBe("...orld")
    })

    it("can use a middle filler", () => {
      expect(_.truncate("Hello world", 4, "...", "middle")).toBe("He...ld")
    })

    it("divides string correctly if uneven length", () => {
      expect(_.truncate("Hello world", 5, "...", "middle")).toBe("He...rld")
    })
  })

  describe("mask", () => {
    it("masks the entire string with * by default", () => {
      expect(_.mask("Password")).toBe("********")
    })

    it("accepts a custom mask character", () => {
      expect(_.mask("Password", ".")).toBe("........")
    })

    it("can be leading", () => {
      expect(_.mask("Password", "*", 4, "leading")).toBe("****word")
    })

    it("can be trailing", () => {
      expect(_.mask("Password", "*", 4, "trailing")).toBe("Pass****")
    })

    it("can be middle", () => {
      expect(_.mask("Password", "*", 4, "middle")).toBe("Pa****rd")
    })

    it("divides string correctly if uneven length", () => {
      expect(_.mask("Hello world", ".", 2, "middle")).toBe("Hell..world")
    })
  })

  describe("escapeString", () => {
    it("returns a string with characters escaped", () => {
      expect(_.escapeString("Hello <there>, my 'friend'")).toBe(
        "Hello &lt;there&gt;, my &#x27;friend&#x27;"
      )
    })
  })
  describe("unEscapeString", () => {
    it("returns a string with characters unescaped", () => {
      expect(
        _.unEscapeString("Hello &lt;there&gt;, my &#x27;friend&#x27;")
      ).toBe("Hello <there>, my 'friend'")
    })
  })
})

describe("arrays", () => {
  describe("isEvery", () => {
    it("returns true if every item meets criteria", () => {
      const arr = [2, 4, 6, 8]
      const isEven = (n: number) => n % 2 === 0
      expect(_.isEvery(arr, (n) => isEven(n))).toBe(true)
    })

    it("returns false if any item does not meet criteria", () => {
      const arr = [2, 4, 7, 8]
      const isEven = (n: number) => n % 2 === 0
      expect(_.isEvery(arr, (n) => isEven(n))).toBe(false)
    })
  })

  describe("isAny", () => {
    it("returns true if any item meets criteria", () => {
      const arr = [2, 3, 5, 7]
      const isEven = (n: number) => n % 2 === 0
      expect(_.isAny(arr, (n) => isEven(n))).toBe(true)
    })

    it("returns false if no item does meet criteria", () => {
      const arr = [3, 5, 7, 9]
      const isEven = (n: number) => n % 2 === 0
      expect(_.isAny(arr, (n) => isEven(n))).toBe(false)
    })
  })

  describe("shuffle", () => {
    it("returns the array in a different order", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const arrShuffled = _.shuffle(arr)
      expect(_.isEqual(arr, arrShuffled)).toBe(true)
      expect(_.isEqual(arr, arrShuffled, true)).toBe(false)
    })
  })

  describe("getRandomItem", () => {
    it("gets a random item from the array", () => {
      const arr = [1, 2, 3, 4, 5]
      const randomItem = _.getRandomItem(arr)
      expect(arr.includes(randomItem)).toBe(true)
    })
  })

  describe("clampArray", () => {
    it("enforces the maximum limit", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      expect(_.clampArray(arr, 0, 4)).toEqual([0, 1, 2, 3])
    })

    it("enforces the minimum limit and uses filler", () => {
      const arr = [0, 1]
      expect(_.clampArray(arr, 3, false, 0)).toEqual([0, 1, 0])
    })
  })

  describe("chunkArray", () => {
    it("chunks the array correctly", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      expect(_.chunkArray(arr, 2)).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9],
      ])
    })
  })

  describe("bubbleSort", () => {
    it("sorts the array", () => {
      const arr = [4, 3, 8, 7, 1]
      expect(_.bubbleSort(arr)).toEqual([1, 3, 4, 7, 8])
    })

    it("sorts negative numbers correctly", () => {
      const arr = [4, 3, -8, -7, 1]
      expect(_.bubbleSort(arr)).toEqual([-8, -7, 1, 3, 4])
    })
  })

  describe("selectionSort", () => {
    it("sorts the array", () => {
      const arr = [4, 3, 8, 7, 1]
      expect(_.selectionSort(arr)).toEqual([1, 3, 4, 7, 8])
    })

    it("sorts negative numbers correctly", () => {
      const arr = [4, 3, -8, -7, 1]
      expect(_.selectionSort(arr)).toEqual([-8, -7, 1, 3, 4])
    })
  })

  describe("insertionSort", () => {
    it("sorts the array", () => {
      const arr = [4, 3, 8, 7, 1]
      expect(_.insertionSort(arr)).toEqual([1, 3, 4, 7, 8])
    })

    it("sorts negative numbers correctly", () => {
      const arr = [4, 3, -8, -7, 1]
      expect(_.insertionSort(arr)).toEqual([-8, -7, 1, 3, 4])
    })
  })

  describe("removeDuplicates", () => {
    it("returns the array with duplicates removed", () => {
      const arr = [1, 1, 2, 3, 4, 4, 5]
      expect(_.removeDuplicates(arr)).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe("sum", () => {
    it("returns the sum of a set of numbers", () => {
      const arr = [1, 2, 3, 4]
      expect(_.sum(...arr)).toEqual(10)
    })

    it("returns the sum of an array of numbers", () => {
      const arr = [1, 2, 3, 4]
      expect(_.sum(arr)).toEqual(10)
    })

    it("returns the sum of several arrays of numbers", () => {
      const arr = [1, 2, 3, 4]
      expect(_.sum(arr, arr)).toEqual(20)
    })

    it("returns the sum of several numbers and an array of numbers", () => {
      const arr = [1, 2, 3, 4]
      expect(_.sum(arr, 1, 2, 3, 4)).toEqual(20)
    })
  })

  describe("getRollingSum", () => {
    it("returns the rolling sum of an array of numbers", () => {
      const arr = [1, 2, 3, 4]
      expect(_.getRollingSum(arr)).toEqual([1, 3, 6, 10])
    })
  })

  describe("getUniqueItems", () => {
    it("returns the unique items from two arrays", () => {
      const arr = [1, 2, 3, 4]
      const arr2 = [2, 3, 5]
      expect(_.getUniqueItems(arr, arr2)).toEqual([1, 4, 5])
    })
  })

  describe("getCommonItems", () => {
    it("returns the common items from two arrays", () => {
      const arr = [1, 2, 3, 4]
      const arr2 = [2, 3, 5]
      expect(_.getCommonItems(arr, arr2)).toEqual([2, 3])
    })
  })

  describe("nthFromEnd", () => {
    it("returns the item N spots from the end", () => {
      expect(_.nthFromEnd([1, 2, 3, 4], 1)).toEqual(3)
    })
  })

  describe("flatten", () => {
    it("returns a three dimensional array flattened to a one dimensional array", () => {
      expect(
        _.flatten([
          [1, 2, [3, 4]],
          [5, 6],
        ])
      ).toEqual([1, 2, 3, 4, 5, 6])
    })

    it("respects levels paramter", () => {
      expect(
        _.flatten(
          [
            [1, 2, [3, 4]],
            [5, 6],
          ],
          1
        )
      ).toEqual([1, 2, [3, 4], 5, 6])
    })
  })

  describe("isEqual", () => {
    it("arrays are equal, order matters", () => {
      expect(_.isEqual([1, 2, 3, 4], [1, 2, 3, 4], true)).toBe(true)
    })

    it("arrays are equal, order doesn't matter", () => {
      expect(_.isEqual([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true)
    })

    it("arrays are equal out of order, order doesn't matter", () => {
      expect(_.isEqual([1, 2, 3, 4], [2, 1, 3, 4])).toBe(true)
    })

    it("arrays are equal out of order, order does matter", () => {
      expect(_.isEqual([1, 2, 3, 4], [2, 1, 3, 4], true)).toBe(false)
    })

    it("arrays are not equal, order does matter", () => {
      expect(_.isEqual([1, 2, 5, 4], [2, 1, 3, 4])).toBe(false)
    })

    it("arrays are not equal, order doesn't matter", () => {
      expect(_.isEqual([1, 2, 5, 4], [2, 1, 3, 4])).toBe(false)
    })

    it("objects are not equal", () => {
      expect(_.isEqual({ a: 1, b: 2, c: 3 }, { d: 4, e: 5, f: 6 })).toBe(false)
    })

    it("objects are equal out of order, order doesn't matter", () => {
      expect(_.isEqual({ a: 1, b: 2, c: 3 }, { c: 3, b: 2, a: 1 })).toBe(true)
    })
    it("objects are equal out of order, order does matter", () => {
      expect(_.isEqual({ a: 1, b: 2, c: 3 }, { c: 3, b: 2, a: 1 }, true)).toBe(
        false
      )
    })

    it("objects are equal but diff case, case doesn't matter", () => {
      expect(
        _.isEqual(
          { a: "A", b: "B", c: "C" },
          { a: "a", b: "b", c: "c" },
          true,
          false
        )
      ).toBe(true)
    })

    it("objects are equal but diff case, case does matter", () => {
      expect(
        _.isEqual(
          { a: "A", b: "B", c: "C" },
          { a: "a", b: "b", c: "c" },
          true,
          true
        )
      ).toBe(false)
    })

    it("objects are equal but diff case and out of order, order and case don't matter", () => {
      expect(
        _.isEqual(
          { a: "A", b: "B", c: "C" },
          { c: "c", a: "a", b: "b" },
          false,
          false
        )
      ).toBe(true)
    })
  })

  describe("safeSort", () => {
    it("sorts numbers", () => {
      expect(_.safeSort([4, 3, 2, 1])).toEqual([1, 2, 3, 4])
    })

    it("sorts strings", () => {
      expect(_.safeSort(["d", "c", "b", "a"])).toEqual(["a", "b", "c", "d"])
    })

    it("sorts negative numbers correctly", () => {
      expect(_.safeSort([-1, -2, -3, -4])).toEqual([-4, -3, -2, -1])
    })

    it("sorts number strings as numbers", () => {
      expect(_.safeSort(["45", "167", "23", "1000"])).toEqual([
        "23",
        "45",
        "167",
        "1000",
      ])
    })
  })
})

describe("objects", () => {
  describe("omitKeys", () => {
    it("returns the object without keys provided", () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(_.omitKeys(obj, "b", "c")).toEqual({ a: 1 })
    })
  })

  describe("pickKeys", () => {
    it("returns the object with only the keys provided", () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(_.pickKeys(obj, "b", "c")).toEqual({ b: 2, c: 3 })
    })
  })

  describe("combineObjects", () => {
    it("returns an object with all key/values from provided objects", () => {
      const objArray = [{ a: 1 }, { b: 2 }, { c: 3 }]
      expect(_.combineObjects(...objArray)).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe("sumOfKeyValue", () => {
    it("returns the sum of the key value", () => {
      const arr = [
        { a: 1, b: 2 },
        { a: 2, b: 3 },
        { a: 3, b: 4 },
      ]
      expect(_.sumOfKeyValue(arr, "a")).toBe(6)
    })
  })

  describe("sortByKeyValue", () => {
    it("returns the array sorted by key value", () => {
      const arr = [
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 3, b: 4 },
      ]
      expect(_.sortByKeyValue(arr, "b")).toEqual([
        { a: 2, b: 1 },
        { a: 1, b: 2 },
        { a: 3, b: 4 },
      ])
    })
  })

  describe("sortByKeyValues", () => {
    it("returns the array sorted by key values", () => {
      const arr = [
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
        { a: 3, b: 4, c: 1 },
      ]
      expect(_.sortByKeyValues(arr, "a", "b", "c")).toEqual([
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 1, c: 3 },
        { a: 2, b: 2, c: 1 },
        { a: 3, b: 4, c: 1 },
      ])
    })
  })

  describe("getKeyValueCounts", () => {
    it("returns an object with counts of key values", () => {
      const arr = [
        { name: "Stephen" },
        { name: "James" },
        { name: "Mike" },
        { name: "Stephen" },
      ]
      expect(_.getKeyValueCounts(arr, "name")).toEqual({
        stephen: 2,
        james: 1,
        mike: 1,
      })
    })

    it("accounts for case sensitivity", () => {
      const arr = [
        { name: "Stephen" },
        { name: "James" },
        { name: "Mike" },
        { name: "stephen" },
      ]
      expect(_.getKeyValueCounts(arr, "name", true)).toEqual({
        stephen: 1,
        James: 1,
        Mike: 1,
        Stephen: 1,
      })
    })
  })

  describe("groupByKeyValue", () => {
    it("returns an object with groups of objects aligned by key value", () => {
      const arr = [
        { name: "Stephen" },
        { name: "James" },
        { name: "Mike" },
        { name: "Stephen" },
      ]
      expect(_.groupByKeyValue(arr, "name")).toEqual({
        stephen: [{ name: "Stephen" }, { name: "Stephen" }],
        james: [{ name: "James" }],
        mike: [{ name: "Mike" }],
      })
    })

    it("is not case sensitive by default", () => {
      const arr = [
        { name: "Stephen" },
        { name: "James" },
        { name: "Mike" },
        { name: "stephen" },
      ]
      expect(_.groupByKeyValue(arr, "name")).toEqual({
        stephen: [{ name: "Stephen" }, { name: "stephen" }],
        james: [{ name: "James" }],
        mike: [{ name: "Mike" }],
      })
    })

    it("separates not case matching values if case sensitive", () => {
      const arr = [
        { name: "Stephen" },
        { name: "James" },
        { name: "Mike" },
        { name: "stephen" },
      ]
      expect(_.groupByKeyValue(arr, "name", true)).toEqual({
        Stephen: [{ name: "Stephen" }],
        James: [{ name: "James" }],
        Mike: [{ name: "Mike" }],
        stephen: [{ name: "stephen" }],
      })
    })
  })

  describe("deepCopy", () => {
    it("returns a deep copy of the object", () => {
      const nestedObject = { a: 1, b: { c: 2 }, d: 3, e: { f: { g: 4 } } }
      expect(_.deepCopy(nestedObject)).toEqual(nestedObject)
    })
  })
})

describe("misc", () => {
  describe("addTimeoutToPromise", () => {
    it("throws an error if timeout happens first", async () => {
      let err = ""
      let timer
      const slowThing = async () =>
        new Promise((resolve, reject) => {
          timer = setTimeout(resolve, 500)
        })
      const slowThingWithTimeout = _.addTimeoutToPromise(slowThing, 200)
      try {
        await slowThingWithTimeout()
      } catch (e) {
        clearTimeout(timer)
        err = e as string
      }
      expect(err).toBe("TIMED_OUT")
    })

    it("returns the promise result if promise resolves happens first", async () => {
      let result
      let err = ""
      let timer
      const fastThing = async () =>
        new Promise((resolve, reject) => {
          timer = setTimeout(() => resolve("DONE"), 200)
        })
      const slowThingWithTimeout = _.addTimeoutToPromise(fastThing, 500)
      try {
        result = await slowThingWithTimeout()
      } catch (e) {
        clearTimeout(timer)
        err = e as string
      }
      expect(result as string).toBe("DONE")
    })
  })

  describe("pauseAsync", () => {
    it("pauses for the provided milliseconds", async () => {
      const start = Date.now()
      await _.pauseAsync(500)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(499)
    })
  })

  describe("pauseSync", () => {
    it("pauses for the provided milliseconds", () => {
      const start = Date.now()
      _.pauseSync(500)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(500)
    })
  })

  describe("pipe", () => {
    it("creates a pipe function", () => {
      const double = (n: number) => n * 2
      const triple = (n: number) => n * 3
      const doubleThenTriple = _.pipe(double, triple)
      expect(doubleThenTriple(3)).toEqual(18)
    })
  })

  describe("convertObjectToQueryParams", () => {
    it("converts an object to string of query params", () => {
      const obj = { name: "john", age: 30 }
      expect(_.convertObjectToQueryParams(obj)).toEqual("name=john&age=30")
    })

    it("handles nesting (last param)", () => {
      const obj = {
        name: "john",
        age: 30,
        favorite: { drink: "coke", food: "chicken" },
      }
      expect(_.convertObjectToQueryParams(obj)).toEqual(
        "name=john&age=30&favorite[drink]=coke&favorite[food]=chicken"
      )
    })

    it("handles nesting (middle param)", () => {
      const obj = {
        name: "john",
        favorite: { drink: "coke", food: "chicken" },
        age: 30,
      }
      expect(_.convertObjectToQueryParams(obj)).toEqual(
        "name=john&favorite[drink]=coke&favorite[food]=chicken&age=30"
      )
    })
  })

  describe("partial", () => {
    it("calls the function correctly if not all parameters are originally passed", () => {
      const subtract = (a: number, b: number) => a - b
      const subtractFrom5 = _.partial(subtract, 5)
      expect(subtractFrom5(1)).toEqual(4)
    })

    it("calls the function correctly if false is passed in for a former parameter", () => {
      const subtract = (a: number, b: number) => a - b
      const subtract5 = _.partial(subtract, false, 5)
      expect(subtract5(12)).toEqual(7)
    })

    it("calls the function correctly if false is passed in for a former parameter", () => {
      const subtract = (a: number, b: number) => a - b
      const subtractFrom5 = _.partial(subtract, 5, false)
      expect(subtractFrom5(1)).toEqual(4)
    })
  })

  describe("debounce", () => {
    it("immediate = true. invokes the function immediately on first call", () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 200, true)
      debouncedFunc()
      expect(func).toHaveBeenCalled()
    })

    it("immediate = true. does not invoke the function again before time has passed", () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 500, true)
      const { clear } = debouncedFunc()
      debouncedFunc()
      clear()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = true. does invoke the function again before time has passed if cleared", () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 500, true)
      const { clear } = debouncedFunc()
      clear()
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(2)
    })

    it("immediate = false. invokes the function after the delay but not before", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 200, false)
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(0)
      await _.pauseAsync(500)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. restarts the delay if the function is tried before the wait has passed", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 500, false)
      debouncedFunc()
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(0)
      await _.pauseAsync(200)
      expect(func).toHaveBeenCalledTimes(0)
      await _.pauseAsync(300)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. flush executes the function immediately", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 500, false)
      const { flush } = debouncedFunc()
      flush()
      expect(func).toHaveBeenCalledTimes(1)
    })
  })
})
