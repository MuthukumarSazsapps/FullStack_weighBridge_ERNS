import axiosInstance from "./axios.js"

export const createVehicle=async (data)=>{
    try {
        const res= await axiosInstance.post('/vehicle/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllVehicleList=async ()=>{
    try {
        const res=await axiosInstance.get('/vehicle/getAllVehicleList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateVehicleDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/vehicle/updateVehicleDetails',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteVehicleDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/vehicle/deleteVehicleDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}