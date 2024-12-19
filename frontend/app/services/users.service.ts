
import BASE_URL from "./baseUrl";
import axios from "axios";


const user = localStorage.getItem('user');
const parsedUser = user ? JSON.parse(user) : null;
//get all users
export const getAllUsers = async(page:string,limit:string,search:string)=>{

    try {
        const response = await axios.get(`${BASE_URL}/users/?admin=${parsedUser.id}&page=${page}&limit=${limit}&searchTerm=${search}`,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedUser.token}`
        }});
        console.log('users',response);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

//get user by id
export const getUserById = async(id:number)=>{
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`,{headers: {
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

//create users
export const createUser = async(data:any[])=>{
    console.log('received data',data);
    try {
        const response = await axios.post(`${BASE_URL}/users`, data,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${parsedUser.token}`
            }
        });
        console.log('user',response);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

interface User {
    name: string;
    email: string;
    address: string;
    phone: string;
    company_id: number;
    admin_id: number;
  }

//update user
export const updateUser = async(data:User,id:number)=>{
    console.log('received data',data);
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`, data,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${parsedUser.token}`
            }
        });
        console.log('user',response);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

//delete user
export const userDel = async(id:number)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`,{headers: {
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
