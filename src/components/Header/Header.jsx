import styled from "styled-components";
import { Link } from "react-router-dom"; // 5 версия

const HeaderEl = styled.header`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: #ffffff;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   padding: 20px 0;
  margin: 0 15px;
`;
// для перехода на главную страницу по клику на кнопку в хедере
// const Title = styled(Link).attrs({ to: "/", replace: true })`
const Title = styled(Link)`
  font-size: 18px;
  line-height: 28px;
  text-decoration: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.85);
`;
// const Title = styled(Link).attrs({ to: "/", replace: true })`
//   font-size: 18px;
//   line-height: 28px;
//   text-decoration: none;
//   cursor: pointer;
//   color: rgba(0, 0, 0, 0.85);
// `;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const SignIn = styled(Link).attrs({ to: "/" })`
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
  background: unset;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 18px;
`;

const SignUp = styled(Link).attrs({ to: "/" })`
  font-size: 18px;
  line-height: 28px;
  text-decoration: none;
  background: unset;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 18px;
  color: rgb(82, 196, 26);
  border: 1px solid rgb(82, 196, 26);
  &:hover {
    color: #ffffff;
    background-color: rgb(82, 196, 26);
  }
`;

function Header() {
  return (
    <HeaderEl>
      <Wrapper>
        <Title to={"/"}>Realworld Blog</Title>
        {/* <Link to={`/`}>Prev</Link> */}
        <LoginContainer>
          <SignIn>Sign In</SignIn>
          <SignUp>Sign Up</SignUp>
        </LoginContainer>
      </Wrapper>
    </HeaderEl>
  );
}

export default Header;
