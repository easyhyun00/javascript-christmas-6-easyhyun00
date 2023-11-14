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
    resultList: ["<총혜택 금액>", "0원", "<할인 후 예상 결제 금액>", "8,000원"],
  },
  {
    menuList: [
      { name: "티본스테이크", quantity: 2 },
      { name: "바비큐립", quantity: 1 },
      { name: "해산물파스타", quantity: 1 },
      { name: "아이스크림", quantity: 2 },
    ],
    orderDate: 25,
    resultList: ["<총혜택 금액>", "-33,446원", "<할인 후 예상 결제 금액>", "200,554원"],
  },
];

describe.each(testCases)("혜택 테스트", ({ menuList, orderDate, resultList }) => {
  test("총 혜택 금액, 할인 후 예상 결제 금액 출력", async () => {
    const logSpy = getLogSpy();
    const eventPlanner = new EventPlanner();
    const benefit = new BenefitEvent(menuList, new OrderDate(orderDate));

    await eventPlanner.displayMoney(menuList, benefit);

    expectLogContains(getOutput(logSpy), resultList);
  });
});
