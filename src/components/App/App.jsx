import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import List from "../List/List";
import Card from "../Card/Card";
import axios from "axios";
import { ALL_ARTICLES, searchByPage } from "../../config";
import { Pagination } from "antd";
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(1);
  // useEffect(() => {
  //   axios.get(ALL_ARTICLES).then((res) => setData(res.data.articles));
  //   axios.get(ALL_ARTICLES).then((res) => setResults(res.data.articlesCount));
  // axios.get(ALL_ARTICLES).then((res) => console.log(res));
  // }, []);
  useEffect(() => {
    axios.get(ALL_ARTICLES).then((res) => setResults(res.data.articlesCount));
    axios.get(searchByPage(page)).then((res) => setData(res.data.articles));
    // axios.get(ALL_ARTICLES).then((res) => console.log(res));
  }, [page]);

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
          {data.map((el) => (
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
        {articlesPagination}
      </Main>
    </>
  );
}

export default App;
