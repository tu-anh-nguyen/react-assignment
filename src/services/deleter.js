import api from "./api";

export default function deleter(_url, _params) {
  return api.delete(_url, { params: _params });
}
