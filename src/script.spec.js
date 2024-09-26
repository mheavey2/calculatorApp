const {
  sum,
  subtract,
  divide,
  multiply,
  calculateExpression,
} = require("./script");

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

// describe("determine which calculation to perform based on operator and perform it", () => {
//   test("when plus is selected sum 2 numbers", () => {
//     expect(calculateExpression(x, y, "+")).toBe(18);
//   });
// });
