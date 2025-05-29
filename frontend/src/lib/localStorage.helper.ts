export function getItem(key: string): string {
  const data = localStorage.getItem(key);
  const token: string = data ? JSON.parse(data) : "";

  return token;
}

export function setItem(key: string, value: string): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
