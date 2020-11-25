import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Components/Main/Main";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}></Route>
      </Switch>
    </Router>
  );
};
export default App;
