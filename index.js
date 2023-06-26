import { dataArray } from "./dataArray.js";
import { addProduct, deleteRow, totalUpdate } from "./modules/control.js";
import { renderGoods } from "./modules/render.js";
import {
  list,
  modalForm,
  overlay,
  getTableSum,
  table,
  addGoods,
} from "./modules/var.js";

const init = () => {
  overlay.classList.remove("active");

  renderGoods(dataArray, table);
  const total = document.querySelector(".cms__total-price");

  addProduct(overlay, modalForm, table, total, addGoods);
  const tableSum = getTableSum();

  deleteRow(list, dataArray, table, total);
  const totalprice = totalUpdate(total, tableSum);
  total.textContent = ` $ ${totalprice}`;

  list.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_pic")) {
      console.log("picture");
      open(e.target.dataset.pic, "", "width=800,height=600,top=132,left=368");
    }
  });
};
init();
