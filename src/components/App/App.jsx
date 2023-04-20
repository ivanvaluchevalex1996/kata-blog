import Header from "../Header/Header";
import Main from "../Main/Main";
import { Switch, Route } from "react-router-dom"; // 5 версия
import HomePage from "../../pages/HomePage";
import NotFound from "../../pages/NotFound";
import Details from "../../pages/Details";
import LoginForm from "../../pages/LoginForm";
import RegistrationForm from "../../pages/RegistrationForm";
import EditProfileForm from "../../pages/EditProfileForm";
import CreateArticle from "../../pages/CreateArticle";
import EditArticle from "../../pages/EditArticle";
import { useSelector } from "react-redux";
import { Alert } from "antd";
// import { selectIsAuth } from "../../store/authSlice";

// import NewArticleForm from "../../pages/NewArticleForm";

function App() {
  const status = useSelector((state) => state.articles.status);
  // const isAuth = useSelector(selectIsAuth);
  // console.log(isAuth);
  const error = status === "rejected" && (
    <Alert
      message="Произошла ошибка. Мы уже работаем над этим."
      type="error"
      showIcon
    />
  );
  return (
    <>
      <Header />
      {error}
      <Main>
        <Switch>
          {/* нужно упорядочивать маршруты от конкретных к общим: 1)/dasboard/stats 2)/dashboard  */}
          <Route exact path="/" component={HomePage}>
            <HomePage />
          </Route>
          <Route path="/articles/:slug/:edit" component={EditArticle} />
          <Route path="/articles/:slug" component={Details} />
          <Route path="/:new-article" component={CreateArticle} />
          <Route path="/:sign-in" component={LoginForm} />
          <Route path="/:sign-up" component={RegistrationForm} />
          <Route path="/:profile" component={EditProfileForm} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </>
  );
}

export default App;
