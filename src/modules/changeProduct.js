import { modalClose, priceControl, submitProduct } from "./control";
import { errorShow, fetchRequest } from "./fetchRequest";
import { modalChange, overlayChange } from "./var";

export const changeProduct = (list, overlay) => {
  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_edit")) {
      const tr = target.closest("tr");
      const id = tr.querySelector(".table__cell-id").textContent.slice(4);
      fetchRequest(`goods/${id}`, {
        method: "GET",
        callback: renderChangeGood,
      });
      overlay.classList.add("active");
    }
  });
  overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === overlay || target.closest(".modal__close")) {
      modalClose(overlay);
    }
  });
};

const renderChangeGood = (err, data) => {
  if (err) {
    console.warn(err, data);
    errorShow(err);
    return;
  }
  const {
    title,
    description,
    count,
    id,
    price,
    units,
    discount,
    category,
    image,
  } = data;
  const idSpan = overlayChange.querySelector(".vendor-code__id");
  idSpan.textContent = id;
  modalChange.title.value = title;
  modalChange.description.value = description;
  modalChange.price.value = price;
  modalChange.units.value = units;
  modalChange.discount_count.value = discount;
  if (+discount > 0) {
    modalChange.discount.checked = true;
  }
  modalChange.category.value = category;
  modalChange.count.value = count;
  modalChange.total.value = count * price;
  priceControl(modalChange);
  modalChange.image.src = `http://localhost:3000/${image}`;
  const imagePreview = overlayChange.querySelector(".image__preview");
  imagePreview.src = `http://localhost:3000/${image}`;
  const submit = modalChange.querySelector(".modal__submit");
  submit.textContent = "Изменить товар";
  submitProduct(modalChange, overlayChange, id);
};
