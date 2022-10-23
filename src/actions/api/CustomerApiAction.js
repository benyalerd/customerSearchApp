import axios from 'axios';
export  const  SearchCustomer = (request)=> async (dispatch)=>{
    try
    {
    const apiEndpoint = "/api/customer/searchCustomer";
        const data = axios.post(apiEndpoint,request,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return data;
    }
    catch(error){
        throw error;
    }
}

export  const  DeleteCustomer = (userId,customerId)=> async (dispatch)=>{
    try
    {
    const apiEndpoint = "/api/customer/delete_customer/" +customerId+"/"+userId;
        const data = axios.post(apiEndpoint,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return data;
    }
    catch(error){
        throw error;
    }
}

export  const  AddCustomer = (request)=> async (dispatch)=>{
    try
    {
    const apiEndpoint = "/api/customer/addCustomer";
        const data = axios.post(apiEndpoint,request,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return data;
    }
    catch(error){
        throw error;
    }
}

export  const  UpdateCustomer = (customerId,request)=> async (dispatch)=>{
    try
    {
    const apiEndpoint = "/api/customer/update_customer/" +customerId;
        const data = axios.post(apiEndpoint,request,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return data;
    }
    catch(error){
        throw error;
    }
}