import {combineReducers} from 'redux';
import Alert  from './Alert/AlertReducer'
import SessionAlert from './Alert/SessionAlert';
import Customer from './Customer/CustomerReducer';

const appReducer = combineReducers({
    Alert:Alert,
    SessionAlert: SessionAlert,
    Customer:Customer
});

const rootReducer = (state,action) =>{
    return appReducer(state,action)
}

export default rootReducer;