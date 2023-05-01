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
