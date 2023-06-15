import { createRow } from "./createElements.js";

export const renderGoods = (arr, table) => {
  table.textContent = "";
  const data = arr.map(createRow);
  table.append(...data);
};
