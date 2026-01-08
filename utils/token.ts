export const setAccessToken = (token: string) =>
  localStorage.setItem("Access Token", token);

export const getAccessToken = () => localStorage.getItem("Access Token");

export const removeAccessToken = () => localStorage.removeItem("Access Token");
