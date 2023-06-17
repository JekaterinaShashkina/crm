import { dataArray } from "./dataArray.js";
import {
  addProduct,
  controlCheckbox,
  modalClose,
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
  getVendorCode,
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

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const tr = target.closest("tr");
      const id = tr.querySelector(".table__cell_name").dataset.id;
      dataArray.splice(id - 1, 1);
      tr.remove();
      renderGoods(dataArray, table);
      const tableSum = getTableSum();
      const totalprice = totalUpdate(total, tableSum);
      total.textContent = ` $ ${totalprice}`;
    }
  });

  controlCheckbox(modalCheckbox, modalInputDiscount);

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = getVendorCode();
    const formData = new FormData(e.target);
    formData.append("id", id.textContent);
    const newProduct = Object.fromEntries(formData);

    dataArray.push(newProduct);
    console.log(newProduct);
    renderGoods(dataArray, table);
    const tableSum = getTableSum();
    const totalprice = totalUpdate(total, tableSum);
    console.log(tableSum);
    total.textContent = ` $ ${totalprice}`;
    modalForm.reset();
    modalClose(overlay);
  });

  const totalprice = totalUpdate(total, tableSum);
  total.textContent = ` $ ${totalprice}`;
};
init();
