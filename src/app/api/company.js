import axiosInstance from "./axios.js"

export const createcompany=async (data)=>{
    try {
        const res= await axiosInstance.post('/company/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getallcompanylist=async ()=>{
    try {
        const res=await axiosInstance.get('/company/getCompanyList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateCompanyDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/company/updateCompanyList',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteCompanyDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/company/deleteCompanyDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}