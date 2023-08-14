import { createRow } from "./createElements.js";
const tableBody = document.querySelector(".table__body");

export const renderGoods = (data, err) => {
  // console.log(data);
  if (err) {
    console.warn(err, data);
    return;
  }
  // table.textContent = "";
  const goods = data.map(createRow);
  // console.log(goods);
  tableBody.textContent = "";
  tableBody.append(...goods);
  return goods;
};
