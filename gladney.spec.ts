import * as _ from "./gladney"

describe("numbers", () => {
  describe("round", () => {
    it("returns a number to the specific number of decimal places", () => {
      expect(_.round(3.4567, 0.01)).toBe(3.46)
    })

    it("returns a number to the specific number of 10s", () => {
      expect(_.round(528, 10)).toBe(530)
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

  describe("range", () => {
    it("returns a range of numbers", () => {
      expect(_.range(1, 5)).toEqual([1, 2, 3, 4, 5])
    })
    it("uses the step parameter", () => {
      expect(_.range(2, 10, 2)).toEqual([2, 4, 6, 8, 10])
    })
    it("can create a decreasing sequence", () => {
      expect(_.range(-2, -10, -2)).toEqual([-2, -4, -6, -8, -10])
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
  // describe("getDurationFromMilliseconds", () => {
  //   it("returns the correct TimeOutput", () => {
  //     const timeObject = _.getDurationFromMilliseconds(200000000)
  //     expect(timeObject.days).toEqual(2)
  //     expect(timeObject.hours).toEqual(7)
  //     expect(timeObject.minutes).toEqual(33)
  //     expect(timeObject.seconds).toEqual(20)
  //   })
  // })

  // describe("getMillisecondsFromDuration", () => {
  //   it("returns the correct number of ms", () => {
  //     const amountOfTime = { days: 1, hours: 3, minutes: 24, seconds: 11 }
  //     expect(_.getMillisecondsFromDuration(amountOfTime)).toBe(98651000)
  //   })
  // })

  // describe("duration functions", () => {
  //   it("handles the same amount of time correctly", () => {
  //     const amountOfTime = { days: 1, hours: 3, minutes: 24, seconds: 11 }
  //     const toMs = _.getMillisecondsFromDuration(amountOfTime)
  //     const backToTime = _.getDurationFromMilliseconds(toMs)
  //     expect(backToTime).toEqual(amountOfTime)
  //   })
  // })

  describe("getDateFromDuration", () => {
    const now = new Date()

    it("returns the correct date in the past", () => {
      const then = new Date(now)

      then.setDate(then.getDate() - 1)
      then.setHours(then.getHours() - 2)
      then.setMinutes(then.getMinutes() - 3)
      then.setSeconds(then.getSeconds() - 4)

      const fnResult = _.getDateFromDuration({
        days: -1,
        hours: -2,
        minutes: -3,
        seconds: -4,
      })

      expect(fnResult.getDate()).toBe(then.getDate())
      expect(fnResult.getHours()).toBe(then.getHours())
      expect(fnResult.getMinutes()).toBe(then.getMinutes())
      expect(fnResult.getSeconds()).toBe(then.getSeconds())
    })

    it("returns the correct date in the future", () => {
      const then = new Date(now)

      then.setDate(then.getDate() + 1)
      then.setHours(then.getHours() + 2)
      then.setMinutes(then.getMinutes() + 3)
      then.setSeconds(then.getSeconds() + 4)

      const fnResult = _.getDateFromDuration({
        days: 1,
        hours: 2,
        minutes: 3,
        seconds: 4,
      })

      expect(fnResult.getDate()).toBe(then.getDate())
      expect(fnResult.getHours()).toBe(then.getHours())
      expect(fnResult.getMinutes()).toBe(then.getMinutes())
      expect(fnResult.getSeconds()).toBe(then.getSeconds())
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

  describe("dayName", () => {
    it("returns the correct day name", () => {
      expect(_.dayName(0)).toBe("Sunday")
      expect(_.dayName(1)).toBe("Monday")
      expect(_.dayName(2)).toBe("Tuesday")
      expect(_.dayName(3)).toBe("Wednesday")
      expect(_.dayName(4)).toBe("Thursday")
      expect(_.dayName(5)).toBe("Friday")
      expect(_.dayName(6)).toBe("Saturday")
    })
  })

  describe("todayStart", () => {
    it("returns a date object with today at 0:00:00", () => {
      const testDate = _.todayStart()
      expect(testDate.getDate()).toBe(new Date().getDate())
      expect(testDate.getMonth()).toBe(new Date().getMonth())
      expect(testDate.getFullYear()).toBe(new Date().getFullYear())
      expect(testDate.getHours()).toBe(0)
      expect(testDate.getMinutes()).toBe(0)
      expect(testDate.getSeconds()).toBe(0)
    })
  })

  describe("todayEnd", () => {
    it("returns a date object with today at 23:59:59", () => {
      const testDate = _.todayEnd()
      expect(testDate.getDate()).toBe(new Date().getDate())
      expect(testDate.getMonth()).toBe(new Date().getMonth())
      expect(testDate.getFullYear()).toBe(new Date().getFullYear())
      expect(testDate.getHours()).toBe(23)
      expect(testDate.getMinutes()).toBe(59)
      expect(testDate.getSeconds()).toBe(59)
    })
  })

  describe("getDuration", () => {
    it("returns the correct duration", () => {
      const start = new Date()
      const end = new Date(start)
      end.setDate(end.getDate() - 11)
      end.setHours(end.getHours() - 2)
      end.setMinutes(end.getMinutes() - 5)
      end.setSeconds(end.getSeconds() - 43)

      expect(_.getDuration(start, end)).toEqual({
        days: 11,
        hours: 2,
        minutes: 5,
        seconds: 43,
      })
    })
  })

  describe("relativeTimeDiff", () => {
    it("returns the correct relative duration", () => {
      const secondsInAMinute = 60
      const secondsInAnHour = 3600
      const secondsInADay = 86400
      const secondsInAWeek = 604800
      const secondsInAMonth = 2592000 // Assumes 30 day month
      const secondsInAYear = 31557600

      const oneDayAgo = new Date(Date.now() - secondsInADay * 1000)
      const twoWeeksAgo = new Date(Date.now() - secondsInAWeek * 1000 * 2)
      const threeMonthsAgo = new Date(Date.now() - secondsInAMonth * 1000 * 3)
      const fourYearsAgo = new Date(Date.now() - secondsInAYear * 1000 * 4)
      const fiveMinutesAgo = new Date(Date.now() - secondsInAMinute * 1000 * 5)
      const sixHoursAgo = new Date(Date.now() - secondsInAnHour * 1000 * 6)

      expect(_.relativeTimeDiff(oneDayAgo)).toBe("yesterday")
      expect(_.relativeTimeDiff(twoWeeksAgo)).toBe("2 weeks ago")
      expect(_.relativeTimeDiff(threeMonthsAgo)).toBe("3 months ago")
      expect(_.relativeTimeDiff(fourYearsAgo)).toBe("4 years ago")
      expect(_.relativeTimeDiff(fiveMinutesAgo)).toBe("5 minutes ago")
      expect(_.relativeTimeDiff(sixHoursAgo)).toBe("6 hours ago")
    })
  })

  describe("isPast", () => {
    it("returns true if the date has passed", () => {
      expect(_.isPast(new Date("01-01-1979"))).toBe(true)
    })

    it("returns false if the date has not passed", () => {
      expect(_.isPast(new Date("01-01-3000"))).toBe(false)
    })
  })
})

describe("strings", () => {
  describe("lowerCaseNoSpaces", () => {
    it("returns the string lowercased without spaces", () => {
      expect(_.lowerCaseNoSpaces("Hello World")).toBe("helloworld")
    })
  })

  describe("capitalize", () => {
    it("capitalizes the first letter", () => {
      expect(_.capitalize("hello")).toBe("Hello")
    })

    it("can lowercase latter characters", () => {
      expect(_.capitalize("hELLO", true)).toBe("Hello")
    })
  })

  describe("lazyIncludes", () => {
    it("returns true if the characters are present", () => {
      expect(_.lazyIncludes("Hello world", "LL")).toBeTruthy()
      expect(_.lazyIncludes("Hello world", "ll")).toBeTruthy()
    })

    it("returns false if the characters are present", () => {
      expect(_.lazyIncludes("Hello world", "f")).toBeFalsy()
      expect(_.lazyIncludes("Hello world", "F")).toBeFalsy()
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
      expect(_.mask("Password", { maskWith: "." })).toBe("........")
    })

    it("can be leading", () => {
      expect(
        _.mask("Password", { maskWith: "*", style: "leading", maskLength: 4 })
      ).toBe("****word")
    })

    it("can be trailing", () => {
      expect(
        _.mask("Password", { maskWith: "*", style: "trailing", maskLength: 4 })
      ).toBe("Pass****")
    })

    it("can be middle", () => {
      expect(
        _.mask("Password", { maskWith: "*", style: "middle", maskLength: 4 })
      ).toBe("Pa****rd")
    })

    it("divides string correctly if uneven length", () => {
      expect(
        _.mask("Hello world", { maskWith: ".", style: "middle", maskLength: 2 })
      ).toBe("Hell..world")
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

describe("slugify", () => {
  it("lowercases the text", () => {
    expect(_.slugify("THIS")).toBe("this")
  })

  it("replaces spaces", () => {
    expect(_.slugify("this is some text")).toBe("this-is-some-text")
  })

  it("trims whitespace", () => {
    expect(_.slugify(" this is some text ")).toBe("this-is-some-text")
  })

  it("removes non-letter and non-number characters", () => {
    expect(_.slugify("42 things you can do")).toBe("42-things-you-can-do")
  })

  it("can use a custom separator", () => {
    expect(_.slugify("this is some text!", "_")).toBe("this_is_some_text")
  })
})

describe("isNumeric", () => {
  it("returns true if the parameter is a number", () => {
    expect(_.isNumeric(24)).toBe(true)
  })

  it("returns true if the string only contains numbers", () => {
    expect(_.isNumeric("3524")).toBe(true)
  })

  it("returns false if the string only contains non-numbers", () => {
    expect(_.isNumeric("3524a")).toBe(false)
  })
})

describe("shave", () => {
  it("removes elements from the end of a string", () => {
    expect(_.shave("hello", 2)).toBe("hel")
  })

  it("removes elements from the end of an array", () => {
    expect(_.shave([1, 2, 3, 4], 2)).toEqual([1, 2])
  })

  it("removes elements from the beginning if n is negative", () => {
    expect(_.shave([1, 2, 3, 4], -2)).toEqual([3, 4])
  })
})

describe("arrays", () => {
  describe("multiplyArray", () => {
    it("multiplies the array N times", () => {
      expect(_.repeatArray([1, 2, 3], 3)).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3])
    })
  })

  describe("arrayInto", () => {
    it("converts the array into the proper object", () => {
      const arr = [
        { first: "John", last: "Doe" },
        { first: "Jane", last: "Smith" },
      ]
      expect(_.arrayInto(arr, (i) => ({ [i.first]: i.last }))).toEqual({
        John: "Doe",
        Jane: "Smith",
      })
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

  describe("getRandomItems", () => {
    it("gets a random item from the array", () => {
      const arr = [1, 2, 3, 4, 5]
      const [randomItem] = _.getRandomItems(arr, 1)
      expect(arr.includes(randomItem)).toBe(true)
    })

    it("does not get the same item twice", () => {
      const arr = [1, 2, 3, 4, 5]
      const set = new Set(_.getRandomItems(arr, 5) as number[])
      expect(_.isEqual(Array.from(set).sort(), arr)).toBe(true)
    })
  })

  describe("everyNth", () => {
    it("returns every Nth item in an arry", () => {
      expect(_.everyNth([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([3, 6, 9])
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

    it("returns the array with duplicate objects removed", () => {
      const obj = { a: 1, b: 2, c: 3 }
      const arr = [obj, obj, obj]
      expect(_.removeDuplicates(arr)).toEqual([{ a: 1, b: 2, c: 3 }])
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

  describe("rollingSum", () => {
    it("returns the rolling sum of an array of numbers", () => {
      const arr = [1, 2, 3, 4]
      expect(_.rollingSum(arr)).toEqual([1, 3, 6, 10])
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

  describe("getCallbackResultCounts", () => {
    it("returns the counts of results", () => {
      const objs = [
        { a: 1, b: 1 },
        { a: 1, b: 1 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 2, b: 2 },
        { a: 3, b: 1 },
      ]

      const aPlusB = ({ a, b }: { a: number; b: number }) => a + b

      expect(_.getCallbackResultCounts(objs, aPlusB)).toEqual({
        "2": 3,
        "3": 1,
        "4": 2,
      })
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

describe("swapItems", () => {
  it("swaps the items at the indexes provided", () => {
    const arr = [0, 1, 2, 3, 4]
    expect(_.swapItems(arr, 2, 4)).toEqual([0, 1, 4, 3, 2])
    expect(_.swapItems(arr, 0, 3)).toEqual([3, 1, 2, 0, 4])
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

  describe("objectInto", () => {
    it("returns the desired new shape", () => {
      const obj = { user: { name: "Stephen", age: 39, sex: "M" } }
      expect(
        _.objectInto(obj, (key, value) => ({ [value.name]: value.age }))
      ).toEqual({ Stephen: 39 })
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

    it("returns the array sorted by key value decsending", () => {
      const arr = [
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 3, b: 4 },
      ]
      expect(_.sortByKeyValue(arr, "b", "desc")).toEqual([
        { a: 3, b: 4 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
      ])
    })
  })

  describe("sortByKeyValues", () => {
    it("returns the array sorted by key values (all asc)", () => {
      const arr = [
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
        { a: 3, b: 4, c: 1 },
      ]
      expect(_.sortByKeyValues(arr, ["a", "b", "c"])).toEqual([
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 1, c: 3 },
        { a: 2, b: 2, c: 1 },
        { a: 3, b: 4, c: 1 },
      ])
    })

    it("returns the array sorted by key values (all desc)", () => {
      const arr = [
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
        { a: 3, b: 4, c: 1 },
      ]
      expect(
        _.sortByKeyValues(arr, ["a", "b", "c"], ["desc", "desc", "desc"])
      ).toEqual([
        { a: 3, b: 4, c: 1 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
        { a: 1, b: 3, c: 2 },
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 1, c: 1 },
      ])
    })

    it("returns the array sorted by key values (mixed)", () => {
      const arr = [
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 3, c: 2 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
        { a: 3, b: 4, c: 1 },
      ]
      expect(
        _.sortByKeyValues(arr, ["a", "b", "c"], ["asc", "desc", "asc"])
      ).toEqual([
        { a: 1, b: 3, c: 2 },
        { a: 1, b: 2, c: 1 },
        { a: 1, b: 2, c: 2 },
        { a: 1, b: 1, c: 1 },
        { a: 2, b: 2, c: 1 },
        { a: 2, b: 1, c: 3 },
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

  describe("isObjectInArray", () => {
    it("returns true if the object is present in the array", () => {
      const arrayItems = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]
      expect(_.isObjectInArray({ x: 2, y: 2 }, arrayItems)).toBe(true)
    })

    it("returns false if the object is not present in the array", () => {
      const arrayItems = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]
      expect(_.isObjectInArray({ x: 1, y: 2 }, arrayItems)).toBe(false)
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

  describe("removeDuplicatesByKeyValue", () => {
    it("removes any subsequent objects with the same key value", () => {
      const members = [
        { id: 1, name: "Stephen" },
        { id: 2, name: "Andrea" },
        { id: 1, name: "Monica" },
        { id: 4, name: "Dylan" },
      ]

      expect(_.removeDuplicatesByKeyValue(members, "id")).toEqual([
        { id: 1, name: "Stephen" },
        { id: 2, name: "Andrea" },
        { id: 4, name: "Dylan" },
      ])
    })
  })

  describe("deepCopy", () => {
    it("returns a deep copy of the object", () => {
      const nestedObject = { a: 1, b: { c: 2 }, d: 3, e: { f: { g: 4 } } }
      expect(_.deepCopy(nestedObject)).toEqual(nestedObject)
    })
  })

  // describe("updateObjectsWhere", () => {
  //   it("updates all of the matching objects with new key values", () => {
  //     const objs = [
  //       { id: 1, name: "Stephen", sex: "male", age: 38, isGuy: false },
  //       { id: 2, name: "Heather", sex: "female", age: 35, isGuy: false },
  //       { id: 3, name: "Bob", sex: "male", age: 42, isGuy: false },
  //     ]

  //     expect(
  //       _.updateObjectsWhere(objs, { sex: "male" }, { isGuy: true })
  //     ).toEqual([
  //       { id: 1, name: "Stephen", sex: "male", age: 38, isGuy: true },
  //       { id: 2, name: "Heather", sex: "female", age: 35, isGuy: false },
  //       { id: 3, name: "Bob", sex: "male", age: 42, isGuy: true },
  //     ])
  //   })

  //   it("only updates the first match if requested", () => {
  //     const objs = [
  //       { id: 1, name: "Stephen", sex: "male", age: 38, isGuy: false },
  //       { id: 2, name: "Heather", sex: "female", age: 35, isGuy: false },
  //       { id: 3, name: "Bob", sex: "male", age: 42, isGuy: false },
  //     ]

  //     expect(
  //       _.updateObjectsWhere(objs, { sex: "male" }, { isGuy: true }, true)
  //     ).toEqual([
  //       { id: 1, name: "Stephen", sex: "male", age: 38, isGuy: true },
  //       { id: 2, name: "Heather", sex: "female", age: 35, isGuy: false },
  //       { id: 3, name: "Bob", sex: "male", age: 42, isGuy: false },
  //     ])
  //   })
  // })

  describe("invert", () => {
    it("swaps the keys and values", () => {
      expect(_.invert({ a: 1, b: 2, c: 3 })).toEqual({
        "1": "a",
        "2": "b",
        "3": "c",
      })
    })
  })

  describe("getKeyWhereValueIs", () => {
    it("returns the correct key", () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(_.getKeyWhereValueIs(obj, 3)).toBe("c")
    })

    it("returns null if no key/value found", () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(_.getKeyWhereValueIs(obj, 4)).toBe(null)
    })
  })
})

describe("misc", () => {
  describe("withTimeout", () => {
    it("throws an error if timeout happens first", async () => {
      let err = ""
      let timer
      const slowThing = async () =>
        new Promise((resolve, reject) => {
          timer = setTimeout(resolve, 200)
        })
      const slowThingWithTimeout = _.withTimeout(slowThing, 100)
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
          timer = setTimeout(() => resolve("DONE"), 100)
        })
      const slowThingWithTimeout = _.withTimeout(fastThing, 200)
      try {
        result = await slowThingWithTimeout()
      } catch (e) {
        clearTimeout(timer)
        err = e as string
      }
      expect(result as string).toBe("DONE")
    })
  })

  describe("pause", () => {
    it("pauses for the provided milliseconds", async () => {
      const start = Date.now()
      await _.pause(200)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(199)
    })
  })

  // describe("pauseSync", () => {
  //   it("pauses for the provided milliseconds", () => {
  //     const start = Date.now()
  //     _.pauseSync(500)
  //     const end = Date.now()
  //     expect(end - start).toBeGreaterThanOrEqual(500)
  //   })
  // })

  describe("createPipe", () => {
    it("creates a pipe function", () => {
      const double = (n: number) => n * 2
      const triple = (n: number) => n * 3
      const doubleThenTriple = _.createPipe(double, triple)

      expect(doubleThenTriple(3)).toEqual(18)
    })
  })

  describe("pipe", () => {
    it("pipes the provided argument through the functions", () => {
      const double = (n: number) => n * 2
      const triple = (n: number) => n * 3
      const pipedResult = _.pipe(3, double, triple)

      expect(pipedResult).toEqual(18)
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

  describe("curry", () => {
    it("creates a curried version of a function", () => {
      const addThreeNumbers = (n1: number, n2: number, n3: number) =>
        n1 + n2 + n3
      const curriedAdd3 = _.curry(addThreeNumbers)
      expect(curriedAdd3(1)(2)(3)).toBe(6)
    })
  })

  describe("debounce", () => {
    it("immediate = true. invokes the function immediately on first call", () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 100, true)
      debouncedFunc()
      expect(func).toHaveBeenCalled()
    })

    it("immediate = true. does not invoke the function again before time has passed", () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 200, true)
      debouncedFunc()
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = true. does invoke the function again before time has passed if cleared", () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 200, true)
      debouncedFunc()
      debouncedFunc.clear()
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(2)
    })

    it("immediate = true. returns a promise that resolves to result", async () => {
      const func = jest.fn(() => 4)
      const debouncedFunc = _.debounce(func, 100, true)
      const result = await debouncedFunc()
      expect(result).toBe(4)
    })

    it("immediate = true. flush does not execute the function", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 100, true)
      debouncedFunc()
      debouncedFunc.flush()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. invokes the function after the delay but not before", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 100, false)
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(0)
      await _.pause(200)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. restarts the delay if the function is tried before the wait has passed", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 200, false)
      debouncedFunc()
      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(0)
      await _.pause(100)
      expect(func).toHaveBeenCalledTimes(0)
      await _.pause(300)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. flush executes the function immediately", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 100, false)
      debouncedFunc()
      debouncedFunc.flush()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. flush only executes once", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 100, false)
      debouncedFunc()
      debouncedFunc.flush()
      debouncedFunc.flush()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. flush does not execute function if no calls pending", async () => {
      const func = jest.fn()
      const debouncedFunc = _.debounce(func, 100, false)

      debouncedFunc()
      await _.pause(200)
      debouncedFunc.flush()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate = false. returns a promise that resolves after delay", async () => {
      const func = jest.fn(() => 4)
      const debouncedFunc = _.debounce(func, 100, false)
      const result = await debouncedFunc()
      expect(result).toBe(4)
    })
  })

  describe("throttle", () => {
    it("will not execute a function more than once in the alloted time", async () => {
      const func = jest.fn()
      const throttledFunc = _.throttle(func, 100)
      throttledFunc()
      throttledFunc()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("executes a function again after the alloted time", async () => {
      const func = jest.fn()
      const throttledFunc = _.throttle(func, 100)
      throttledFunc()
      await _.pause(200)
      throttledFunc()
      expect(func).toHaveBeenCalledTimes(2)
    })

    it("enqueues early requests", async () => {
      const func = jest.fn()
      const throttledFunc = _.throttle(func, 100)
      throttledFunc()
      throttledFunc()
      await _.pause(300)
      expect(func).toHaveBeenCalledTimes(2)
    })
  })

  describe("rgbToHex", () => {
    it("converts an RGB value to a hexadecimal code", () => {
      expect(_.rgbToHex(189, 23, 123)).toBe("#BD177B")
      expect(_.rgbToHex(255, 0, 0)).toBe("#FF0000")
    })
  })

  describe("hexToRgb", () => {
    it("converts a hexadecimal code to an RGB value", () => {
      expect(_.hexToRgb("FF0000")).toEqual([255, 0, 0])
    })

    it("ignores the # symbol if present", () => {
      expect(_.hexToRgb("#FF0000")).toEqual([255, 0, 0])
    })
  })

  describe("stripHTML", () => {
    it("removes any html tags from text", () => {
      expect(_.stripHTML("<html><p>Hello <b>world</b>!</p></html>")).toBe(
        "Hello world!"
      )
    })
  })
})
