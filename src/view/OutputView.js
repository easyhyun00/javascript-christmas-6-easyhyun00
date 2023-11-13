import { Console } from "@woowacourse/mission-utils";
import { EVENT_MESSAGES } from "../utils/Message";

const OutputView = {
  printMessage(message) {
    Console.print(EVENT_MESSAGES[message]);
  },
  printResult(result) {
    Console.print(result);
  },
  printMenu(menuList) {
    Console.print("<주문 메뉴>");
    menuList.forEach((item) => {
      const formattedLine = `${item.name} ${item.quantity}개`;
      Console.print(formattedLine);
    });
  },
  printTotalPrice(price) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(this.formatPrice(price));
  },
  printGiveawayEvent(benefit) {
    Console.print("<증정 메뉴>");
    const isGiveaway = benefit.some((event) => "증정 이벤트" in event);
    Console.print(isGiveaway ? "샴페인 1개" : "없음");
  },
  printBenefits(benefit) {
    Console.print("<혜택 내역>");
    if (benefit.length === 0) {
      Console.print("없음");
      return;
    }
    benefit.forEach((data) => {
      const entries = Object.entries(data);
      entries.forEach(([key, value]) => {
        Console.print(`${key}: ${this.formatPrice(value)}`);
      });
    });
  },
  formatPrice(number) {
    return `${number.toLocaleString("ko-KR")}원`;
  },
};

export default OutputView;
