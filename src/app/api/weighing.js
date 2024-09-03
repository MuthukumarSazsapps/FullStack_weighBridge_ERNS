import axiosInstance from "./axios.js"

export const createWeighing=async (data)=>{
    try {
        const res= await axiosInstance.post('/weighing/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllWeighingList=async ()=>{
    try {
        const res=await axiosInstance.get('/weighing/getAllWeighingList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getSecondWeightList=async ()=>{
    try {
        const res=await axiosInstance.get('/weighing/getSecondWeightList')
        return res
    } catch (error) {
        console.log(error)
    }
}


export const updateWeighingDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/weighing/updateWeighingDetails',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const updateSecondWeight=async(data)=>{
    try {
       const res=await axiosInstance.post('/weighing/updateSecondWeight',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}



export const deleteWeighingDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/weighing/deleteWeighingDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}