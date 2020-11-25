import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/Login" component={Login}></Route>
      </Switch>
    </Router>
  );
};
export default App;
