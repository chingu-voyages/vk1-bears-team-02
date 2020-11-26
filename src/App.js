import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import { Login } from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <Route exact path="/Register" component={Register}></Route>
      </Switch>
    </Router>
  );
};
export default App;
