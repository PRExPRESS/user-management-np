import BASE_URL from "./baseUrl";
import axios from "axios";

//get all companies

export const getAllCompanies = async(page:string,limit:string,search:string)=>{

    try {
        const response = await axios.get(`${BASE_URL}/companies/?page=${page}&limit=${limit}&searchTerm=${search}`);
        //console.log('companies',response.data);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

//get companies
export const getCompanies = async()=>{

    try {
        const response = await axios.get(`${BASE_URL}/companies/all`);
        //console.log('companies',response.data);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}

//create company
export const createCompany = async(data:any[])=>{
    console.log('received data',data);
    try {
        const response = await axios.post(`${BASE_URL}/companies`, data,{
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        console.log('user',response);
        return response.data;
    
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data.message};
    }
}
