import { dataArray } from "../dataArray.js";
import { renderGoods } from "./render.js";
import { getTableSum, getVendorCode } from "./var.js";

const modalOpen = (overlay, form) => {
  overlay.classList.add("active");
  const vendorCode = getVendorCode();
  // При открытии модального окна должен генерироваться случайный id и заполняться span с классом vendor-code__id
  const id = Math.floor(Math.random() * 1000000);
  vendorCode.textContent = id;
  form.total.textContent = 0;
};
const modalClose = (overlay) => {
  overlay.classList.remove("active");
};

export const addProduct = (overlay, modalForm) => {
  const addGoods = document.querySelector(".panel__add-goods");
  addGoods.addEventListener("click", () => {
    modalOpen(overlay, modalForm);
  });
  // Итоговая стоимость в модальном окне должна правильно высчитываться при смене фокуса
  modalForm.price.addEventListener("change", (e) => {
    const total = modalForm.price.value * modalForm.count.value;
    modalForm.total.textContent = total;
  });
  overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === overlay || target.closest(".modal__close")) {
      modalClose(overlay);
    }
  });
};

// В форме если поставить чекбокс должен быть разблокирован input с name discount_count
// Если чекбокс убрать поле discount_count очищается и блокируется
export const controlCheckbox = (modalCheckbox, modalInputDiscount) => {
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
};

export const totalUpdate = (total, arr) => {
  total.textContent = "";
  let totalprice = 0;
  arr.forEach((elem) => {
    const sum = elem.innerHTML;
    totalprice += +sum.slice(1);
  });
  return totalprice;
};
export const deleteRow = (list, arr, table, total) => {
  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const tr = target.closest("tr");
      const id = tr.querySelector(".table__cell_name").dataset.id;
      arr.splice(id - 1, 1);
      tr.remove();
      renderGoods(arr, table);
      const tableSum = getTableSum();
      const totalprice = totalUpdate(total, tableSum);
      total.textContent = ` $ ${totalprice}`;
    }
  });
};
export const submitProduct = (modalForm, table, total, overlay) => {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = getVendorCode();
    const formData = new FormData(e.target);
    formData.append("id", id.textContent);
    const newProduct = Object.fromEntries(formData);

    dataArray.push(newProduct);
    console.log(newProduct);
    renderGoods(dataArray, table);
    const tableSum = getTableSum();
    const totalprice = totalUpdate(total, tableSum);
    console.log(tableSum);
    total.textContent = ` $ ${totalprice}`;
    modalForm.reset();
    modalClose(overlay);
  });
};
