export default function createHeaders() {
  const localStorageValue = localStorage.getItem("to-do-list");
  const token = typeof localStorageValue === "string" ? JSON.parse(localStorageValue).token : undefined;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}
