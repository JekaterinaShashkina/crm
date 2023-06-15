import { dataArray } from "./dataArray.js";
import { addProduct, controlCheckbox, modalClose } from "./modules/control.js";
import { createRow } from "./modules/createElements.js";
import { renderGoods } from "./modules/render.js";
import {
  getList,
  getModalCheckbox,
  getModalForm,
  getModalInputDiscount,
  getOverlay,
  getTable,
} from "./modules/var.js";

const init = () => {
  const table = getTable();
  const modalCheckbox = getModalCheckbox();
  const modalInputDiscount = getModalInputDiscount();
  const modalForm = getModalForm();
  const overlay = getOverlay();
  const list = getList();

  overlay.classList.remove("active");
  renderGoods(dataArray, table);
  addProduct(overlay, modalForm);

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const tr = target.closest("tr");
      const id = tr.querySelector(".table__cell_name").dataset.id;
      dataArray.splice(id - 1, 1);
      tr.remove();
      totalUpdate();
    }
  });

  controlCheckbox(modalCheckbox, modalInputDiscount);

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    console.log(newProduct);
    table.append(createRow(newProduct));

    modalForm.reset();
    modalClose(overlay);
    totalUpdate();
  });
  const totalUpdate = () => {
    const total = document.querySelector(".cms__total-price");
    total.textContent = "";
    let totalprice = 0;
    const tableSum = document.querySelectorAll(".table__sum");
    tableSum.forEach((elem) => {
      const sum = elem.innerHTML;
      totalprice += +sum.slice(1);
    });
    total.textContent = ` $ ${totalprice}`;
  };
  totalUpdate();
};
init();

// const createHeader = () => {
//   const header = document.createElement("header");
//   header.classList.add("cms__header");
//   const headerTitle = document.createElement("h1");
//   headerTitle.classList.add("cms__title");
//   headerTitle.textContent = "CMS - ShopOnline";
//   const total = document.createElement("p");
//   total.classList.add("cms__total");
//   total.textContent = `Итоговая стоимость: `;
//   const totalPrice = document.createElement("span");
//   totalPrice.classList.add("cms__total-price");

//   total.append(totalPrice);

//   header.append(headerTitle, total);
//   return header;
// };
// const createContainer = () => {
//   const container = document.createElement("div");
//   container.classList.add("container");
//   const header = createHeader();
//   container.append(header);

//   return container;
// };
// const createGoods = () => {
//   const goods = document.createElement("div");
//   goods.classList.add("cms__goods", "goods");
//   const panel = document.createElement("div");
//   panel.classList.add("goods__panel panel");
//   const filterBtn = document.createElement("button");
//   filterBtn.classList.add("panel__filter");
//   filterBtn.textContent("Фильтр");
//   const searchForm = document.createElement("form");
//   searchForm.classList.add("panel__search");
//   const formInput = document.createElement("input");
//   formInput.type = "search";
//   formInput.classList.add("panel__input");
//   formInput.placeholder = "Поиск по наименованию и категории";
//   searchForm.append(formInput);
//   panel.append(filterBtn, searchForm);
// };
// const renderHeader = (app) => {
//   const container = createContainer();
//   app.append(container);
// };
// const init = (selectorApp) => {
//   const app = document.querySelector(selectorApp);
//   renderHeader(app);
// };
// init(".cms");
