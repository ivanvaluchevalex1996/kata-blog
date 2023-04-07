import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function List({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default List;
