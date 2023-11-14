import OutputView from "../view/OutputView";
import InputView from "../view/InputView";
import OrderDate from "../model/OrderDate";
import OrderMenu from "../model/OrderMenu";
import RestaurantMenu from "../model/RestaurantMenu";
import BenefitEvent from "../model/BenefitEvent";

class EventPlanner {
  async eventStart() {
    const { date, menu } = await this.receiveOrder();
    const menuList = menu.getOrderMenuList();
    this.displayOrderInfo(menuList);
    const benefit = this.displayReceivedEvent(menuList, date);
    this.displayMoney(menuList, benefit);
    this.displayBadge(benefit);
  }

  displayBadge(benefit) {
    OutputView.printBadge(benefit.getBadge());
  }

  displayMoney(menuList, benefit) {
    OutputView.printTotalDiscout(benefit.getTotalBenefitDiscount());
    OutputView.printPaymentAmount(benefit.getPaymentAmount(menuList));
  }

  displayReceivedEvent(menuList, date) {
    const benefit = new BenefitEvent(menuList, date);
    const benefitList = benefit.getBenefitList();
    OutputView.printGiveawayEvent(benefitList);
    OutputView.printBenefits(benefitList);
    return benefit;
  }

  displayOrderInfo(menuList) {
    OutputView.printMenu(menuList);
    OutputView.printTotalPrice(RestaurantMenu.calculateTotalPrice(menuList));
  }

  async receiveOrder() {
    OutputView.printMessage("첫_인사");
    const date = await this.receiveOrderOnDate();
    const menu = await this.receiveOrderMenu();
    return { date, menu };
  }

  async receiveOrderOnDate() {
    OutputView.printMessage("예약_날짜");
    const date = await InputView.readDate();
    OutputView.printResult(date);
    return this.setOrderOnDate(date);
  }

  setOrderOnDate(date) {
    try {
      return new OrderDate(Number(date));
    } catch ({ message }) {
      OutputView.printResult(message);
      return this.receiveOrderOnDate();
    }
  }

  async receiveOrderMenu() {
    OutputView.printMessage("주문_메뉴");
    const menu = await InputView.readMenu();
    OutputView.printResult(menu);
    return this.setOrderMenu(menu);
  }

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
