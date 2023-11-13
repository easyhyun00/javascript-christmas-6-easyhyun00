import { Console } from "@woowacourse/mission-utils";
import RestaurantMenu from "./RestaurantMenu";
import EVENT_CONSTANT from "../utils/Constant";

class BenefitEvent {
  #eventList;

  constructor(menuList, date) {
    this.#eventList = [];
    this.#processEvent(menuList, date);
  }

  // 혜택 구하기
  #processEvent(menuList, date) {
    const totalPrice = RestaurantMenu.calculateTotalPrice(menuList);
    if (totalPrice >= 10000) {
      this.getChristmasEvent(date); // 크리스마스 디데이 이벤트
      this.getWeekEvent(menuList, date); // 요일 할인 이벤트
      this.getSpecialEvent(date); // 특별 할인 이벤트
      this.getGiveawayEvent(totalPrice); // 증정 이벤트
    }
  }

  // 특별 할인 이벤트
  getSpecialEvent(date) {
    if (EVENT_CONSTANT.특별_할인_날짜.includes(date.getDate()))
      this.#eventList.push({ "특별 할인": -1000 });
  }

  // 크리스마스 디데이 이벤트
  getChristmasEvent(date) {
    if (date.getDate() <= 25) {
      const price = date.getChristmasDdayEvent();
      this.#eventList.push({ "크리스마스 디데이 할인": -price });
    }
  }

  // 증정 이벤트
  getGiveawayEvent(totalPrice) {
    if (totalPrice >= 120000) this.#eventList.push({ "증정 이벤트": -25000 });
  }

  // 요일 이벤트
  getWeekEvent(menuList, date) {
    const dayOfWeek = date.getDayOfWeek();
    if (dayOfWeek === "금" || dayOfWeek === "일") {
      this.getWeekendEvent(menuList);
    } else {
      this.getWeekdayEvent(menuList);
    }
  }

  // 평일 이벤트
  getWeekdayEvent(menuList) {
    const result = RestaurantMenu.countMenuCategory(menuList, "dessert");
    this.#eventList.push({ "평일 할인": -result * 2023 });
  }

  // 주말 이벤트
  getWeekendEvent(menuList) {
    const result = RestaurantMenu.countMenuCategory(menuList, "mainCourse");
    this.#eventList.push({ "주말 할인": -result * 2023 });
  }

  getBenefitList() {
    return this.#eventList;
  }
}

export default BenefitEvent;
