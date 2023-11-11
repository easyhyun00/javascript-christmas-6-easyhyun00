import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync();
    return input;
  },
};

export default InputView;
