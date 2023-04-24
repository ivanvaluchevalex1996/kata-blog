import List from "../components/List/List";
import Card from "../components/Card/Card";
import { useHistory } from "react-router-dom"; // 5 версия
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { fetchArticles, changePage } from "../store/articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ALL_ARTICLES } from "../service/config";
import { Pagination } from "antd";

function HomePage() {
  const articles = useSelector((state) => state.articles.articles);
  const pageArticles = useSelector((state) => state.articles.page);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [results, setResults] = useState(1);

  const fetchArticleData = useCallback(async () => {
    const res = await axios.get(ALL_ARTICLES);
    setResults(res.data.articlesCount);
    dispatch(fetchArticles((pageArticles - 1) * 5));
  }, [dispatch, pageArticles]);

  useEffect(() => {
    fetchArticleData();
  }, [fetchArticleData]);
  const articlesPagination = (
    <Pagination
      current={pageArticles}
      total={results}
      // чтобы при нажатии на realworld, пагинация не сбивалась
      onChange={(page) => dispatch(changePage(page))}
      pageSize={5}
      showSizeChanger={false}
    />
  );
  return (
    <List>
      {articles?.map((el, i) => (
        <Card
          // eslint-disable-next-line react/no-array-index-key, no-unsafe-optional-chaining
          key={el?.createdAt + i}
          username={el?.author?.username}
          img={el?.author?.image}
          title={el?.title}
          date={el?.createdAt}
          description={el?.description}
          tags={el?.tagList}
          likesNumber={el?.favoritesCount}
          favorited={el?.favorited}
          slug={el?.slug}
          onClick={() => push(`/articles/${el.slug}`)}
        />
      ))}
      {articles.length > 0 && articlesPagination}
    </List>
  );
}

export default HomePage;
