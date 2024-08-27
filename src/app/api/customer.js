import axiosInstance from "./axios.js"

export const createCustomer=async (data)=>{
    try {
        const res= await axiosInstance.post('/customer/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllCustomerList=async ()=>{
    try {
        const res=await axiosInstance.get('/customer/getCustomerList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateCustomerDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/customer/updateCustomerList',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteCustomerDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/customer/deleteCustomerDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}