import List from "../components/List/List";
import Card from "../components/Card/Card";
import { useHistory } from "react-router-dom"; // 5 версия
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchArticles } from "../store/articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ALL_ARTICLES } from "../service/config";
import { Pagination } from "antd";

function HomePage() {
  const articles = useSelector((state) => state.articles.articles);

  const dispatch = useDispatch();
  const { push } = useHistory();
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(1);
  useEffect(() => {
    axios.get(ALL_ARTICLES).then((res) => setResults(res.data.articlesCount));
    dispatch(fetchArticles((page - 1) * 5));
  }, [page, dispatch]);
  console.log(page);

  const articlesPagination = (
    <Pagination
      current={page}
      total={results}
      onChange={(page) => setPage(page)}
      pageSize={5}
      showSizeChanger={false}
    />
  );
  console.log(articles);
  return (
    <>
      <List>
        {articles.map((el) => (
          <Card
            key={el.createdAt}
            username={el.author.username}
            img={el.author.image}
            title={el.title}
            date={el.createdAt}
            description={el.description}
            tags={el.tagList}
            likesNumber={el.favoritesCount}
            slug={el.slug}
            onClick={() => push(`/articles/${el.slug}`)}
          />
        ))}
      </List>
      {articles.length > 0 ? articlesPagination : null}
    </>
  );
}

export default HomePage;
