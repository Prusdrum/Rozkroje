import {compose, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

export default (reducers, initialState = {}) => {
    const middleware = [thunkMiddleware];
    const enhancers = [];
    
    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = window.devToolsExtension;

        if (devToolsExtension) {
            enhancers.push(devToolsExtension());
        }
    }

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return store;
}