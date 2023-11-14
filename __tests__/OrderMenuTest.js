import OrderMenu from "../src/model/OrderMenu";

describe.each([
  ["해산물파스타-1,"],
  [",타파스-2"],
  ["크리스마스파스타: 2"],
  ["초코케이크-1개"],
  ["바비큐립--1"],
  ["양송이수프-1.5"],
])("주문 메뉴 클래스 테스트", (input) => {
  test("잘못된 형식 입력 시 예외 발생", () => {
    expect(() => new OrderMenu(input)).toThrow("[ERROR]");
  });
});

describe("주문 메뉴 클래스 테스트", () => {
  const testError = (menu) => expect(() => new OrderMenu(menu)).toThrow("[ERROR]");
  test("없는 메뉴 입력시 예외 발생", () => testError("토마토파스타-1"));
  test("음료만 메뉴 입력시 예외 발생", () => testError("레드와인-1"));
  test("중복된 메뉴 입력시 예외 발생", () => testError("양송이수프-1,초코케이크-1,양송이수프-2"));
  test("메뉴 개수 20개 초과 입력시 예외 발생", () => testError("타파스-19,바비큐립-2"));
});
