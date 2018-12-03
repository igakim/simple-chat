import { createStore } from 'redux';
import rootReducer from '../reducers';

export default initStore => createStore(rootReducer, initStore);
