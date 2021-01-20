import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// 开发环境谷歌应用插件
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)
));

// 向外暴露对象
export default store