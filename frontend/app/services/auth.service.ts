import BASE_URL from "./baseUrl";
import axios from "axios";

// user login
export const adminLogin = async(data:any)=>{
    const email = data.email;
    const password = data.password;
    
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {email, password},{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('login',response);
        let user ;
        if(response.status === 201 ){ 
            user = {
                id: response.data.id,
                name: response.data.name,
                token: response.data.access_token,
            }
        };
        
        return {
            user: user,status: response.status};
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data};
    }
}


//create user

type User = {
    name: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
  };

export const register = async(data:User)=>{
    
    try {
        const response = await axios.post(`${BASE_URL}/admins/`, {...data},{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('login',response);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

const user = localStorage.getItem('user');
const parsedUser = user ? JSON.parse(user) : null;
//get admin by id
export const getAdminById = async(id:number)=>{
    try {
        const response = await axios.get(`${BASE_URL}/admins/${id}`,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedUser.token}`
        }});
        console.log('admin',response);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

//update admin
export const updateAdmin = async(id:number,data:User)=>{
    try {
        const response = await axios.put(`${BASE_URL}/admins/${id}`, data,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedUser.token}`
        }});
        console.log('user',response);
        return response.data;
    
    } catch (error:any) {    
        console.log(error);
        return {error: error.response.data.message};
    }
}
