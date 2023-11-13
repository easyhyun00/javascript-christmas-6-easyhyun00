import { Console } from "@woowacourse/mission-utils";
import MenuData from "../utils/MenuData";

const RestaurantMenu = {
  appetizer: MenuData.appetizer,
  mainCourse: MenuData.mainCourse,
  dessert: MenuData.dessert,
  drink: MenuData.drink,

  isMenuExist(menuName) {
    return (
      menuName in this.appetizer ||
      menuName in this.mainCourse ||
      menuName in this.dessert ||
      menuName in this.drink
    );
  },

  calculateTotalPrice(menuList) {
    let totalPrice = 0;
    menuList.forEach((item) => {
      const { name, quantity } = item;
      const menuCategory = this.getMenuCategory(name);
      const menuPrice = MenuData[menuCategory][name];
      totalPrice += menuPrice * quantity;
    });
    return totalPrice;
  },

  // 메뉴의 카테고리를 가져오는 함수
  getMenuCategory(menuName) {
    switch (true) {
      case menuName in this.appetizer:
        return "appetizer";
      case menuName in this.mainCourse:
        return "mainCourse";
      case menuName in this.dessert:
        return "dessert";
      case menuName in this.drink:
        return "drink";
      default:
        return null;
    }
  },

  countMenuCategory(menuList, category) {
    return menuList.reduce((acc, item) => {
      const menuCategory = RestaurantMenu.getMenuCategory(item.name);
      if (menuCategory === category) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);
  },
};

export default RestaurantMenu;
