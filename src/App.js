import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import AssetsScreen from "./pages/AssetsScreen/AssetsScreen";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import SwapScreen from "./pages/SwapScreen/SwapScreen";
import AboutScreen from "./pages/AboutScreen/AboutScreen";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route
              exact
              path="/assets"
              component={AssetsScreen}
            />
            <Route
              exact
              path="/swap"
              component={SwapScreen}
            />
            <Route
              exact
              path="/about"
              component={AboutScreen}
            />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
