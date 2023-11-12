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
}

export default OrderDate;
