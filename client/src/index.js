import React from 'react'
import ReactDOM from 'react-dom'
// import { Button } from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css'
// import './assets/styles/core.less'
import Register from './containers/register/Register'
import Login from './containers/login/Login'
import Main from './containers/main/Main'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/styles/css/index.less'

// import './test/socketio-test'

const router1 = <Provider store={ store } >
    <HashRouter>
        <Switch>
            <Route path='/register' component={ Register } />
            <Route path='/login' component={ Login } />
            <Route  component={ Main } />
        </Switch>
    </HashRouter>
</Provider>
ReactDOM.render(
    router1,
    document.getElementById('root')
)
