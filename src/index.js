import { changeProduct } from "./modules/changeProduct";
import { deleteRow, totalUpdate } from "./modules/control";
import { fetchRequest } from "./modules/fetchRequest";
import { renderGoods } from "./modules/render";
import { searchControl } from "./modules/searchControl";
import {
  list,
  modalForm,
  overlay,
  addGoods,
  total,
  overlayChange,
} from "./modules/var";
import { addProduct } from "./modules/addProduct";
import "./css/index.css";

const init = () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  const image = document.createElement("img");
  image.classList.add("image__preview");
  wrapper.append(image);
  const fieldset = document.querySelector(".modal__fieldset");
  fieldset.append(wrapper);

  const goods = fetchRequest("goods", {
    callback: renderGoods,
  });
  totalUpdate();

  addProduct(overlay, modalForm, total, addGoods);
  changeProduct(list, overlayChange, goods);
  deleteRow(list);

  searchControl();
  list.addEventListener("click", (e) => {
    if (e.target.closest(".table__btn_pic")) {
      console.log(e.target);
      open(e.target.dataset.pic, "", "width=800,height=600,top=132,left=368");
    }
  });
};
init();
