import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { Label } from "@/components/elements/label";
import { Login, ResendOTP } from "@/services/auth.services";
import { toast } from "sonner";
import { GetAccountverified } from '../../../services/auth.services';
import { useNavigate } from "react-router-dom";
import DialogOTP from "./dialogOTP";

const FormLogin = () => {
  const Navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState<string>("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [accountVerified, setAccountVerified] = useState<boolean | null>(null);
  const [accountEmail, setAccountEmail] = useState<string>("");
  const [email2, setEmail2] = useState<string>("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!e.target.email.value || !e.target.password.value) {
      toast("Please, fill your email and password!");
      return;
    }
    if (!e.target.email.value.includes("@gmail.com")) {
      toast("Please, fill your email correctly");
      return;
    }

    const data = {
      username: e.target.email.value,
      password: e.target.password.value,
    }
    setEmail2(data.username);
    await Login({
      data,
      callback: (success, res) => {
        if (success) {
          setLoginFailed("");
          if (typeof res === "string") {
            localStorage.setItem("token", res);
            console.log("✅ Login success!");
            const status = GetAccountverified(res);
            if (status) {
              setAccountEmail(status.allData.email);
              setAccountVerified(status.allData.is_verified);
            }
          }
        } else {
          const errorMessage = res instanceof Error ? res.message : res;
          setLoginFailed(errorMessage);
          console.error("❌ Login failed:", errorMessage);
          toast(errorMessage);
          e.target.email.value = "";
          e.target.password.value = "";
        }
      }
    });
  };

  useEffect(() => {
    if (accountVerified === null) return;
    if (accountVerified === true) {
      Navigate("/panoramic", { replace: true });
    } else {
      handleResendOTP(email2);
      setShowOTPDialog(true);
    }
  }, [accountVerified]);

  const handleResendOTP = async (email: string) => {
    const res = await ResendOTP({
      email, callback: (success, res) => {
        if (success) {
          if (typeof res === "string") {
            toast(res);
          }
        } else {
          const errorMessage = res instanceof Error ? res.message : res;
          console.error("❌ Resend OTP failed:", errorMessage);
        }
      }
    });
  };

  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, [])

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <Label htmlFor="email" className="block text-sm text-slate-700 font-bold mb-2">
          Email
        </Label>
        <Input
          id="email"
          type="text"
          className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
          placeholder="example@gmail.com"
          ref={emailRef}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password" className="block text-sm text-slate-700 font-bold mb-2 mt-2">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className="w-full rounded text-sm border px-3 py-2 text-slate-700 placeholder:opacity-50 transition-all duration-300"
          placeholder="*******"
        />
      </div>
      <Button variant="auth" className="w-full mt-6" type="submit">
        Login
      </Button>
      {showOTPDialog && <DialogOTP email={accountEmail} open={showOTPDialog} setOpen={setShowOTPDialog} />}
      {loginFailed && <p className="text-red-500 text-sm mb-2">{loginFailed}</p>}
    </form>
  );
};

export default FormLogin;
