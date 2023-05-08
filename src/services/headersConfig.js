export default function createHeaders() {
  const token = JSON.parse(localStorage.getItem("to-do-list"))?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}
