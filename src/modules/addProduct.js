import {
  modalOpen,
  controlCheckbox,
  getCategory,
  uploadFile,
  priceControl,
  modalClose,
  submitProduct,
} from "./control";
import { modalCheckbox, modalInputDiscount } from "./var";
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
