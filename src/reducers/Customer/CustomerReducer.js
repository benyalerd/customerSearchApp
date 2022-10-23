import Action from '../../actions/index';

var initialState = {
    AlertOpen:false,
    CustomerSelect:[],
    IsEdit:false
};

function Customer(state = initialState, action) {
    switch (action.type) {
        case Action.Set_Customer_Alert:
            return {
                ...state,
                AlertOpen:action.AlertOpen,
                CustomerSelect:action.CustomerSelect,
                IsEdit:action.IsEdit
            };
        default:
            return state;
    }
}

export default Customer;