import axios from 'axios';

export const registerApi = async(firstName,lastName,email,password)=>{
    try {
        const res = await axios.post(`http://192.168.1.2:8080/api/v1/auth/register`,{firstName,lastName,email,password});
        return res.data
    } catch (error) {
        
    }
}
export const LoginApi = async(email,password)=>{
    try {
        const res = await axios.post(`http://192.168.1.2:8080/api/v1/auth/login`,{email,password});
        return res.data
    } catch (error) {
        
    }
}
export const getUser = async(token)=>{
    try {
        const res = await axios.get(`http://192.168.1.2:8080/api/v1/auth/user`,{headers:{
            Authorization:`Bearer ${token}`
        }});
        return res.data
    } catch (error) {
        
    }
}
export const getTodo = async(token)=>{
    try {
        const res = await axios.get(`http://192.168.1.2:8080/api/v1/todo`,{headers:{
            Authorization:`Bearer ${token}`
        }});
        return res.data
    } catch (error) {
        
    }
}
export const deleteTodo = async(token,id)=>{
    try {
        const res = await axios.delete(`http://192.168.1.2:8080/api/v1/todo/${id}`,{headers:{
            Authorization:`Bearer ${token}`
        
        }});
        
        
        return res.data
    } catch (error) {
        
    }
}
export const fullfilTodo = async(token,id)=>{
    try {
        const res = await axios.put('http://192.168.1.2:8080/api/v1/todo/fullfil',{id},{
            headers:{
                Authorization:`Bearer ${token}`
                }
        })
    } catch (error) {
        console.log("🚀 ~ file: index.js:60 ~ fullfilTodo ~ error", error)
        
    }
}
export const updateTodo = async(token,id,todo)=>{
    try {
        const res = await axios.patch(`http://192.168.1.2:8080/api/v1/todo/${id}`,{todo},{
            headers:{
           
            Authorization:`Bearer ${token}`
            }
    });
        return res
    } catch (error) {
        console.log("🚀 ~ file: index.js:73 ~ updateTodo ~ error", error)
        
    }
}
export const createTodo = async(token,todo)=>{
    try {
        const res = await axios.post(`http://192.168.1.2:8080/api/v1/todo`,{todo},{
            headers:{
            Authorization:`Bearer ${token}`
            }
    });
        return res.data
    } catch (error) {
        console.log("🚀 ~ file: index.js:73 ~ createTodo ~ error", error)
        
    }
}
export const forgot = async(email)=>{
    try {
        const res = await axios.post(`http://192.168.1.2:8080/api/v1/auth/forgot`,{email});
        return res.data
    } catch (error) {
        console.log("🚀 ~ file: index.js:96 ~ forgot ~ error", error)
        
    }
}
export const updateUser = async(firstName,lastName,token)=>{
    try {
        const res = await axios.put(`http://192.168.1.2:8080/api/v1/auth/profile`,{firstName,lastName},{
            headers:{
            Authorization:`Bearer ${token}`
            }
    });
        return res.data;
    } catch (error) {
        console.log("🚀 ~ file: index.js:110 ~ updateUser ~ error", error)
        
    }
}