const { module } = require("../../webpack.config");
import active from "../index";
function cards() {
  // created cards top selling classes

  class MenuCard {
    constructor(src, title, price, parentSelector, classes) {
      this.src = src;
      this.title = title;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 1.1;
      this.changeToUAH();

      this.addClasses();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    addClasses() {
      if (this.classes.length == 1 || this.classes.length > 1) {
        this.classes = this.classes.split(/,\s*/);
      }
    }

    render() {
      const element = document.createElement("div");
      element.classList.add("cards__item");

      if (this.classes.length === 0) {
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <div
            class="slider__item__img"
            style="background: url(${this.src})"
          ></div>
          <div class="item-info">
            <p>${this.title}</p>
            <span>${this.price}$</span>
          </div>
          <div class="products-links">
            <a
              class="product-like"
              href="#"
              style="background-image: url(img/like.png)"
            ></a>
            <a
              class="broduct-buy"
              href="#"
              style="background-image: url(img/bag.png)"
            ></a>
          </div>
        
    
      `;

      this.parent.append(element);
    }
  }

  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
  getResource("http://localhost:3000/cards")
    .then((data) => {
      data.forEach(({ src, title, price, parentSelector, classes }) => {
        new MenuCard(src, title, price, parentSelector, classes).render();
      });
    })
    .then(function () {
      active();
    });
}

export default cards;
