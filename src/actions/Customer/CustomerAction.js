import Action from '../index';

export function setCustomerAlert(data,isOpen,isEdit) {
    return {
        type: Action.Set_Customer_Alert,
        AlertOpen : isOpen,
        CustomerSelect:data,
        IsEdit:isEdit
    };
}