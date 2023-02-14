import { useState, useEffect } from "react";
import Header from "components/Header";
import Home from "components/Home";
import Auth from "components/Auth";
import Context from "context";
import "assets/css/main.css";
import "assets/css/loading.css";

const App = () => {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      const { expiresIn, token } = JSON.parse(userAuth);
      if (expiresIn <= new Date().getTime()) {
        localStorage.removeItem("userAuth");
        return;
      }
      setAuthToken(token);
    }
  }, []);

  const authData = {
    authToken,
    setAuthToken,
  };

  return (
    <Context.Provider value={authData}>
      <Header />
      {!authToken ? <Auth /> : <Home />}
    </Context.Provider>
  );
};

export default App;
