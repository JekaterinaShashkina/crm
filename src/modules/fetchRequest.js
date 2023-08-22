import { URL } from "./var";

export const fetchRequest = async (
  postfix,
  { method = "get", callback, body, headers }
) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;
    const response = await fetch(`${URL}${postfix}`, options);
    if (response.ok) {
      if (response.status < 200 || response.status > 300) {
        errorShow(
          new Error(`Ошибка ${response.status}: ${response.statusText}`)
        );
        return;
      }
      const data = await response.json();
      if (callback) return callback(null, data);
      return;
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    console.log(err);
    return errorShow("что то пошло не так");
  }
};

export const errorShow = (err) => {
  const errDiv = document.querySelector(".error__overlay");
  const p = errDiv.querySelector("h2");
  errDiv.classList.add("active");
  p.textContent = err;
  errDiv.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      e.target.closest(".modal__close") ||
      e.target === errDiv.querySelector(".modal__cancel")
    ) {
      errDiv.classList.remove("active");
    }
  });
};
