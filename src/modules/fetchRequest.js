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
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (callback) return callback(data);
      return;
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};
const errorShow = (err) => {
  const errDiv = document.createElement("div");
  errDiv.textContent = err;
  window.append(errDiv);
};
