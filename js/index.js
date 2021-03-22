import { tns } from "../node_modules/tiny-slider/src/tiny-slider";

import filters from "./modules/filter.js";
import loadBTN from "./modules/loadBTN";
import cards from "./modules/cards.js";
import modal from "./modules/modal.js";
import form from "./modules/form.js";

window.addEventListener("DOMContentLoaded", () => {
  cards();

  modal(".shop", ".modal-wrapper", "closeModal");
  form("form", ".modal__dialog", ".modal-wrapper");
});

function active() {
  tns({
    container: ".slider__wrapper",
    items: 4,
    slideBy: 1,
    speed: 500,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2500,
    autoplayText: ["▶", "❚❚"],
    swipeAngle: false,
    gutter: 30,
  });

  filters(".box", ".load-more__btn", ".hide__btn", ".filter-wrapper");
  loadBTN(".top-more", ".load-more__btn", ".hide__btn");
}
export default active;
