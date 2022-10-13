import {combineReducers} from 'redux';
import Alert  from './Alert/AlertReducer'
import SessionAlert from './Alert/SessionAlert';

const appReducer = combineReducers({
    Alert:Alert,
    SessionAlert: SessionAlert,
});

const rootReducer = (state,action) =>{
    return appReducer(state,action)
}

export default rootReducer;