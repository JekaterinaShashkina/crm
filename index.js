import { dataArray } from "./dataArray.js";
import { changeProduct } from "./modules/changeProduct.js";
import { addProduct, deleteRow, totalUpdate } from "./modules/control.js";
import { fetchRequest } from "./modules/fetchRequest.js";
import { renderGoods } from "./modules/render.js";
import { searchControl } from "./modules/searchControl.js";
import {
  list,
  modalForm,
  overlay,
  getTableSum,
  table,
  addGoods,
  total,
  overlayChange,
} from "./modules/var.js";
const init = () => {
  overlay.classList.remove("active");
  overlayChange.classList.remove("active");

  const goods = fetchRequest("goods", {
    callback: renderGoods,
  });
  // renderGoods(dataArray, table);
  // const total = document.querySelector(".cms__total-price");

  addProduct(overlay, modalForm, total, addGoods);
  // const tableSum = getTableSum();
  changeProduct(list, overlayChange, goods);
  deleteRow(list);
  // const totalprice = totalUpdate(total, tableSum);
  // total.textContent = ` $ ${totalprice}`;
  searchControl();
  list.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_pic")) {
      console.log("picture");
      open(e.target.dataset.pic, "", "width=800,height=600,top=132,left=368");
    }
  });
};
init();
