import { dataArray } from "../dataArray.js";
import { renderGoods } from "./render.js";
import {
  modalCheckbox,
  modalInputDiscount,
  getTableSum,
  getVendorCode,
} from "./var.js";

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

export const addProduct = (overlay, modalForm, table, total, addGoods) => {
  addGoods.addEventListener("click", () => {
    modalOpen(overlay, modalForm);
    controlCheckbox(modalCheckbox, modalInputDiscount);
  });
  uploadFile();
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
  submitProduct(modalForm, table, total, overlay);
};

export const deleteRow = (list, arr, table, total) => {
  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const tr = target.closest("tr");
      const id = tr.querySelector(".table__cell_name").dataset.id;
      console.log(id);
      arr.splice(id, 1);
      tr.remove();
      renderGoods(arr, table);
      const tableSum = getTableSum();
      const totalprice = totalUpdate(total, tableSum);
      total.textContent = ` $ ${totalprice}`;
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

const controlCheckbox = (modalCheckbox, modalInputDiscount) => {
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

const submitProduct = (modalForm, table, total, overlay) => {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = getVendorCode();
    const formData = new FormData(e.target);
    formData.append("id", id.textContent);
    const newProduct = Object.fromEntries(formData);
    dataArray.push(newProduct);
    renderGoods(dataArray, table);
    const tableSum = getTableSum();
    const totalprice = totalUpdate(total, tableSum);
    total.textContent = ` $ ${totalprice}`;
    modalForm.reset();
    modalClose(overlay);
  });
};

const uploadFile = () => {
  const fieldset = document.querySelector(".modal__fieldset");
  const input = document.querySelector(".modal__file");
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  fieldset.append(wrapper);

  input.addEventListener("change", () => {
    if (input.files.length > 0) {
      if (input.files[0].size < 1000000) {
        const preview = document.createElement("img");
        preview.classList.add("preview");
        const src = URL.createObjectURL(input.files[0]);
        console.log(input.files[0].size);
        preview.src = src;
        preview.style.display = "block";
        wrapper.append(preview);
      } else {
        const message = document.createElement("p");
        message.classList.add("message");
        message.textContent = "Изображение не должно превышать размер 1 мб";
        wrapper.append(message);
      }
    }
  });
};
