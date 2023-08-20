import { fetchRequest } from "./fetchRequest";
import { renderGoods } from "./render";
export const searchControl = () => {
  const form = document.querySelector(".panel__search");
  form.addEventListener("change", debounce(renderSearch, 300));
};

const debounce = (callback, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

const renderSearch = () => {
  const searchValue = document.querySelector(".panel__search").search.value;
  const data = fetchRequest(`goods?search=${searchValue}`, {
    method: "GET",
    callback: renderGoods,
  });
  // const dataForCat = fetchRequest(`goods/category/${searchValue}`, {
  //   callback: renderGoods,
  // });
  console.log(data);
};
