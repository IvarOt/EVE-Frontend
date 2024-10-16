const baseURL = "https://localhost:7213/api/Excel";

const api = {
  getFiles: () => fetch(`${baseURL}`),
  
  renameFile: (fileId, newFileName) =>
    fetch(`${baseURL}?id=${fileId}&fileName=${newFileName}`, {
      method: 'PUT',
    }),

  deleteFile: (fileId) =>
    fetch(`${baseURL}?id=${fileId}`, {
      method: 'DELETE',
    }),

  uploadFile: (formData) =>
    fetch(baseURL, {
      method: "POST",
      body: formData
    }),
};

export { api };
