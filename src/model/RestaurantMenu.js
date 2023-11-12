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
};

export default RestaurantMenu;
