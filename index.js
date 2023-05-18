import { dataArray } from "./dataArray.js";

const modalTitle = document.querySelector(".modal__title");
const modalForm = document.querySelector(".modal__form");
const modalCheckbox = document.querySelector(".modal__checkbox");
const modalInputDiscount = document.querySelector(".modal__input_discount");
// console.log(modalTitle, modalForm, modalCheckbox, modalInputDiscount);

const overlay = document.querySelector(".overlay");
overlay.classList.remove("active");

const createRow = (obj) => {
  const { nr, id, title, price, category, count, units } = obj;
  const tr = document.createElement("tr");
  const tdNumber = document.createElement("td");
  tdNumber.classList.add("table__cell");
  tdNumber.textContent = id;
  const product = document.createElement("td");
  product.classList.add("table__cell", "table__cell_left", "table__cell_name");
  product.dataset.id = id;
  product.textContent = title;
  const idSpan = document.createElement("span");
  idSpan.classList.add("table__cell-id");
  idSpan.textContent = `id: ${id}`;

  product.append(idSpan);
  const tdCategory = document.createElement("td");
  tdCategory.classList.add("table__cell", "table__cell_left");
  tdCategory.textContent = category;
  const tdUnits = document.createElement("td");
  tdUnits.classList.add("table__cell");
  tdUnits.textContent = units;
  const tdCount = document.createElement("td");
  tdCount.classList.add("table__cell");
  tdCount.textContent = count;
  const tdPrice = document.createElement("td");
  tdPrice.classList.add("table__cell");
  tdPrice.textContent = `$${price}`;
  const sum = document.createElement("td");
  sum.classList.add("table__cell");
  sum.textContent = `$${count * price}`;

const wrapper = document.createElement('td')
wrapper.classList.add('table__cell', 'table__cell_btn-wrapper')
  const picBtn = document.createElement('button')
  picBtn.classList.add('table__btn', 'table__btn_pic')
  const editBtn = document.createElement('button')
  editBtn.classList.add('table__btn', 'table__btn_edit')
  const delBtn = document.createElement('button')
  delBtn.classList.add('table__btn', 'table__btn_del')
  wrapper.append(picBtn, editBtn, delBtn)

  tr.append(tdNumber, product, tdCategory, tdUnits,tdCount, tdPrice, sum, wrapper)
return tr
};

const renderGoods = (arr) => {
  const table = document.querySelector('.table__body')
  table.textContent = ''
const data = arr.map(createRow)
table.append(...data)
};

renderGoods(dataArray)