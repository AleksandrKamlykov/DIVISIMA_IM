const { module } = require("../../webpack.config");

function form(formID, modalD, modalE) {
  // FORMS
  const modal = document.querySelector(modalE);
  const forms = document.getElementById(formID);
  const message = {
    loading: "../img/spinner.svg",
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
          showThanksModal(message.success, modalD);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure, modalD);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  function openModal() {
    console.log(modal);
    modal.classList.add("show");
    modal.classList.remove("hide");
    modal.classList.remove("hide-modal");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modalE) {
    const modal = document.querySelector(modalE);
    modal.classList.add("hide-modal");
    modal.classList.remove("show");
    // Либо вариант с toggle - но тогда назначить класс в верстке
    document.body.style.overflow = "";
  }

  function showThanksModal(message, modalD) {
    const prevModalDialog = document.querySelector(modalD);
    prevModalDialog.classList.add("hide");
    console.log("1");
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
}

export default form;
