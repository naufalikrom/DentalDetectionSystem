import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logogigi.png";
import { Button } from "@/components/elements/button";
import { useLogin } from "@/hooks/useLogin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/elements/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/elements/popover";

export default function NavbarPanoramic() {
    const Nagivate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        isVerified: false
    });

    const datalogin = useLogin();
    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            username: datalogin.username,
            email: datalogin.email,
            isVerified: datalogin.isVerified
        }));
    }, [datalogin.username, datalogin.email, datalogin.isVerified]);

    const handleLogout = () => {
        localStorage.removeItem("token");

        Nagivate("/login", { replace: true });
    };

    return (
        <nav className="bg-slate-100 text-black px-10 fixed z-50 top-0 left-0 w-full shadow-md border-b border-blue-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex flex-row items-center">
                    <Link to="/dashboard" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-16 h-16" />
                        <h1 className="text-2xl font-bold text-blue-600 ml-3">D</h1>
                        <h1 className="text-2xl font-bold">DS</h1>
                    </Link>
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto py-2 px-5">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Username</span>
                                <span>:</span>
                                <span>{data.username}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Email</span>
                                <span>:</span>
                                <span>{data.email}</span>
                            </div>
                            <div className="flex justify-end mt-3">
                                <Button onClick={handleLogout}>Logout</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    );
}
