import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Context
import injectContext from "./store/appContext";

// Pages
import { Home } from "./pages/home";

// Components
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route>
                            <h1>Not found!</h1>
                        </Route>
                    </Switch>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
