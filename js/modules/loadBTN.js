///  Load more btn

function loadBTN(topMore, loadMoreBtn, hideBtn) {
  const productsMore = document.querySelectorAll(topMore),
    btnMore = document.querySelector(loadMoreBtn),
    btnHide = document.querySelector(hideBtn);

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

export default loadBTN;
