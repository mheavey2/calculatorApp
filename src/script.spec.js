const calculationFunctions = require("./script");
const { sum, subtract, divide, multiply } = calculationFunctions;

const x = 13;
const y = 5;

describe("check the calculation functions", () => {
  test("adds 2 numbers", () => {
    expect(sum(x, y)).toBe(18);
  }),
    test("subtract one number from another", () => {
      expect(subtract(x, y)).toBe(8);
    }),
    test("multiply 2 numbers", () => {
      expect(multiply(x, y)).toBe(65);
    });
  test("find the remainder of dividing one number by another", () => {
    expect(divide(x, y)).toBe(3);
  });
});
