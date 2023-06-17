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
};
init();
