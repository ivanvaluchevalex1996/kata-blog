import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getArticle } from "../service/config";
import Info from "../components/Info/Info";

function Details() {
  const [article, setArticle] = useState(null);
  const { push } = useHistory();
  const { slug } = useParams();
  useEffect(() => {
    axios.get(getArticle(slug)).then(({ data }) => setArticle(data.article));
  }, [slug]);
  return <div>{article && <Info push={push} {...article} />}</div>;
}

export default Details;
