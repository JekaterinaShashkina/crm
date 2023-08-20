import { createRow } from "./createElements";
const tableBody = document.querySelector(".table__body");

export const renderGoods = (data, err) => {
  console.log(data, err);
  if (err) {
    const h2 = document.createElement("h2");
    h2.style.color = "red";
    h2.textContent = err;
    document.body.append(h2);
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
