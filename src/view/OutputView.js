import { Console } from "@woowacourse/mission-utils";
import { EVENT_MESSAGES } from "../utils/Message";

const OutputView = {
  printMessage(message) {
    Console.print(EVENT_MESSAGES[message]);
  },
  printResult(result) {
    Console.print(result);
  },
  printMenu() {
    Console.print("<주문 메뉴>");
  },
};

export default OutputView;
