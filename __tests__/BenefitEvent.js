import BenefitEvent from "../src/model/BenefitEvent";
import OrderDate from "../src/model/OrderDate";

const testCases = [
  {
    menuList: [
      { name: "크리스마스파스타", quantity: 1 },
      { name: "바비큐립", quantity: 1 },
      { name: "초코케이크", quantity: 1 },
    ],
    orderDate: 10,
    expectedEventList: [
      { "크리스마스 디데이 할인": -1900 },
      { "평일 할인": -2023 },
      { "특별 할인": -1000 },
    ],
  },
  {
    menuList: [
      { name: "티본스테이크", quantity: 1 },
      { name: "바비큐립", quantity: 1 },
      { name: "해산물파스타", quantity: 1 },
    ],
    orderDate: 29,
    expectedEventList: [{ "주말 할인": -6069 }, { "증정 이벤트": -25000 }],
  },
  {
    menuList: [{ name: "시저샐러드", quantity: 1 }],
    orderDate: 15,
    expectedEventList: [],
  },
  {
    menuList: [
      { name: "티본스테이크", quantity: 2 },
      { name: "바비큐립", quantity: 1 },
      { name: "해산물파스타", quantity: 1 },
      { name: "아이스크림", quantity: 2 },
    ],
    orderDate: 25,
    expectedEventList: [
      { "크리스마스 디데이 할인": -3400 },
      { "평일 할인": -4046 },
      { "특별 할인": -1000 },
      { "증정 이벤트": -25000 },
    ],
  },
];

describe.each(testCases)("혜택 테스트", ({ menuList, orderDate, expectedEventList }) => {
  test("메뉴에 따른 혜택 내역 테스트", () => {
    const benefitEvent = new BenefitEvent(menuList, new OrderDate(orderDate));
    const eventList = benefitEvent.getBenefitList();
    expect(eventList).toEqual(expectedEventList);
  });
});
