import { Console } from "@woowacourse/mission-utils";
import OutputView from "../view/OutputView";
import InputView from "../view/InputView";
import OrderDate from "../model/OrderDate";

class EventPlanner {
  constructor() {}

  async eventStart() {
    this.receiveOrder(); // 주문 받기
  }

  // 주문 받기
  receiveOrder() {
    OutputView.printMessage("GRETTING");
    const date = this.receiveOrderOnDate();
  }

  // 날짜 주문 받기
  async receiveOrderOnDate() {
    OutputView.printMessage("ORDER_DATE");
    const date = await InputView.readDate();
    OutputView.printResult(date);
    return this.setOrderOnDate(date);
  }

  // 날짜 클래스 객체에 저장
  setOrderOnDate(date) {
    try {
      return new OrderDate(Number(date));
    } catch ({ message }) {
      OutputView.printResult(message);
      return this.receiveOrderOnDate();
    }
  }
}

export default EventPlanner;
