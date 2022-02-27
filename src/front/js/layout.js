import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./component/navbar.js";
import { Popup } from "./component/popup.jsx";
// Components
import ScrollToTop from "./component/scrollToTop";
import { Calendar } from "./pages/calendar.jsx";
// Pages
import { Home } from "./pages/home";
import { Nicknames } from "./pages/nicknames.jsx";
import { Profile } from "./pages/profile.jsx";
import { TodoLists } from "./pages/todolists.jsx";
// Context
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Popup />
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/nicknames">
                        <Nicknames />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/todo-list">
                        <TodoLists />
                    </Route>
                    <Route exact path="/calendar">
                        <Calendar />
                    </Route>
                    <Route>
                        <h1>Not found!</h1>
                    </Route>
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
