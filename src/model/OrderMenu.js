import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "../utils/Message";
import RestaurantMenu from "./RestaurantMenu";

class OrderMenu {
  constructor(menu) {
    this.menuData = menu;
    this.orderItems = {};
    this.#processMenu(menu);
  }

  #processMenu(menuString) {
    const menuList = menuString.split(",");
    menuList.forEach((order) => {
      const [menuName, menuCount] = order.split("-");
      this.#validate(menuName, Number(menuCount));
    });
  }

  #validate(menuName, menuCount) {
    if (
      !menuName ||
      Number.isNaN(menuCount) ||
      menuCount < 1 ||
      !RestaurantMenu.isMenuExist(menuName) ||
      this.isOnlyDrink(menuName) ||
      menuName in this.orderItems ||
      this.calculateTotalCount() + menuCount > 20
    ) {
      throw new Error(ERROR_MESSAGES.주문_메뉴_예외);
    }
    this.addOrder(menuName, menuCount);
  }

  isOnlyDrink(menuName) {
    const commaCount = (this.menuData.match(/,/g) || []).length;
    const isDrink = menuName in RestaurantMenu.drink;
    return commaCount === 0 && isDrink;
  }

  calculateTotalCount() {
    return Object.values(this.orderItems).reduce((total, qty) => total + qty, 0);
  }

  addOrder(menuName, menuCount) {
    this.orderItems[menuName] = menuCount;
  }
}

export default OrderMenu;
