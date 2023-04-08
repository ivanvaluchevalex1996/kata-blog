import Header from "../Header/Header";
import Main from "../Main/Main";
import { Switch, Route } from "react-router-dom"; // 5 версия
import HomePage from "../../pages/HomePage";
import NotFound from "../../pages/NotFound";
import Details from "../../pages/Details";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/articles/:slug" component={Details} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </>
  );
}

export default App;
