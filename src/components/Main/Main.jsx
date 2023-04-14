import Container from "../Container/Container";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";

const Wrapper = styled.main`
  padding: 10px 0;
  background: rgb(243, 243, 243);
  height: 100vh;
`;

function Main({ children }) {
  const status = useSelector((state) => state.articles.status);
  const articles = useSelector((state) => state.articles.articles);
  const loading = articles.length === 0 && status === "loading" && <Spinner />;
  return (
    <Wrapper>
      <Container>{children}</Container>
      {loading}
    </Wrapper>
  );
}

export default Main;
