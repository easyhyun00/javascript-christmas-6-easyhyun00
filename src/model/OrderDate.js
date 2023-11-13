import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "../utils/Message";
import EVENT_CONSTANT from "../utils/Constant";

class OrderDate {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  #validate(date) {
    if (typeof date !== "number" || Number.isNaN(date)) {
      throw new Error(ERROR_MESSAGES.예약_날짜_예외);
    }
    if (date < EVENT_CONSTANT.START_DAY || date > EVENT_CONSTANT.END_DAY) {
      throw new Error(ERROR_MESSAGES.예약_날짜_예외);
    }
  }

  getDate() {
    return this.#date;
  }

  getDayOfWeek() {
    const date = new Date(2023, 12 - 1, this.getDate());
    const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const dayOfWeek = koreanDate.getDay();
    const daysOfWeekList = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeekList[dayOfWeek];
  }

  getChristmasDdayEvent() {
    const day = this.getDate();
    return 1000 + (day - 1) * 100;
  }
}

export default OrderDate;
