import { fetchRequest } from "./fetchRequest.js";
import { modalForm, URL } from "./var.js";
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
      console.log(good);

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
  modalForm.title.value = title;
  modalForm.description.value = description;
  modalForm.price.value = price;
  modalForm.units.value = units;
  modalForm.discount_count.value = discount;
  if (+discount > 0) {
    console.log(modalForm.discount);
    modalForm.discount.checked = true;
  }
  modalForm.category.value = category;
  modalForm.count.value = count;
  modalForm.total.value = count * price;
  modalForm.image.src = `http://localhost:3000/${image}`;
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  const pic = document.createElement("img");
  pic.src = `http://localhost:3000/${image}`;
  wrapper.append(pic);
  fieldset.append(wrapper);
  idSpan.textContent = id;
  const submit = modalForm.querySelector(".modal__submit");
  submit.textContent = "Изменить товар";
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
  });
};
