import axiosInstance from "./axios.js"


export const getScreenShot=async (tokenNo)=>{
    try {
        const res= await axiosInstance.post(`/camera/snap?tokenNo=${tokenNo}`);
        return res
    } catch (error) {
        console.log(error);   
    }
}