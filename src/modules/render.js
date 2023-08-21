import { createRow } from "./createElements";
import { errorShow } from "./fetchRequest";
const tableBody = document.querySelector(".table__body");

export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    errorShow(err);
    return;
  }
  const goods = data.map(createRow);
  tableBody.textContent = "";
  tableBody.append(...goods);
  return goods;
};
