import axiosInstance from "./axios.js"

export const createUser=async (data)=>{
    try {
        const res= await axiosInstance.post('/user/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllUserList=async ()=>{
    try {
        const res=await axiosInstance.get('/user/getAllUserList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateUserDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/user/updateUserDetails',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/user/deleteUserDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}