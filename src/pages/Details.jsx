// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
// // import { searchByCountry } from "../config";
// // import Button from "../components/Button/Button";
// import Info from "../components/Info/Info";

// function Details() {
//   const { name } = useParams();
//   const { push } = useHistory();
//   const [country, setCountry] = useState(null);

//   console.log(name);
//   console.log(country);
//   useEffect(() => {
//     axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
//   }, [name]);

//   return <div>{country && <Info push={push} {...country} />}</div>;
// }
// export default Details;
