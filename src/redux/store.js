import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { reducers } from './reducers'
import { sessionService } from 'redux-react-session';
export const store = createStore(reducers, applyMiddleware(logger, thunk));
sessionService.initSessionService(store);
