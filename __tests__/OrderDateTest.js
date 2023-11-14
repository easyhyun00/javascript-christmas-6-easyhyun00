import OrderDate from "../src/model/OrderDate";

describe.each([["1일"], ["내일"]])(
  "방문 날짜 클래스 테스트 - 방문 날짜가 숫자가 아니면 예외 발생",
  (input) => {
    test("throws an exception", () => {
      expect(() => {
        new OrderDate(Number(input));
      }).toThrow("[ERROR]");
    });
  },
);

describe.each([["32"], ["1.5"], ["0"], ["-4"]])(
  "방문 날짜 클래스 테스트 - 방문 날짜가 1일부터 31일까지 정수가 아니면 예외 발생",
  (input) => {
    test("throws an exception", () => {
      expect(() => {
        new OrderDate(Number(input));
      }).toThrow("[ERROR]");
    });
  },
);
