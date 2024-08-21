import { useLocalStorage } from "react-use";
import axiosInstance from "./axios.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const login = async (data) => {
     try {
       const res = await axiosInstance.post("/login/valid", data);
        return res
     } catch (err) {
       console.error("Network error:", err);
     }
  };

