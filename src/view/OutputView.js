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
  formatPrice(number) {
    return `${number.toLocaleString("ko-KR")}원`;
  },
};

export default OutputView;
