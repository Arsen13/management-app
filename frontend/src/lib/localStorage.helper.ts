export function getToken(): string {
  const data = localStorage.getItem("token");
  const token: string = data ? JSON.parse(data) : "";

  return token;
}

export function setToken(key: string, value: string): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeToken(key: string): void {
  localStorage.removeItem(key);
}
