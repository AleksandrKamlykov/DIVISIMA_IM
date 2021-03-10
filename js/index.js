import slider from "./modules/slider.js";
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
  slider(".slider__wrapper");
  filters(".box", ".load-more__btn", ".hide__btn", ".filter-wrapper");
  loadBTN(".top-more", ".load-more__btn", ".hide__btn");
}
export default active;
