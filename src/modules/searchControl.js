import { fetchRequest } from "./fetchRequest";
import { renderGoods } from "./render";
import { table } from "./var";

export const searchControl = () => {
  const form = document.querySelector(".panel__search");
  form.addEventListener(
    "change",
    debounce((e) => {
      const searchValue = document.querySelector(".panel__search").search.value;
      return searchGoods(searchValue);
    }, 300)
  );
};

const debounce = (callback, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

const searchGoods = (value) => {
  const data = Promise.all([
    fetchRequest(`goods?search=${value}`, {
      method: "GET",
      callback: renderGoods,
    }),
    fetchRequest(`goods/category/${value}`, {
      callback: renderGoods,
    }),
  ]);
  data.then((elems) => {
    table.append(...elems[0]);
    table.append(...elems[1]);
  });
  return data;
};
