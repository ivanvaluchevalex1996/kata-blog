import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import List from "../List/List";
import Card from "../Card/Card";
import axios from "axios";
import { ALL_ARTICLES } from "../../service/config";
import { Pagination } from "antd";
import { Switch, Route } from "react-router-dom"; // 5 версия
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/articlesSlice";

function App() {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(1);

  useEffect(() => {
    axios.get(ALL_ARTICLES).then((res) => setResults(res.data.articlesCount));
    dispatch(fetchArticles(page));
  }, [page, dispatch]);

  const onPaginationChange = (pg) => {
    setPage(pg);
  };

  const articlesPagination = (
    <Pagination
      current={page}
      total={results}
      onChange={onPaginationChange}
      pageSize={5}
      // hideOnSinglePage
    />
  );

  return (
    <>
      <Header />
      <Main>
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
              // onClick={() => push(`/country/${c.name}`)}
            />
          ))}
        </List>
        {articles.length > 0 ? articlesPagination : null}
      </Main>
    </>
  );
}

export default App;
