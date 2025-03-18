import { Button } from "@/components/elements/button"
import { Input } from "@/components/elements/input"
import { Label } from "@/components/elements/label"
import { Register } from "@/services/auth.services"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import DialogOTP from "./dialogOTP"

const FormRegister = () => {
    const Navigate = useNavigate();
    const [showOTPDialog, setShowOTPDialog] = useState(false);
    const [email2, setEmail2] = useState<string>("");
    const handleRegister = (e: any) => {
        e.preventDefault();

        if (
            !e.target.fullname.value ||
            !e.target.email.value ||
            !e.target.password.value ||
            !e.target.Cpassword.value
        ) {
            toast("Please, fill your details!");
            return;
        }

        if (!e.target.email.value.includes("@gmail.com")) {
            toast("Please, fill your gmail correctly");
            return;
        }

        if (e.target.password.value !== e.target.Cpassword.value) {
            toast("Password doesn't match!");
            return;
        }
        const email= e.target.email.value;
        const username= e.target.fullname.value;
        const password= e.target.password.value;

        setEmail2(email);
        Register({
            email, username, password,
            callback: (success, res) => {
                if (success) {
                    toast("✅ Register success!");
                    setShowOTPDialog(true);
                } else {
                    const errorMessage = res instanceof Error ? res.message : res;
                    console.error("❌ Register failed:", errorMessage);
                }
            }
        })
    }

    const fullnameRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        fullnameRef.current?.focus();
    }, [])
    return (
        <form onSubmit={handleRegister}>
            <div className="mb-2">
                <Label
                    htmlFor="fullname"
                    className="block text-sm text-slate-700 font-bold mb-2">
                    Fullname
                </Label>
                <Input
                    id="fullname"
                    type="text"
                    className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                    placeholder="Insert your name here"
                    ref={fullnameRef}
                />
            </div>
            <div className="mb-4">
                <Label
                    htmlFor="email"
                    className="block text-sm text-slate-700 font-bold mb-2">
                    Email
                </Label>
                <Input
                    id="email"
                    type="text"
                    className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                    placeholder="example@gmail.com"
                />
            </div>
            <div className="mb-4">
                <Label
                    htmlFor="password"
                    className="block text-sm text-slate-700 font-bold mb-2 mt-2">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                    placeholder="*******"
                />
            </div>
            <div className="mb-4">
                <Label
                    htmlFor="Cpassword"
                    className="block text-sm text-slate-700 font-bold mb-2 mt-2">
                    Confirm Password
                </Label>
                <Input
                    id="Cpassword"
                    type="password"
                    className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
                    placeholder="*******"
                />
            </div>
            <Button variant="auth" className="w-full mt-4" type="submit">Register</Button>
            {showOTPDialog && <DialogOTP from="register" email={email2} open={showOTPDialog} setOpen={setShowOTPDialog} />}
        </form>
    )
}

export default FormRegister
