import { GetAccountverified } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const Navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const allData  = GetAccountverified(token);
            setUsername(allData.allData.username);
            setEmail(allData.allData.email);
            setPassword(allData.allData.password);
            setIsVerified(allData.allData.is_verified);
        } else {
            Navigate("/login", { replace: true });
        }
    },[]);

    return {username, email, password, isVerified};
}