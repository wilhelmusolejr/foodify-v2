import {
  faBacon,
  faBowlRice,
  faBreadSlice,
  faBurger,
  faCarrot,
  faCheese,
  faCookie,
  faEgg,
  faFish,
  faIceCream,
  faMartiniGlass,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

export function randomFoodIcon() {
  let icons = [
    faBacon,
    faBowlRice,
    faBurger,
    faCarrot,
    faCheese,
    faBreadSlice,
    faUtensils,
    faFish,
    faCookie,
    faIceCream,
    faMartiniGlass,
    faEgg,
  ];

  let icon = icons[Math.floor(Math.random() * icons.length)];

  return icon;
}
