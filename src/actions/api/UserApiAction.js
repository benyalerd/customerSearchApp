import axios from 'axios';

export  const  Login = (email,password)=> async (dispatch)=>{
    try
    {
    const apiEndpoint = "/api/users/login";
    const request = JSON.stringify({
        "password":password,
        "email":email
    });    
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

export  const  Register = (email,password,repeatPassword)=> async (dispatch)=>{
    try
    {
    const apiEndpoint = "/api/users/addUser";
    const request = JSON.stringify({
        "password":password,
        "email":email,
        "repeatPassword":repeatPassword
    });    
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