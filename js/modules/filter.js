/// Filter

function filters(box, loadBtn, hideBTN, filterW) {
  const filterBox = document.querySelectorAll(box),
    btnMore = document.querySelector(loadBtn),
    btnHide = document.querySelector(hideBTN);

  document.querySelector(filterW).addEventListener("click", (event) => {
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

export default filters;
