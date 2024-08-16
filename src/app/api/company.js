import axiosInstance from "./axios"


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
        const res=await axiosInstance.get('api')
        return res
    } catch (error) {
        console.log(error)
    }
}