import { fetchRequest } from "./fetchRequest";
import { renderGoods } from "./render";
import { getVendorCode, modalForm } from "./var";

export const modalOpen = (overlay, form) => {
  overlay.classList.add("active");
  const vendorCode = getVendorCode();
  // При открытии модального окна должен генерироваться случайный id и заполняться span с классом vendor-code__id
  const id = Math.floor(Math.random() * 1000000);
  vendorCode.textContent = id;
  form.total.textContent = 0;
};
export const modalClose = (overlay) => {
  overlay.classList.remove("active");
  modalForm.reset();
  document.querySelector(".image__preview").src = "";
  if (document.querySelector(".message")) {
    document.querySelector(".message").textContent = "";
  }
};
export const totalUpdate = () => {
  let total = 0;
  const goodsNew = fetchRequest("goods", {
    method: "GET",
    callback: (data, err) => {
      const goods = data.map((elems) => {
        const { price, count } = elems;
        const p = price * count;
        total += p;
      });
      console.log(total);
      const totalDiv = document.querySelector(".cms__total-price");
      totalDiv.textContent = `$ ${total}`;
    },
  });
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
          // tr.remove();
          fetchRequest(`goods/${id}`, {
            method: "DELETE",
            callback: (data, err) => {
              if (err) {
                console.warn(err, data);
                return;
              } else {
                modalClose(confirm);
                totalUpdate();
                const goods = fetchRequest("goods", {
                  callback: renderGoods,
                });
              }
            },
          });
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
    newProduct.discount = newProduct.discount_count;
    console.log(newProduct);
    if (id) {
      const resp = fetchRequest(`goods/${id}`, {
        method: "PATCH",
        body: newProduct,
        callback: (data, err) => {
          if (err) {
            console.warn(err, data);
            return;
          } else {
            modalClose(overlay);
            totalUpdate();
            const goods = fetchRequest("goods", {
              callback: renderGoods,
            });
          }
        },
      });
    } else {
      const resp = fetchRequest("goods", {
        method: "POST",
        body: newProduct,
        callback: (data, err) => {
          console.log(data, err);
          if (err) {
            console.warn(err);
            return;
          } else {
            modalClose(overlay);
            totalUpdate();

            const goods = fetchRequest("goods", {
              callback: renderGoods,
            });
          }
        },
      });
    }
    modalForm.reset();
  });
};

export const uploadFile = () => {
  const input = document.querySelector(".modal__file");
  input.addEventListener("change", () => {
    const wrapper = document.querySelector(".wrapper");
    // console.log(wrapper);

    if (input.files.length > 0) {
      if (input.files[0].size < 1000000) {
        const src = URL.createObjectURL(input.files[0]);
        console.log(input.files[0].size, src);
        const imagepreview = document.querySelector(".image__preview");
        imagepreview.src = src;
        imagepreview.style.display = "block";
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
export const getCategory = () => {
  const data = fetchRequest("category", {
    method: "GET",
    callback: createCategory,
  });
};
const createCategory = (data, err) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const categories = data.map((elem) => {
    const option = document.createElement("option");
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
