import { dataArray } from "../dataArray.js";
import { fetchRequest } from "./fetchRequest.js";
import { renderGoods } from "./render.js";
import {
  modalCheckbox,
  modalInputDiscount,
  getTableSum,
  getVendorCode,
  modalForm,
} from "./var.js";

const modalOpen = (overlay, form) => {
  overlay.classList.add("active");
  const vendorCode = getVendorCode();
  // При открытии модального окна должен генерироваться случайный id и заполняться span с классом vendor-code__id
  const id = Math.floor(Math.random() * 1000000);
  vendorCode.textContent = id;
  form.total.textContent = 0;
  const fieldset = document.querySelector(".modal__fieldset");
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  fieldset.append(wrapper);
};
export const modalClose = (overlay) => {
  overlay.classList.remove("active");
  modalForm.reset();
};

export const addProduct = (overlay, modalForm, total, addGoods) => {
  addGoods.addEventListener("click", () => {
    modalOpen(overlay, modalForm);
    controlCheckbox(modalCheckbox, modalInputDiscount);
    total.textContent = "";
    console.log(total);
  });
  getCategory();
  uploadFile();
  // Итоговая стоимость в модальном окне должна правильно высчитываться при смене фокуса
  priceControl(modalForm);
  overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === overlay || target.closest(".modal__close")) {
      modalClose(overlay);
    }
  });
  submitProduct(modalForm, overlay);
};

export const deleteRow = (list) => {
  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const confirm = document.querySelector(".confirm__overlay");
      const agreeBtn = confirm.querySelector(".modal__submit");
      const closeBtn = confirm.querySelector(".modal__cancel");
      confirm.classList.add("active");
      confirm.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target === agreeBtn) {
          const tr = target.closest("tr");
          const id = tr.querySelector(".table__cell-id").textContent.slice(4);
          console.log(id);
          tr.remove();
          fetchRequest(`goods/${id}`, {
            method: "DELETE",
          });
          modalClose(confirm);
        } else if (
          e.target.closest(".confirm__overlay") ||
          e.target.closest(".modal__close") ||
          e.target === closeBtn
        ) {
          modalClose(confirm);
        }
      });
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
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", (err) => {
      reject(err);
    });
    reader.readAsDataURL(file);
  });

export const submitProduct = (modalForm, overlay, id) => {
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.image = await toBase64(newProduct.image);
    console.log(newProduct.image);
    if (id) {
      const resp = fetchRequest(`goods/${id}`, {
        method: "PATCH",
        body: newProduct,
      });
    } else {
      const resp = fetchRequest("goods", {
        method: "POST",
        body: newProduct,
        // callback: (err, data) => {
        //   if (err) {
        //     console.warn(err, data);
        //     return;
        //   }
        // },
      });
      // console.log(resp);
    }

    modalForm.reset();
    modalClose(overlay);
    const goods = fetchRequest("goods", {
      callback: renderGoods,
    });
  });
};

const uploadFile = () => {
  const input = document.querySelector(".modal__file");
  input.addEventListener("change", () => {
    const wrapper = document.querySelector(".wrapper");
    console.log(wrapper);

    if (input.files.length > 0) {
      if (input.files[0].size < 1000000) {
        const preview = document.createElement("img");
        preview.classList.add("preview");
        const src = URL.createObjectURL(input.files[0]);
        console.log(input.files[0].size, src);
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
const datalist = document.querySelector("#category-list");
const getCategory = () => {
  const data = fetchRequest("category", {
    method: "GET",
    callback: createCategory,
  });
  // console.log(data);
};
const createCategory = (data, err) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const categories = data.map((elem) => {
    const option = document.createElement("option");
    // console.log("elem", elem);
    option.value = elem;
    return option;
  });
  datalist.append(...categories);
};

export const priceControl = (modalForm) => {
  modalForm.price.addEventListener("change", (e) => {
    const total = modalForm.price.value * modalForm.count.value;
    modalForm.total.textContent = total;
  });
  modalForm.count.addEventListener("change", (e) => {
    const total = modalForm.price.value * modalForm.count.value;
    modalForm.total.textContent = total;
  });
};
