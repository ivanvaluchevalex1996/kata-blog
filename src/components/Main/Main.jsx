import Container from "../Container/Container";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 10px 0;
  background: rgb(243, 243, 243);
  height: 710px;
`;

function Main({ children }) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

export default Main;
