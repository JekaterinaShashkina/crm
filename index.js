import { dataArray } from "./dataArray.js";
import {
  addProduct,
  controlCheckbox,
  deleteRow,
  submitProduct,
  totalUpdate,
} from "./modules/control.js";
import { renderGoods } from "./modules/render.js";
import {
  getList,
  getModalCheckbox,
  getModalForm,
  getModalInputDiscount,
  getOverlay,
  getTable,
  getTableSum,
} from "./modules/var.js";

const init = () => {
  const table = getTable();
  const modalCheckbox = getModalCheckbox();
  const modalInputDiscount = getModalInputDiscount();
  const modalForm = getModalForm();
  const overlay = getOverlay();
  const list = getList();

  overlay.classList.remove("active");

  renderGoods(dataArray, table);
  addProduct(overlay, modalForm);
  const total = document.querySelector(".cms__total-price");
  const tableSum = getTableSum();

  deleteRow(list, dataArray, table, total);
  controlCheckbox(modalCheckbox, modalInputDiscount);

  submitProduct(modalForm, table, total, overlay);

  const totalprice = totalUpdate(total, tableSum);
  total.textContent = ` $ ${totalprice}`;
};
init();
