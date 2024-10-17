const baseURL = "https://localhost:7213/api/Excel";

const api = {
  getFiles: () => fetch(`${baseURL}`),

  renameFile: (fileId, newFileName) =>
    fetch(`${baseURL}?id=${fileId}&fileName=${newFileName}`, {
      method: "PUT",
    }),

  deleteFile: (fileId) =>
    fetch(`${baseURL}?id=${fileId}`, {
      method: "DELETE",
    }),

  uploadFile: (formData) =>
    fetch(baseURL, {
      method: "POST",
      body: formData,
    }),

  get: (controller, endpoint = "") => 
    fetch(`${baseURL}/${controller}/${endpoint}`),

  post: (controller, body, endpoint = "") =>
    fetch(`${baseURL}/${controller}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    }),

  put: (controller, body, endpoint = "") =>
    fetch(`${baseURL}/${controller}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    }),

  delete: (controller, id, endpoint = "") =>
    fetch(`${baseURL}/${controller}/${endpoint}?id=${id}`, {
      method: "DELETE",
    }),
};

export { api };
