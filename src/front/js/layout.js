import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Popup } from './component/popup.jsx';
// Components
import ScrollToTop from './component/scrollToTop';
// Pages
import { TodoLists } from './pages/todolists.jsx';
// Context
import injectContext from './store/appContext';

const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Popup />
                <Switch>
                    <Route exact path='/'>
                        <TodoLists />
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
