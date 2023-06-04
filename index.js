import { dataArray } from "./dataArray.js";

const modalTitle = document.querySelector(".modal__title");
const modalForm = document.querySelector(".modal__form");
const modalCheckbox = document.querySelector(".modal__checkbox");
const modalInputDiscount = document.querySelector(".modal__input_discount");

const overlay = document.querySelector(".overlay");
overlay.classList.remove("active");

// dataArray.forEach((elem) => {
//   const total = elem.price * elem.count;
//   console.log(total);
//   totalprice += elem.price * elem.count;
// });

// total.textContent = `$${totalprice}`;

// console.log("allprod: ", totalprice);
const createRow = (obj) => {
  const { nr, id, name, price, category, count, units } = obj;
  const tr = document.createElement("tr");
  const tdNumber = document.createElement("td");
  tdNumber.classList.add("table__cell");
  tdNumber.textContent = id;
  const product = document.createElement("td");
  product.classList.add("table__cell", "table__cell_left", "table__cell_name");
  product.dataset.id = id;
  product.textContent = name;
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
  sum.classList.add("table__cell", "table__sum");
  const total = count * price;
  sum.textContent = `$${total}`;

  const wrapper = document.createElement("td");
  wrapper.classList.add("table__cell", "table__cell_btn-wrapper");
  const picBtn = document.createElement("button");
  picBtn.classList.add("table__btn", "table__btn_pic");
  const editBtn = document.createElement("button");
  editBtn.classList.add("table__btn", "table__btn_edit");
  const delBtn = document.createElement("button");
  delBtn.classList.add("table__btn", "table__btn_del");
  wrapper.append(picBtn, editBtn, delBtn);

  tr.append(
    tdNumber,
    product,
    tdCategory,
    tdUnits,
    tdCount,
    tdPrice,
    sum,
    wrapper
  );
  return tr;
};
const table = document.querySelector(".table__body");

const renderGoods = (arr) => {
  table.textContent = "";
  const data = arr.map(createRow);
  table.append(...data);
};

renderGoods(dataArray);
const modalOpen = () => {
  overlay.classList.add("active");
};
const modalClose = () => {
  overlay.classList.remove("active");
};

const addGoods = document.querySelector(".panel__add-goods");
addGoods.addEventListener("click", () => {
  modalOpen();
  // При открытии модального окна должен генерироваться случайный id и заполняться span с классом vendor-code__id
  const vendorCode = document.querySelector(".vendor-code__id");
  vendorCode.textContent = Math.floor(Math.random() * 1000000);
  modalForm.total.textContent = 0;
});
overlay.addEventListener("click", (e) => {
  const target = e.target;
  if (target === overlay || target.closest(".modal__close")) {
    modalClose();
  }
});
const list = document.querySelector(".goods__table");

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

// В форме если поставить чекбокс должен быть разблокирован input с name discount_count
// Если чекбокс убрать поле discount_count очищается и блокируется

modalCheckbox.addEventListener("click", () => {
  if (modalCheckbox.checked) {
    modalInputDiscount.removeAttribute("disabled");
    modalInputDiscount.setAttribute("required", "true");
  }
  if (!modalCheckbox.checked) {
    modalInputDiscount.value = "";
    modalInputDiscount.removeAttribute("required");
    modalInputDiscount.setAttribute("disabled", "true");
  }
});

// Итоговая стоимость в модальном окне должна правильно высчитываться при смене фокуса
modalForm.price.addEventListener("change", (e) => {
  const total = modalForm.price.value * modalForm.count.value;
  modalForm.total.textContent = total;
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newProduct = Object.fromEntries(formData);

  table.append(createRow(newProduct));
  modalForm.reset();
  modalClose();
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
