import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Counter } from "./component/counter/counter.jsx";
import { Navbar } from "./component/navbar";
// Components
import ScrollToTop from "./component/scrollToTop";
import { Calendario } from "./pages/calendario.jsx";
// Pages
import { Home } from "./pages/home";
import { Motes } from "./pages/motes.jsx";
import { Perfil } from "./pages/perfil.jsx";
import { TodoList } from "./pages/todolist.jsx";
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
                            <Counter date={new Date(2022, 1, 12, 17, 58, 15)} />
                            // <Counter date={new Date(2022, 1, 20, 18, 0, 0)} />
                        )}
                    </Route>
                    <Route exact path="/motes">
                        <Motes />
                    </Route>
                    <Route exact path="/perfil">
                        <Perfil />
                    </Route>
                    <Route exact path="/todo-list">
                        <TodoList />
                    </Route>
                    <Route exact path="/calendario">
                        <Calendario />
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
