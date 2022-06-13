import api from "./api";

export default function fetcher(_url, _params) {
  return api.get(_url, { params: _params });
}
