import { Console } from "@woowacourse/mission-utils";
import OutputView from "../view/OutputView";
import InputView from "../view/InputView";
import OrderDate from "../model/OrderDate";
import OrderMenu from "../model/OrderMenu";

class EventPlanner {
  constructor() {}

  // 이벤트 시작
  async eventStart() {
    this.receiveOrder(); // 주문 받기
  }

  // 주문 받기
  async receiveOrder() {
    OutputView.printMessage("GRETTING");
    const date = await this.receiveOrderOnDate();
    const menu = await this.receiveOrderMenu();
  }

  // 날짜 주문 받기
  async receiveOrderOnDate() {
    OutputView.printMessage("ORDER_DATE");
    const date = await InputView.readInput();
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

  // 메뉴 입력 받기
  async receiveOrderMenu() {
    OutputView.printMessage("ORDER_MENU");
    const menu = await InputView.readInput();
    OutputView.printResult(menu);
    return this.setOrderMenu(menu);
  }

  // 메뉴 클래스 객체에 저장
  setOrderMenu(menu) {
    try {
      return new OrderMenu(menu);
    } catch ({ message }) {
      OutputView.printResult(message);
      return this.receiveOrderMenu();
    }
  }
}

export default EventPlanner;
