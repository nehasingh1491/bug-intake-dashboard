import api from "./api";

const cleanFilters = (filters = {}) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => Boolean(value))
  );
};

export const bugService = {
  getAll: (filters = {}) =>
    api.get("/bug/list", {
      params: cleanFilters(filters),
    }),

  getById: (id) => api.get(`/bug/${id}`),

  create: (data) => api.post("/bug", data),

  update: (id, data) => api.put(`/bug/${id}`, data),

  updateStatus: (id, status) => api.patch(`/bug/${id}/status`, { status }),
};

export default bugService;
