import { Console } from "@woowacourse/mission-utils";
import { EVENT_MESSAGES } from "../utils/Message";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(EVENT_MESSAGES.ORDER_DATE);
    return input;
  },
  async readMenu() {
    const input = await Console.readLineAsync(EVENT_MESSAGES.ORDER_MENU);
    return input;
  },
};

export default InputView;
