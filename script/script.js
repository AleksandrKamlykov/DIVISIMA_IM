"use strict";

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

getResource("http://localhost:3000/cards")
  .then((data) => {
    data.forEach(({ src, title, price, parentSelector, classes }) => {
      new MenuCard(src, title, price, parentSelector, classes).render();
    });
  })
  .then(function () {
    a();
    filters();
    loadBTN();
  });

async function getResource(url) {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
}

// Slider

function a() {
  $(document).ready(function () {
    $(".slider__wrapper").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
}

/// Filter

function filters() {
  const filterBox = document.querySelectorAll(".box"),
    btnMore = document.querySelector(".load-more__btn"),
    btnHide = document.querySelector(".hide__btn");

  document
    .querySelector(".filter-wrapper")
    .addEventListener("click", (event) => {
      if (event.target.tagName !== "LI") return false;
      let filterClass = event.target.dataset["f"];

      filterBox.forEach((elem) => {
        ///elem.classList.remove('hide');
        elem.style.display = "block";
        if (!elem.classList.contains(filterClass) && filterClass !== "all") {
          /// elem.classList.add('hide');
          elem.style.display = "none";
        }
        if (!elem.classList.contains(filterClass) && filterClass == "all") {
          btnMore.style.display = "none"; // убираем кнопку
          btnHide.style.display = "block";
        }
      });
    });
}

///  Load more btn

function loadBTN() {
  const productsMore = document.querySelectorAll(".top-more"),
    btnMore = document.querySelector(".load-more__btn"),
    btnHide = document.querySelector(".hide__btn");

  btnMore.addEventListener("click", () => {
    productsMore.forEach((elem) => {
      elem.style.display = "block"; // добавляем элементы
      /// elem.classList.remove('.top-more')
    });
    btnMore.style.display = "none"; // убираем кнопку
    btnHide.style.display = "block";
  });

  btnHide.addEventListener("click", () => {
    productsMore.forEach((elem) => {
      elem.style.display = "none";
    });
    btnHide.style.display = "none";
    btnMore.style.display = "block";
  });
}

/// MODAL

const modalTrigger = document.querySelector(".shop"),
  modal = document.querySelector(".modal-wrapper"),
  modalCloseBtn = document.getElementById("closeModal");

modalTrigger.addEventListener("click", () => {
  openModal();
});

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  modal.classList.remove("hide-modal");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hide-modal");
  modal.classList.remove("show");
  // Либо вариант с toggle - но тогда назначить класс в верстке
  document.body.style.overflow = "";
}

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

// FORMS

const forms = document.getElementById("form");
const message = {
  loading: "img/spinner.svg",
  success: "Спасибо! Ваш заказ принят",
  failure: "Что-то пошло не так...",
};

bindPostData(forms);

const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return await res.json();
};

async function getResource(url) {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
}

function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let statusMessage = document.createElement("img");
    statusMessage.style.margin = "auto";
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
    form.insertAdjacentElement("afterend", statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });
  });
}

function showThanksModal(message) {
  const prevModalDialog = document.querySelector(".modal__dialog");

  prevModalDialog.classList.add("hide");
  openModal();

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");
  thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
  document.querySelector(".modal").append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide");
    closeModal();
  }, 4000);
}
