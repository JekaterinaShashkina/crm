import { getVendorCode } from "./var.js";

const modalOpen = (overlay, form) => {
  overlay.classList.add("active");
  const vendorCode = getVendorCode();
  // При открытии модального окна должен генерироваться случайный id и заполняться span с классом vendor-code__id
  const id = Math.floor(Math.random() * 1000000);
  vendorCode.textContent = id;
  form.total.textContent = 0;
};
export const modalClose = (overlay) => {
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
