import axiosInstance from "./axios.js"

export const createProduct=async (data)=>{
    try {
        const res= await axiosInstance.post('/product/create',data);
        return res
    } catch (error) {
        console.log(error);   
    }
}

export const getAllProductList=async ()=>{
    try {
        const res=await axiosInstance.get('/product/getAllProductList')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateProductDetails=async(data)=>{
    try {
       const res=await axiosInstance.post('/product/updateProductDetails',data) ;
       return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductDetails=async(data)=>{
    try {
        const res=axiosInstance.post('/product/deleteProductDetails' ,data)
        return res
    } catch (error) {
        console.log(error);  
    }
}