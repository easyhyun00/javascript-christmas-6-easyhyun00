import { Console } from "@woowacourse/mission-utils";
import { EVENT_MESSAGES } from "../utils/Message";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(EVENT_MESSAGES.예약_날짜);
    return input;
  },
  async readMenu() {
    const input = await Console.readLineAsync(EVENT_MESSAGES.주문_메뉴);
    return input;
  },
};

export default InputView;
