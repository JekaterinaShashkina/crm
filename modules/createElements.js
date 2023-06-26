export const createRow = (obj, index) => {
  const { id, name, price, category, count, units } = obj;
  const tr = document.createElement("tr");
  const tdNumber = document.createElement("td");
  tdNumber.classList.add("table__cell");
  tdNumber.textContent = `${index + 1}`;
  const product = document.createElement("td");
  product.classList.add("table__cell", "table__cell_left", "table__cell_name");
  product.dataset.id = index;
  product.textContent = name;
  const idSpan = document.createElement("span");
  idSpan.classList.add("table__cell-id");
  idSpan.textContent = `id: ${id}`;

  product.append(idSpan);
  const tdCategory = document.createElement("td");
  tdCategory.classList.add("table__cell", "table__cell_left");
  tdCategory.textContent = category;
  const tdUnits = document.createElement("td");
  tdUnits.classList.add("table__cell");
  tdUnits.textContent = units;
  const tdCount = document.createElement("td");
  tdCount.classList.add("table__cell");
  tdCount.textContent = count;
  const tdPrice = document.createElement("td");
  tdPrice.classList.add("table__cell");
  tdPrice.textContent = `$${price}`;
  const sum = document.createElement("td");
  sum.classList.add("table__cell", "table__sum");
  const total = count * price;
  sum.textContent = `$${total}`;

  const wrapper = document.createElement("td");
  wrapper.classList.add("table__cell", "table__cell_btn-wrapper");
  const picBtn = document.createElement("button");
  picBtn.classList.add("table__btn", "table__btn_pic");
  picBtn.dataset.pic =
    "https://kartinki.pibig.info/uploads/posts/2023-04/1680777454_kartinki-pibig-info-p-nebolshaya-kartinka-sovi-arti-1.jpg";
  const editBtn = document.createElement("button");
  editBtn.classList.add("table__btn", "table__btn_edit");
  const delBtn = document.createElement("button");
  delBtn.classList.add("table__btn", "table__btn_del");
  wrapper.append(picBtn, editBtn, delBtn);

  tr.append(
    tdNumber,
    product,
    tdCategory,
    tdUnits,
    tdCount,
    tdPrice,
    sum,
    wrapper
  );
  return tr;
};
