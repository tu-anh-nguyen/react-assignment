import api from "./api";

export default function poster(_url, _body) {
  return api.post(_url, _body);
}
