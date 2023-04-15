import styled from "styled-components";
import { Link } from "react-router-dom"; // 5 версия
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth } from "../../store/authSlice";
import { logout } from "../../store/authSlice";
import { useHistory } from "react-router-dom";

const HeaderEl = styled.header`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: #ffffff;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px;
`;

const Title = styled(Link)`
  font-size: 18px;
  line-height: 28px;
  text-decoration: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.85);
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const SignIn = styled(Link).attrs({ to: "/sign-in" })`
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

const SignUp = styled(Link).attrs({ to: "/sign-up" })`
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

const ButtonLogOut = styled.button`
  font-size: 18px;
  line-height: 28px;
  text-decoration: none;
  background: unset;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 18px;
  color: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.75);
  margin-left: 10px;
  &:hover {
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const ButtonCreateArticle = styled(Link).attrs({ to: "/new-article" })`
  text-decoration: none;
  background: unset;
  cursor: pointer;
  border-radius: 5px;
  color: rgb(82, 196, 26);
  border: 1px solid rgb(82, 196, 26);
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px;
  &:hover {
    color: #ffffff;
    background-color: rgb(82, 196, 26);
  }
`;

const NameUser = styled(Link).attrs({ to: "/profile" })`
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  margin: 0px;
  text-decoration: none;
  font-weight: 600;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const ImageUser = styled.img`
  width: 46px;
  height: 46px px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.75);
  margin-left: 10px;
`;

function Header() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const name = JSON.parse(localStorage.getItem("data"));
  const image = JSON.parse(localStorage.getItem("image"));
  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      // для того чтобы по выходу из учетки перебрасывало на главную
      history.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      localStorage.removeItem("image");
    }
  };
  return (
    <HeaderEl>
      <Wrapper>
        <Title to={"/"}>Realworld Blog</Title>
        <LoginContainer>
          {isAuth ? (
            <>
              {/* <ButtonCreateArticle to={"/new-article"}> */}
              <ButtonCreateArticle to={"/new-article"}>
                Create Article
              </ButtonCreateArticle>
              <NameUser to={"/profile"}>{name?.user?.username}</NameUser>
              <ImageUser
                src={
                  image
                    ? name.user.image
                    : "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
              />
              {/* <ImageUser src="https://static.productionready.io/images/smiley-cyrus.jpg" /> */}
              <ButtonLogOut onClick={onClickLogout}>Log Out</ButtonLogOut>
            </>
          ) : (
            <>
              <SignIn to={"/sign-in"}>Sign In</SignIn>
              <SignUp to={"/sign-up"}>Sign Up</SignUp>
            </>
          )}
        </LoginContainer>
      </Wrapper>
    </HeaderEl>
  );
}

export default Header;
