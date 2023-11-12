import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readInput() {
    const input = await Console.readLineAsync();
    return input;
  },
};

export default InputView;
