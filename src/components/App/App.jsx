import Header from "../Header/Header";
import Main from "../Main/Main";
import { Switch, Route } from "react-router-dom"; // 5 версия
import HomePage from "../../pages/HomePage";
import NotFound from "../../pages/NotFound";
import Details from "../../pages/Details";
import LoginForm from "../../pages/LoginForm";
import RegistrationForm from "../../pages/RegistrationForm";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          {/* нужно упорядочивать маршруты от конкретных к общим: 1)/dasboard/stats 2)/dashboard  */}
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/articles/:slug" component={Details} />
          <Route path="/:sign-in" component={LoginForm} />
          <Route path="/:sign-up" component={RegistrationForm} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </>
  );
}

export default App;
