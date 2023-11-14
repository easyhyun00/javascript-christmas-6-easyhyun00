import { Console } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";
import EventPlanner from "../src/controller/DecemberEventPlanner";
import BenefitEvent from "../src/model/BenefitEvent";
import OrderDate from "../src/model/OrderDate";

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => [...logSpy.mock.calls].join(LINE_SEPARATOR);

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

const testCases = [
  {
    menuList: [{ name: "시저샐러드", quantity: 1 }],
    orderDate: 15,
    result: ["<12월 이벤트 배지>", "없음"],
  },
  {
    menuList: [
      { name: "크리스마스파스타", quantity: 1 },
      { name: "바비큐립", quantity: 1 },
      { name: "초코케이크", quantity: 1 },
    ],
    orderDate: 24,
    result: ["<12월 이벤트 배지>", "별"],
  },
  {
    menuList: [{ name: "초코케이크", quantity: 5 }],
    orderDate: 17,
    result: ["<12월 이벤트 배지>", "트리"],
  },
  {
    menuList: [
      { name: "티본스테이크", quantity: 2 },
      { name: "바비큐립", quantity: 1 },
      { name: "해산물파스타", quantity: 1 },
      { name: "아이스크림", quantity: 2 },
    ],
    orderDate: 25,
    result: ["<12월 이벤트 배지>", "산타"],
  },
];

describe.each(testCases)("혜택 테스트", ({ menuList, orderDate, result }) => {
  test("12월 이벤트 배지 증정 결과 출력", async () => {
    const logSpy = getLogSpy();
    const eventPlanner = new EventPlanner();
    const benefit = new BenefitEvent(menuList, new OrderDate(orderDate));

    await eventPlanner.displayBadge(benefit);

    expectLogContains(getOutput(logSpy), result);
  });
});
