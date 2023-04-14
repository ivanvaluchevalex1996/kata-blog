export const BASE_URL = "https://blog.kata.academy/api/";
// выбираем не все поля, а нужные
export const ALL_ARTICLES = `${BASE_URL}articles?limit=5&offset=5`;
// export const ALL_ARTICLES = `${BASE_URL}articles`;
export const getArticle = (slug) => `${BASE_URL}articles/${slug}`;

// export const fetchToken = () => {
//   fetch(`${BASE_URL}users/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       user: {
//         email: "ivanvaluchevalex1996@gmail.com",
//         password: "234wdf",
//       },
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => localStorage.setItem("token", data.user.token))
//     .catch((error) => console.error(error));
// };

// export const fetchToken = (async () => {
//   const response = await fetch(
//     "https://conduit.productionready.io/api/users/login",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           email: "ivanvaluchevalex1996@gmail.com",
//           password: "qwertyqwerty12345",
//         },
//       }),
//     }
//   );
//   const data = await response.json();
//   const token = await data.user.token;
//   console.log(token);
// })();
