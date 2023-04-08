const BASE_URL = "https://blog.kata.academy/api/";
// выбираем не все поля, а нужные
export const ALL_ARTICLES = `${BASE_URL}articles?limit=5&offset=5`;
// export const ALL_ARTICLES = `${BASE_URL}articles`;
export const getArticle = (slug) => `${BASE_URL}articles/${slug}`;

export const searchByPage = (page) =>
  `${BASE_URL}articles?limit=5&offset=${page * 5}`;
