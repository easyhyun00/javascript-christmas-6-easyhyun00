import RestaurantMenu from "./RestaurantMenu";
import EVENT_CONSTANT from "../utils/Constant";

class BenefitEvent {
  #eventList;

  constructor(menuList, date) {
    this.#eventList = [];
    this.#processEvent(menuList, date);
  }

  #processEvent(menuList, date) {
    const totalPrice = RestaurantMenu.calculateTotalPrice(menuList);
    if (totalPrice >= EVENT_CONSTANT.혜택_최소_금액) {
      this.getChristmasEvent(date);
      this.getWeekEvent(menuList, date);
      this.getSpecialEvent(date);
      this.getGiveawayEvent(totalPrice);
    }
  }

  getSpecialEvent(date) {
    if (EVENT_CONSTANT.특별_할인_날짜.includes(date.getDate()))
      this.#eventList.push({ "특별 할인": -EVENT_CONSTANT.특별_할인_금액 });
  }

  getChristmasEvent(date) {
    if (date.getDate() <= EVENT_CONSTANT.크리스마스_날짜) {
      const price = date.getChristmasDdayEvent();
      this.#eventList.push({ "크리스마스 디데이 할인": -price });
    }
  }

  getGiveawayEvent(totalPrice) {
    if (totalPrice >= EVENT_CONSTANT.증정_이벤트_최소_금액)
      this.#eventList.push({ "증정 이벤트": -EVENT_CONSTANT.증정_이벤트_혜택_금액 });
  }

  getWeekEvent(menuList, date) {
    const dayOfWeek = date.getDayOfWeek();
    if (EVENT_CONSTANT.주말.includes(dayOfWeek)) {
      this.getWeekendEvent(menuList);
    } else {
      this.getWeekdayEvent(menuList);
    }
  }

  getWeekdayEvent(menuList) {
    const result = RestaurantMenu.countMenuCategory(menuList, "dessert");
    this.#eventList.push({ "평일 할인": -result * EVENT_CONSTANT.요일_할인_금액 });
  }

  getWeekendEvent(menuList) {
    const result = RestaurantMenu.countMenuCategory(menuList, "mainCourse");
    this.#eventList.push({ "주말 할인": -result * EVENT_CONSTANT.요일_할인_금액 });
  }

  getBenefitList() {
    return this.#eventList;
  }

  getTotalBenefitDiscount() {
    let totalDiscount = 0;
    this.#eventList.forEach((discount) => {
      const discountValue = Object.values(discount)[0];
      totalDiscount += discountValue;
    });
    return totalDiscount;
  }

  getPaymentDiscount() {
    let totalDiscount = 0;
    this.#eventList.forEach((discount) => {
      const discountType = Object.keys(discount)[0];
      const discountValue = Object.values(discount)[0];
      if (discountType !== "증정 이벤트") totalDiscount += discountValue;
    });
    return totalDiscount;
  }

  getPaymentAmount(menuList) {
    return RestaurantMenu.calculateTotalPrice(menuList) + this.getPaymentDiscount();
  }

  getBadge(menuList) {
    const payment = this.getPaymentAmount(menuList);
    switch (true) {
      case payment >= EVENT_CONSTANT.산타_증정_금액:
        return "산타";
      case payment >= EVENT_CONSTANT.트리_증정_금액:
        return "트리";
      case payment >= EVENT_CONSTANT.별_증정_금액:
        return "별";
      default:
        return "없음";
    }
  }
}

export default BenefitEvent;
