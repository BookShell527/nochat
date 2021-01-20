import React from "react";
import ContextProvider from "./context/context";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute";
import NonAuthRoute from "./pages/NonAuthRoute";
import Home from "./pages/app/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Error from "./pages/Error";

function App() {
    return (
        <BrowserRouter>
            <ContextProvider>
                <Switch>
                    <AuthRoute exact path="/" component={Home} />
                    <NonAuthRoute exact path="/login" component={Login} />
                    <NonAuthRoute exact path="/register" component={Register} />
                    <Route component={Error} />
                </Switch>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;
