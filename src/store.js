import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from './reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const reducer = combineReducers({ ...reducers });
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  })
const enchancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default createStore(
    reducer,
    {},
    enchancer
    );