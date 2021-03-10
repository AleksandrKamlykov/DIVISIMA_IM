const { module } = require("../../webpack.config");

function openModal(modalE) {
  const modal = document.querySelector(modalE);
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

function modal(modalT, modalE, modalC) {
  const modalTrigger = document.querySelector(modalT),
    modal = document.querySelector(modalE),
    modalCloseBtn = document.getElementById(modalC);

  modalTrigger.addEventListener("click", () => {
    openModal(modalE);
  });

  modalCloseBtn.addEventListener("click", () => {
    closeModal(modalE);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modalE);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalE);
    }
  });
}

export default modal;
