import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Counter } from "./component/counter/counter.jsx";
// Components
import ScrollToTop from "./component/scrollToTop";
// Pages
import { Home } from "./pages/home";
import { Nicknames } from "./pages/nicknames.jsx";
import { Profile } from "./pages/profile.jsx";
import { TodoList } from "./pages/todolist.jsx";
import { Calendar } from "./pages/calendar.jsx";
// Context
import injectContext, { Context } from "./store/appContext";

const Layout = () => {
    const { store, actions } = useContext(Context);
    const basename = process.env.BASENAME || "";

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/">
                        {store.counterEnd ? (
                            <Home />
                        ) : (
                            <Counter date={new Date(2022, 1, 20, 18, 0, 0)} />
                        )}
                    </Route>
                    <Route exact path="/nicknames">
                        <Nicknames />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/todo-list">
                        <TodoList />
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
