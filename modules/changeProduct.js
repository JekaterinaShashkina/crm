import { priceControl, submitProduct } from "./control.js";
import { fetchRequest } from "./fetchRequest.js";
import { modalChange, overlayChange, URL } from "./var.js";
const fieldset = document.querySelector(".modal__fieldset");

export const changeProduct = (list, overlay, goods) => {
  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_edit")) {
      const tr = target.closest("tr");
      const id = tr.querySelector(".table__cell-id").textContent.slice(4);
      const good = fetchRequest(`goods/${id}`, {
        method: "GET",
        callback: renderChangeGood,
      });
      // console.log(good);
      overlay.classList.add("active");
    }
  });
};

const renderChangeGood = (data) => {
  console.log(data);
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
  const idSpan = document.querySelector(".vendor-code__id");
  modalChange.title.value = title;
  modalChange.description.value = description;
  modalChange.price.value = price;
  modalChange.units.value = units;
  modalChange.discount_count.value = discount;
  if (+discount > 0) {
    console.log(modalChange.discount);
    modalChange.discount.checked = true;
  }
  modalChange.category.value = category;
  modalChange.count.value = count;
  modalChange.total.value = count * price;
  priceControl(modalChange);
  modalChange.image.src = `http://localhost:3000/${image}`;
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  const pic = document.createElement("img");
  pic.src = `http://localhost:3000/${image}`;
  wrapper.append(pic);
  fieldset.append(wrapper);
  idSpan.textContent = id;
  const submit = modalChange.querySelector(".modal__submit");
  submit.textContent = "Изменить товар";
  console.log(modalChange);
  submitProduct(modalChange, overlayChange, id);
};
