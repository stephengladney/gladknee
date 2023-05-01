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
    it("returns a single digit with a leading zero", () => {
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
      expect(_.getAmountOfTimeFromSeconds(200000)).toEqual({
        years: 0,
        months: 0,
        weeks: 0,
        days: 2,
        hours: 7,
        minutes: 33,
        seconds: 20,
      })
    })
  })

  describe("getSecondsFromAmountOfTime", () => {
    it("returns the correct number of seconds", () => {
      expect(
        _.getSecondsFromAmountOfTime({
          years: 0,
          months: 0,
          weeks: 0,
          days: 2,
          hours: 7,
          minutes: 33,
          seconds: 20,
        })
      ).toEqual(200000)
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
    it("enforces the maximum length", () => {
      expect(_.truncate("Hello world", 8)).toBe("Hello wo...")
    })

    it("uses a custom ending", () => {
      expect(_.truncate("Hello world", 8, "/")).toBe("Hello wo/")
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
      expect(_.areArraysEqual(arr, arrShuffled, false)).toBe(true)
      expect(_.areArraysEqual(arr, arrShuffled)).toBe(false)
    })
  })

  describe("clampArray", () => {
    it("enforces the maximum limit", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      expect(_.clampArray(arr, 0, 4)).toEqual([0, 1, 2, 3])
    })

    it("enforces the minimum limit and uses filler", () => {
      const arr = [0, 1]
      expect(_.clampArray(arr, 3, null, "x")).toEqual([0, 1, "x"])
    })
  })
})
