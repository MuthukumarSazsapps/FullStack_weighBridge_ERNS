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