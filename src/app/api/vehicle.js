import axiosInstance from "./axios.js"


///vehiclt type api----------------------------------------------------
export const createVehicleType=async (data)=>{
    try {
        const res= await axiosInstance.post('/vehicle/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllVehicleTypeList=async ()=>{
    try {
        const res=await axiosInstance.get('/vehicle/getAllVehicleTypeList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateVehicleTypeDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/vehicle/updateVehicleTypeDetails',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteVehicleTypeDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/vehicle/deleteVehicleTypeDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}

///vehiclt number api----------------------------------------------------


export const createVehicleNumber=async (data)=>{
    try {
        const res= await axiosInstance.post('/vehicle/createNumber',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllVehicleNumberList=async ()=>{
    try {
        const res=await axiosInstance.get('/vehicle/getAllVehicleNumberList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateVehicleNumberDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/vehicle/updateVehicleNumberDetails',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteVehicleNumberDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/vehicle/deleteVehicleNumberDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}
