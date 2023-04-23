import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getArticle } from "../service/config";
import Info from "../components/Info/Info";
import { useDispatch } from "react-redux";
import { Skeleton } from "antd";

function Details() {
  const dispatch = useDispatch();
  const [article, setArticle] = useState(null);
  const { push } = useHistory();
  const { slug } = useParams();
  useEffect(() => {
    axios.get(getArticle(slug)).then(({ data }) => setArticle(data.article));
  }, [slug]);
  console.log(article);
  return (
    <div>
      {article ? (
        <Info push={push} {...article} />
      ) : (
        <Skeleton style={{ marginTop: "20px" }} />
      )}
    </div>
  );
}

export default Details;
