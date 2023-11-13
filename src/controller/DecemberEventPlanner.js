import { Console } from "@woowacourse/mission-utils";
import OutputView from "../view/OutputView";
import InputView from "../view/InputView";
import OrderDate from "../model/OrderDate";
import OrderMenu from "../model/OrderMenu";
import RestaurantMenu from "../model/RestaurantMenu";
import BenefitEvent from "../model/BenefitEvent";

class EventPlanner {
  constructor() {}

  // 이벤트 시작
  async eventStart() {
    const { date, menu } = await this.receiveOrder(); // 주문 받기
    const menuList = menu.getOrderMenuList();
    this.displayOrderInfo(menuList); // 주문 내역 보여주기
    const benefit = this.displayReceivedEvent(menuList, date); // 이벤트 받은 내역 보여주기
    this.displayMoney(menuList, benefit); // 결과 출력하기
    this.displayBadge(menuList, benefit);
  }

  // 배지 출력하기
  displayBadge(menuList, benefit) {
    OutputView.printBadge(benefit.getBadge(menuList));
  }

  // 금액 출력
  displayMoney(menuList, benefit) {
    OutputView.printTotalDiscout(benefit.getTotalBenefitDiscount());
    OutputView.printPaymentAmount(benefit.getPaymentAmount(menuList));
  }

  // 이벤트 받은 내역
  displayReceivedEvent(menuList, date) {
    const benefit = new BenefitEvent(menuList, date);
    const benefitList = benefit.getBenefitList();
    OutputView.printGiveawayEvent(benefitList);
    OutputView.printBenefits(benefitList);
    return benefit;
  }

  // 주문 내역 출력
  displayOrderInfo(menuList) {
    OutputView.printMenu(menuList); // 메뉴 출력
    OutputView.printTotalPrice(RestaurantMenu.calculateTotalPrice(menuList));
  }

  // 주문 받기
  async receiveOrder() {
    OutputView.printMessage("GRETTING");
    const date = await this.receiveOrderOnDate();
    const menu = await this.receiveOrderMenu();
    return { date, menu };
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

  // 메뉴 입력 받기
  async receiveOrderMenu() {
    OutputView.printMessage("ORDER_MENU");
    const menu = await InputView.readMenu();
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
