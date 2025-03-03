import { Button } from "@/components/elements/button"
import { Input } from "@/components/elements/input"
import { Label } from "@/components/elements/label"

const FormRegister = () => {
    return (
        <form action="">
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
            <Button variant="auth" className="w-full mt-4">Register</Button>
        </form>
    )
}

export default FormRegister
