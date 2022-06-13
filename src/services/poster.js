import api from "./api";

export default function poster(_url, _params) {
  return api.post(_url, { params: _params });
}
