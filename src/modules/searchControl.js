import { fetchRequest } from "./fetchRequest";
import { renderGoods } from "./render";
import { table } from "./var";

export const searchControl = () => {
  const form = document.querySelector(".panel__search");
  form.addEventListener(
    "change",
    debounce((e) => {
      const searchValue = document.querySelector(".panel__search").search.value;
      const data = Promise.all([
        fetchRequest(`goods?search=${searchValue}`, {
          method: "GET",
          callback: renderGoods,
        }),
        fetchRequest(`goods/category/${searchValue}`, {
          callback: renderGoods,
        }),
      ]);
      data.then((elems) => {
        table.append(...elems[0]);
        table.append(...elems[1]);
        console.log(elems);
      });
      return data;
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
