import api from "./api";

export default function poster(_url, _body) {
  return api.put(_url, _body);
}
