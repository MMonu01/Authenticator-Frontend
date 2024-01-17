import { Alertify } from "../scripts/Alertify";
import { ErrorExtractor } from "../scripts/Error-extractor";

export const getHomeData = () => {
  return fetch(`http://localhost:9000/home`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      console.log("data", data);
    })
    .catch((err) => {
      if (err instanceof Error) {
        alert(err);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};
