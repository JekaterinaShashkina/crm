import { modalClose, totalUpdate } from "./control";
import { errorShow, fetchRequest } from "./fetchRequest";
import { renderGoods } from "./render";

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
          deleteProduct(id, confirm);
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

const deleteProduct = (id, confirm) => {
  fetchRequest(`goods/${id}`, {
    method: "DELETE",
    callback: (err, data) => {
      if (err) {
        errorShow(err);
        console.warn(err, data);
        return;
      } else {
        fetchRequest("goods", {
          callback: renderGoods,
        });
        modalClose(confirm);
        totalUpdate();
      }
    },
  });
};
