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
    if (date < EVENT_CONSTANT.첫_날 || date > EVENT_CONSTANT.마지막_날) {
      throw new Error(ERROR_MESSAGES.예약_날짜_예외);
    }
    if (!Number.isInteger(date)) {
      throw new Error(ERROR_MESSAGES.예약_날짜_예외);
    }
  }

  getDate() {
    return this.#date;
  }

  getDayOfWeek() {
    const date = new Date(EVENT_CONSTANT.이벤트_년, EVENT_CONSTANT.이벤트_월, this.getDate());
    const koreanDate = new Date(date.getTime() + EVENT_CONSTANT.KST_변환);
    const dayOfWeek = koreanDate.getDay();
    return EVENT_CONSTANT.요일[dayOfWeek];
  }

  getChristmasDdayEvent() {
    const day = this.getDate();
    return (
      EVENT_CONSTANT.크리스마스_이벤트_금액 + (day - 1) * EVENT_CONSTANT.크리스마스_이벤트_증가액
    );
  }
}

export default OrderDate;
