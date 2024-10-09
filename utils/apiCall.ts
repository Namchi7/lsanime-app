const apiCall = async (endpoint: string = "", params: string = "") => {
  const api_link: string = "https://api.jikan.moe/v4";

  const res = await fetch(`${api_link}${endpoint}?${params}`);

  return await res.json();
};

export default apiCall;
