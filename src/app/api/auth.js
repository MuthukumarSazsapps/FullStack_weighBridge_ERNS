import { useLocalStorage } from "react-use";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const login = async (data) => {
     try {
       const res = await axiosInstance.post("/login/login", data);
        return res
     } catch (err) {
       console.error("Network error:", err);
     }
  };

  // export default login;